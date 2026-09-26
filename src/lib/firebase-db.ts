// src/lib/firebase-db.ts
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db, isFirebaseConfigured } from "./firebase"

export interface UserProfile {
  uid: string
  name: string
  email: string
  photoURL?: string | null
  currentDay: number
  streakDays: number
  totalXp: number
  track: string
  createdAt?: string
  lastActive?: string
}

export interface DayProgressData {
  dayNumber: number
  status: "locked" | "available" | "in_progress" | "completed"
  lessonReadPct: number
  quizPassed: boolean
  quizBestScore: number
  exercisesDone: number
  missionSubmitted: boolean
  updatedAt?: string
}

export interface UserNote {
  id: string
  dayNumber: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

// In-memory / localStorage fallback cache
const LOCAL_STORAGE_KEY_PREFIX = "analyst_os_"

function getLocalData<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function setLocalData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + key, JSON.stringify(data))
  } catch (e) {
    console.warn("Error saving to localStorage:", e)
  }
}

/**
 * Creates or updates the user profile document in Firestore
 */
export async function createOrUpdateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<UserProfile> {
  const defaultProfile: UserProfile = {
    uid,
    name: data.name || "محلل بيانات",
    email: data.email || "user@analyst.os",
    photoURL: data.photoURL || null,
    currentDay: data.currentDay || 1,
    streakDays: data.streakDays || 1,
    totalXp: data.totalXp || 100,
    track: data.track || "bi_analyst",
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
  }

  if (isFirebaseConfigured && db) {
    try {
      const userRef = doc(db, "users", uid)
      const existing = await getDoc(userRef)
      const nowIso = new Date().toISOString()
      if (existing.exists()) {
        const merged = { ...existing.data(), ...data, lastActive: nowIso } as UserProfile
        await updateDoc(userRef, { ...data, lastActive: serverTimestamp() })
        return merged
      } else {
        await setDoc(userRef, {
          ...defaultProfile,
          createdAt: serverTimestamp(),
          lastActive: serverTimestamp(),
        })
        return { ...defaultProfile, createdAt: nowIso, lastActive: nowIso }
      }
    } catch (err) {
      console.warn("Firestore profile sync notice:", err)
    }
  }

  // Fallback local storage
  const existingLocal = getLocalData<UserProfile>(`profile_${uid}`, defaultProfile)
  const updated = { ...existingLocal, ...data, lastActive: new Date().toISOString() }
  setLocalData(`profile_${uid}`, updated)
  return updated
}

/**
 * Retrieves the user profile from Firestore or local fallback
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (isFirebaseConfigured && db) {
    try {
      const userRef = doc(db, "users", uid)
      const snap = await getDoc(userRef)
      if (snap.exists()) {
        return snap.data() as UserProfile
      }
    } catch (err) {
      console.warn("Firestore getUserProfile notice:", err)
    }
  }

  return getLocalData<UserProfile | null>(`profile_${uid}`, null)
}

/**
 * Saves day progress to Firestore sub-collection: users/{uid}/progress/{dayNumber}
 */
export async function saveUserDayProgress(
  uid: string,
  dayNumber: number,
  progress: Partial<DayProgressData>
): Promise<DayProgressData> {
  const current = await getUserDayProgress(uid, dayNumber)
  const merged: DayProgressData = {
    dayNumber,
    status: progress.status || current?.status || "in_progress",
    lessonReadPct: progress.lessonReadPct ?? current?.lessonReadPct ?? 0,
    quizPassed: progress.quizPassed ?? current?.quizPassed ?? false,
    quizBestScore: progress.quizBestScore ?? current?.quizBestScore ?? 0,
    exercisesDone: progress.exercisesDone ?? current?.exercisesDone ?? 0,
    missionSubmitted: progress.missionSubmitted ?? current?.missionSubmitted ?? false,
    updatedAt: new Date().toISOString(),
  }

  if (isFirebaseConfigured && db) {
    try {
      const progRef = doc(db, "users", uid, "progress", dayNumber.toString())
      await setDoc(progRef, { ...merged, updatedAt: serverTimestamp() }, { merge: true })
    } catch (err) {
      console.warn("Firestore save progress notice:", err)
    }
  }

  setLocalData(`prog_${uid}_${dayNumber}`, merged)
  return merged
}

/**
 * Gets day progress for a specific day
 */
export async function getUserDayProgress(
  uid: string,
  dayNumber: number
): Promise<DayProgressData | null> {
  if (isFirebaseConfigured && db) {
    try {
      const progRef = doc(db, "users", uid, "progress", dayNumber.toString())
      const snap = await getDoc(progRef)
      if (snap.exists()) {
        return snap.data() as DayProgressData
      }
    } catch (err) {
      console.warn("Firestore getUserDayProgress notice:", err)
    }
  }

  return getLocalData<DayProgressData | null>(`prog_${uid}_${dayNumber}`, null)
}

/**
 * Gets all user notes
 */
export async function getUserNotes(uid: string): Promise<UserNote[]> {
  if (isFirebaseConfigured && db) {
    try {
      const notesRef = collection(db, "users", uid, "notes")
      const q = query(notesRef, orderBy("updatedAt", "desc"))
      const snap = await getDocs(q)
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as UserNote)
    } catch (err) {
      console.warn("Firestore getUserNotes notice:", err)
    }
  }

  return getLocalData<UserNote[]>(`notes_${uid}`, [])
}

/**
 * Saves or updates a user note
 */
export async function saveUserNote(
  uid: string,
  note: Omit<UserNote, "createdAt" | "updatedAt"> & { id?: string }
): Promise<UserNote> {
  const noteId = note.id || `note_${Date.now()}`
  const now = new Date().toISOString()
  const fullNote: UserNote = {
    id: noteId,
    dayNumber: note.dayNumber,
    title: note.title,
    content: note.content,
    createdAt: now,
    updatedAt: now,
  }

  if (isFirebaseConfigured && db) {
    try {
      const noteRef = doc(db, "users", uid, "notes", noteId)
      await setDoc(noteRef, {
        ...fullNote,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    } catch (err) {
      console.warn("Firestore saveUserNote notice:", err)
    }
  }

  const existing = getLocalData<UserNote[]>(`notes_${uid}`, [])
  const idx = existing.findIndex((n) => n.id === noteId)
  if (idx >= 0) {
    existing[idx] = fullNote
  } else {
    existing.unshift(fullNote)
  }
  setLocalData(`notes_${uid}`, existing)
  return fullNote
}

/**
 * Deletes a user note
 */
export async function deleteUserNote(uid: string, noteId: string): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      const noteRef = doc(db, "users", uid, "notes", noteId)
      await deleteDoc(noteRef)
    } catch (err) {
      console.warn("Firestore deleteUserNote notice:", err)
    }
  }

  const existing = getLocalData<UserNote[]>(`notes_${uid}`, [])
  const filtered = existing.filter((n) => n.id !== noteId)
  setLocalData(`notes_${uid}`, filtered)
  return true
}
