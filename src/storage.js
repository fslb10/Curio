// Storage abstraction. Wraps localStorage. If Supabase env vars are set
// and a user id has been set via setUserId, persists to a "progress" table
// keyed by (user_id, key). All app code goes through this module.

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null
let currentUserId = null

if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
}

export const Storage = {
  async load(key) {
    if (supabase && currentUserId) {
      try {
        const { data } = await supabase
          .from('progress')
          .select('value')
          .eq('user_id', currentUserId)
          .eq('key', key)
          .single()
        return data?.value ?? null
      } catch {
        return null
      }
    }
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },

  async save(key, value) {
    if (supabase && currentUserId) {
      try {
        await supabase
          .from('progress')
          .upsert({ user_id: currentUserId, key, value })
      } catch {}
      return
    }
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  },

  async clear(key) {
    if (supabase && currentUserId) {
      try {
        await supabase
          .from('progress')
          .delete()
          .eq('user_id', currentUserId)
          .eq('key', key)
      } catch {}
      return
    }
    try {
      localStorage.removeItem(key)
    } catch {}
  },

  async clearAll(prefix = 'curio.') {
    // Best-effort wipe of all keys with the given prefix.
    if (supabase && currentUserId) {
      try {
        await supabase
          .from('progress')
          .delete()
          .eq('user_id', currentUserId)
          .like('key', `${prefix}%`)
      } catch {}
      return
    }
    try {
      const toRemove = []
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k && k.startsWith(prefix)) toRemove.push(k)
      }
      toRemove.forEach(k => localStorage.removeItem(k))
    } catch {}
  },

  setUserId(id) {
    currentUserId = id
  },

  getClient() {
    return supabase
  }
}
