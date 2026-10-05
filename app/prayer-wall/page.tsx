'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { listPrayerMessages, deletePrayerMessage, deleteAllPrayerMessages, type PrayerMessage } from '@/lib/prayer-messages'

function PrayerWallContent() {
  const [messages, setMessages] = useState<PrayerMessage[] | null>(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [deleting, setDeleting] = useState(false)
  const searchParams = useSearchParams()

  async function load() {
    try {
      setMessages(await listPrayerMessages())
      setError('')
    } catch {
      setError('Could not load prayer messages. Please refresh the page.')
    }
  }

  useEffect(() => {
    load()
    const timer = window.setInterval(load, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (searchParams.get('submitted') === '1') {
      setNotice('You submitted your prayer request.')
    }
  }, [searchParams])

  async function handleDeleteAll() {
    if (!window.confirm('Are you sure you want to delete all prayer requests? This cannot be undone.')) {
      return
    }
    setDeleting(true)
    try {
      await deleteAllPrayerMessages()
      setNotice('All prayer requests have been deleted.')
      await load()
    } catch {
      setError('Could not delete prayer requests. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  async function handleDeleteOne(id: string) {
    setDeleting(true)
    try {
      await deletePrayerMessage(id)
      await load()
    } catch {
      setError('Could not delete this prayer request. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#202320]">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1c5b4d] hover:underline">
          <ArrowLeft className="size-4" /> Back to home
        </a>
        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c49752]">Prayer wall</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Prayer requests</h1>
          </div>
          {messages && messages.length > 0 && (
            <button
              onClick={handleDeleteAll}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="size-4" /> Delete all
            </button>
          )}
        </div>
        <p className="mt-4 leading-7 text-[#59615b]">
          We are praying with you. Here are the requests shared with our church family.
        </p>

        {notice && <p className="mt-6 text-sm font-medium text-[#1c5b4d]">{notice}</p>}

        <div className="mt-10 space-y-4">
          {error && <p className="text-sm text-red-700">{error}</p>}
          {messages === null && !error && <p className="text-sm text-[#59615b]">Loading…</p>}
          {messages?.length === 0 && <p className="text-sm text-[#59615b]">No prayer requests yet.</p>}
          {messages?.map((item) => (
            <article key={item.id} className="relative rounded-2xl border border-[#d9ddd7] bg-white p-5">
              <p className="whitespace-pre-wrap leading-7">{item.message}</p>
              <p className="mt-3 text-sm font-semibold text-[#1c5b4d]">— {item.name}</p>
              <p className="text-xs text-[#59615b]">
                {new Date(item.created_at).toLocaleString('en-PH', { timeZone: 'Asia/Manila', dateStyle: 'medium', timeStyle: 'short' })}
              </p>
              <button
                onClick={() => handleDeleteOne(item.id)}
                disabled={deleting}
                className="absolute right-5 top-5 rounded-full p-2 text-red-700 hover:bg-red-50 disabled:opacity-50"
                title="Delete this prayer request"
              >
                <Trash2 className="size-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PrayerMessagePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f5f0]" />}>
      <PrayerWallContent />
    </Suspense>
  )
}
