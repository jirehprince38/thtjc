'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { listPrayerMessages, type PrayerMessage } from '@/lib/prayer-messages'

export default function PrayerMessagePage() {
  const [messages, setMessages] = useState<PrayerMessage[] | null>(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
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

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#202320]">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1c5b4d] hover:underline">
          <ArrowLeft className="size-4" /> Back to home
        </a>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#c49752]">Prayer wall</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Prayer requests</h1>
        <p className="mt-4 leading-7 text-[#59615b]">
          We are praying with you. Here are the requests shared with our church family.
        </p>

        {notice && <p className="mt-6 text-sm font-medium text-[#1c5b4d]">{notice}</p>}

        <div className="mt-10 space-y-4">
          {error && <p className="text-sm text-red-700">{error}</p>}
          {messages === null && !error && <p className="text-sm text-[#59615b]">Loading…</p>}
          {messages?.length === 0 && <p className="text-sm text-[#59615b]">No prayer requests yet.</p>}
          {messages?.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[#d9ddd7] bg-white p-5">
              <p className="whitespace-pre-wrap leading-7">{item.message}</p>
              <p className="mt-3 text-sm font-semibold text-[#1c5b4d]">— {item.name}</p>
              <p className="text-xs text-[#59615b]">
                {new Date(item.created_at).toLocaleString('en-PH', { timeZone: 'Asia/Manila', dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
