'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import type { Session } from '@supabase/supabase-js'

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null)
  const [resume, setResume] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [tailored, setTailored] = useState('')
  const [loading, setLoading] = useState(false)
  type HistoryItem = {
    createdAt: string
    jobDesc: string
    tailored: string
  }
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const tailoredRef = useRef<HTMLDivElement>(null)

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history')
      const data = await res.json()

      if (!res.ok) {
        console.error('❌ History API Error:', data)
        alert(`Error fetching history: ${data.error || 'Failed to fetch history'}`)
        return
      }

      setHistory(data.history || [])
      setShowHistory(true)
    } catch (error) {
      console.error('❌ Network error fetching history:', error)
      alert('Failed to fetch history. Please try again.')
    }
  }

  const router = useRouter()

  // 🔒 Check login
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/login')
      else setSession(session)
    })
  }, [])



  // 🧠 Handle tailoring
  const handleTailor = async () => {
    console.log("📦 N8N_WEBHOOK_URL:", process.env.N8N_WEBHOOK_URL);

    setLoading(true)
    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDesc })
      })

      const data = await res.json()

      if (!res.ok) {
        console.error('❌ API Error:', data)
        const errorMessage = data.error || 'Failed to tailor resume'
        const debugInfo = data.debug ? `\n\nDebug: ${data.debug}` : ''
        alert(`Error: ${errorMessage}${debugInfo}`)
        setLoading(false)
        return
      }

      if (data.tailoredResume) {
        setTailored(data.tailoredResume)
        console.log('✅ Tailored resume received:', data.tailoredResume.substring(0, 100) + '...')

        // Smooth scroll to the tailored result after a brief delay
        setTimeout(() => {
          tailoredRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      } else {
        console.error('❌ No tailored resume in response:', data)
        alert('No tailored resume received from the server')
      }
    } catch (error) {
      console.error('❌ Network error:', error)
      alert('Network error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!session) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            🎯 Resume Tailor
          </h1>
          <p className="text-gray-600">Transform your resume to match any job description</p>
        </div>

        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Resume Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📄 Your Resume
            </label>
            <textarea
              placeholder="Paste your resume here..."
              className="w-full h-64 border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 text-gray-900 placeholder-gray-500"
              onChange={(e) => setResume(e.target.value)}
              value={resume}
            />
          </div>

          {/* Job Description Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🎯 Job Description
            </label>
            <textarea
              placeholder="Paste job description here..."
              className="w-full h-64 border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 text-gray-900 placeholder-gray-500"
              onChange={(e) => setJobDesc(e.target.value)}
              value={jobDesc}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleTailor}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            disabled={loading || !resume || !jobDesc}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Tailoring...
              </div>
            ) : (
              '✨ Tailor Resume'
            )}
          </button>

          <button
            onClick={fetchHistory}
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-200"
          >
            📜 View History
          </button>
        </div>

        {/* Tailored Result */}
        {tailored && (
          <div ref={tailoredRef} className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📄</span>
              Tailored Resume
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">{tailored}</pre>
            </div>
          </div>
        )}

        {/* History Section */}
        {showHistory && (
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">📜</span>
              Your Resume History
            </h3>
            <div className="space-y-6">
              {history && history.length > 0 ? (
                history.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold text-gray-700 mb-2 flex items-center">
                          <span className="mr-2">🎯</span>
                          Job Description
                        </p>
                        <div className="bg-white rounded p-3 border border-gray-200">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700">{item.jobDesc}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700 mb-2 flex items-center">
                          <span className="mr-2">📄</span>
                          Tailored Resume
                        </p>
                        <div className="bg-white rounded p-3 border border-gray-200">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700">{item.tailored}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No resume history found.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="text-center mt-12">
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/login')
            }}
            className="text-gray-500 hover:text-red-600 transition-colors duration-200 text-sm underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
