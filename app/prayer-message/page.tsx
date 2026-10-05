'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, HeartHandshake } from 'lucide-react'
import { listPrayerMessages, sendPrayerMessage, type PrayerMessage } from '@/lib/prayer-messages'

export default function PrayerMessagePage() {
  const [messages, setMessages] = useState<PrayerMessage[] | null>(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [sending, setSending] = useState(false)

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

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#202320]">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1c5b4d] hover:underline">
          <ArrowLeft className="size-4" /> Back to home
        </a>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#c49752]">Prayer wall</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Prayer messages</h1>
        <p className="mt-4 leading-7 text-[#59615b]">
          Share your prayer request, and let us pray for one another.
        </p>

        <form
          className="mt-8 space-y-4 rounded-2xl border border-[#d9ddd7] bg-white p-5"
          onSubmit={async (event) => {
            event.preventDefault()
            const form = event.currentTarget
            const data = new FormData(form)
            setSending(true)
            setNotice('')
            try {
              await sendPrayerMessage(String(data.get('name') || ''), String(data.get('message') || ''))
              form.reset()
              setNotice('Your prayer request was posted. We are praying with you.')
              await load()
            } catch {
              setNotice('Could not send. Please try again.')
            } finally {
              setSending(false)
            }
          }}
        >
          <input name="name" required maxLength={120} placeholder="Your name" className="h-12 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 text-sm outline-none focus:border-[#1c5b4d]" />
          <textarea name="message" required minLength={3} maxLength={3000} placeholder="Your prayer request" className="min-h-32 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 py-3 text-sm outline-none focus:border-[#1c5b4d]" />
          <button disabled={sending} className="inline-flex items-center gap-2 rounded-full bg-[#1c5b4d] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
            <HeartHandshake className="size-4" /> {sending ? 'Sending…' : 'Post prayer request'}
          </button>
          {notice && <p className="text-sm text-[#1c5b4d]">{notice}</p>}
        </form>

        <div className="mt-10 space-y-4">
          {error && <p className="text-sm text-red-700">{error}</p>}
          {messages === null && !error && <p className="text-sm text-[#59615b]">Loading…</p>}
          {messages?.length === 0 && <p className="text-sm text-[#59615b]">No prayer messages yet.</p>}
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
