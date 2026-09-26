// src/context/AuthContext.tsx
"use client"

import React, { createContext, useContext, useEffect, useState, useTransition } from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth"
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase"
import {
  getUserProfile,
  createOrUpdateUserProfile,
  type UserProfile,
} from "@/lib/firebase-db"

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  isConfigured: boolean
  signInWithEmail: (email: string, pass: string) => Promise<void>
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOutUser: () => Promise<void>
  demoLogin: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_USER_PROFILE: UserProfile = {
  uid: "usr_demo_101",
  name: "محلل نظم وبيانات",
  email: "demo@analyst.os",
  photoURL: null,
  currentDay: 26,
  streakDays: 14,
  totalXp: 1850,
  track: "bi_analyst",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [, startTransition] = useTransition()

  // Listen to Firebase Auth state
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        setUser(fbUser)
        if (fbUser) {
          try {
            const profile = await getUserProfile(fbUser.uid)
            if (profile) {
              setUserProfile(profile)
            } else {
              const newProf = await createOrUpdateUserProfile(fbUser.uid, {
                name: fbUser.displayName || "محلل بيانات",
                email: fbUser.email || "",
                photoURL: fbUser.photoURL,
              })
              setUserProfile(newProf)
            }
          } catch (e) {
            console.warn("Error loading user profile:", e)
          }
        } else {
          // Check if local demo login is active
          const localDemo = localStorage.getItem("analyst_os_active_demo")
          if (localDemo === "true") {
            const savedProfile = await getUserProfile(DEMO_USER_PROFILE.uid)
            setUserProfile(savedProfile || DEMO_USER_PROFILE)
          } else {
            setUserProfile(null)
          }
        }
        setLoading(false)
      })

      return () => unsubscribe()
    } else {
      // Local demo mode if Firebase credentials are not yet populated
      const localDemo = typeof window !== "undefined" && localStorage.getItem("analyst_os_active_demo")
      if (localDemo === "true") {
        getUserProfile(DEMO_USER_PROFILE.uid).then((prof) => {
          setUserProfile(prof || DEMO_USER_PROFILE)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    }
  }, [])

  const signInWithEmail = async (email: string, pass: string) => {
    if (isFirebaseConfigured && auth) {
      const cred = await signInWithEmailAndPassword(auth, email, pass)
      const profile = await getUserProfile(cred.user.uid)
      setUserProfile(profile)
      localStorage.removeItem("analyst_os_active_demo")
    } else {
      // Offline / Demo fallback
      startTransition(() => {
        localStorage.setItem("analyst_os_active_demo", "true")
        const mockProfile: UserProfile = {
          ...DEMO_USER_PROFILE,
          email,
          name: email.split("@")[0] || "محلل بيانات",
        }
        createOrUpdateUserProfile(mockProfile.uid, mockProfile).then(setUserProfile)
      })
    }
  }

  const signUpWithEmail = async (name: string, email: string, pass: string) => {
    if (isFirebaseConfigured && auth) {
      const cred = await createUserWithEmailAndPassword(auth, email, pass)
      await updateProfile(cred.user, { displayName: name })
      const newProf = await createOrUpdateUserProfile(cred.user.uid, {
        name,
        email,
        currentDay: 1,
        streakDays: 1,
        totalXp: 100,
      })
      setUserProfile(newProf)
      localStorage.removeItem("analyst_os_active_demo")
    } else {
      // Offline fallback
      startTransition(() => {
        localStorage.setItem("analyst_os_active_demo", "true")
        const mockProfile: UserProfile = {
          uid: `usr_${Date.now()}`,
          name,
          email,
          currentDay: 1,
          streakDays: 1,
          totalXp: 100,
          track: "bi_analyst",
        }
        createOrUpdateUserProfile(mockProfile.uid, mockProfile).then(setUserProfile)
      })
    }
  }

  const signInWithGoogle = async () => {
    if (isFirebaseConfigured && auth && googleProvider) {
      const cred = await signInWithPopup(auth, googleProvider)
      const profile = await getUserProfile(cred.user.uid)
      if (profile) {
        setUserProfile(profile)
      } else {
        const newProf = await createOrUpdateUserProfile(cred.user.uid, {
          name: cred.user.displayName || "محلل بيانات",
          email: cred.user.email || "",
          photoURL: cred.user.photoURL,
        })
        setUserProfile(newProf)
      }
      localStorage.removeItem("analyst_os_active_demo")
    } else {
      demoLogin()
    }
  }

  const signOutUser = async () => {
    if (auth) {
      await signOut(auth).catch(() => {})
    }
    localStorage.removeItem("analyst_os_active_demo")
    setUser(null)
    setUserProfile(null)
  }

  const demoLogin = () => {
    localStorage.setItem("analyst_os_active_demo", "true")
    createOrUpdateUserProfile(DEMO_USER_PROFILE.uid, DEMO_USER_PROFILE).then((prof) => {
      setUserProfile(prof)
    })
  }

  const refreshProfile = async () => {
    if (userProfile?.uid) {
      const p = await getUserProfile(userProfile.uid)
      if (p) setUserProfile(p)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isConfigured: isFirebaseConfigured,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOutUser,
        demoLogin,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
