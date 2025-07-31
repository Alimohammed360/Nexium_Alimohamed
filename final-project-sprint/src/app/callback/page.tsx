'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data.session) {
        // Successful login
        router.push('/')
      } else {
        console.error('Session not found:', error)
        router.push('/login')
      }
    }

    handleAuth()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Logging you in...</h2>
        <p className="text-gray-500">Please wait while we authenticate your session</p>
      </div>
    </div>
  )
}
