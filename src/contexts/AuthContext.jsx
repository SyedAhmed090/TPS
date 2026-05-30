import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else { setProfile(null); setIsAdmin(false); setLoading(false) }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    const [{ data: customerData }, { data: adminData }] = await Promise.all([
      supabase.from('customers').select('*').eq('auth_user_id', userId).maybeSingle(),
      supabase.from('admin_users').select('id').eq('auth_user_id', userId).maybeSingle(),
    ])

    if (!customerData && !adminData) {
      // No profile row yet — create it on first authenticated sign-in
      const { data: { user } } = await supabase.auth.getUser()
      const { data: created } = await supabase
        .from('customers')
        .insert({
          auth_user_id: userId,
          email: user?.email || '',
          full_name: user?.user_metadata?.full_name || '',
        })
        .select()
        .single()
      setProfile(created || null)
    } else {
      setProfile(customerData || null)
    }

    setIsAdmin(!!adminData)
    setLoading(false)
  }

  async function signIn(email, password) {
    return supabase.auth.signInWithPassword({ email, password })
  }

  async function signUp({ email, password, fullName }) {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
  }

  async function signOut() {
    return supabase.auth.signOut()
  }

  async function updateProfile(updates) {
    if (!user) return { error: new Error('Not authenticated') }
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('auth_user_id', user.id)
      .select()
      .single()
    if (!error && data) setProfile(data)
    return { data, error }
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, isAdmin, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
