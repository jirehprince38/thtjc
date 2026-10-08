'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, BookOpen, Flame, Sparkles } from 'lucide-react'
import { initialSettings, loadRemoteSettings, readSiteSettings, SETTINGS_EVENT, type SiteSettings } from '@/lib/site-settings'

export default function PrayerCalendarPage() {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)

  useEffect(() => {
    const refreshSettings = () => setSettings(readSiteSettings())
    refreshSettings()
    void loadRemoteSettings()
    window.addEventListener(SETTINGS_EVENT, refreshSettings)
    window.addEventListener('storage', refreshSettings)
    return () => {
      window.removeEventListener(SETTINGS_EVENT, refreshSettings)
      window.removeEventListener('storage', refreshSettings)
    }
  }, [])

  const calendar = settings.prayerCalendar

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#202320]">
      <header className="border-b border-[#d9ddd7] bg-[#f7f5f0]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <a href="/" className="flex items-center gap-2 text-sm font-semibold text-[#1c5b4d]">
            <ArrowLeft className="size-4" /> Back to home
          </a>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1c5b4d]">THTJC</span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <section className="max-w-3xl">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c49752]">
            <Flame className="size-4" /> Prayer &amp; Fasting Calendar
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-[-0.03em] text-[#202320] sm:text-5xl">
            {calendar.title}
          </h1>
          {calendar.theme && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#1c5b4d]/20 bg-[#1c5b4d]/10 px-4 py-1.5 text-xs font-semibold text-[#1c5b4d] sm:text-sm">
              <Sparkles className="size-3.5 text-[#c49752]" /> Theme: &ldquo;{calendar.theme}&rdquo;
            </div>
          )}
          {(calendar.verseText || calendar.verseReference) && (
            <blockquote className="mt-6 rounded-2xl border-l-4 border-[#c49752] bg-[#f2eee6]/70 p-5 italic leading-7 text-[#59615b] sm:text-lg">
              {calendar.verseText && <p>&ldquo;{calendar.verseText}&rdquo;</p>}
              {calendar.verseReference && (
                <footer className="mt-2 text-sm font-semibold not-italic text-[#1c5b4d]">— {calendar.verseReference}</footer>
              )}
            </blockquote>
          )}
        </section>

        {calendar.entries.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {calendar.entries.map((entry, index) => (
              <article key={entry.id} className="group flex flex-col justify-between rounded-3xl border border-[#d9ddd7] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1c5b4d]/40 hover:shadow-xl">
                <div>
                  <div className="flex items-center justify-between border-b border-[#eef2ec] pb-4">
                    <div>
                      <span className="font-serif text-xl font-bold text-[#1c5b4d]">{entry.date}</span>
                      {entry.day && <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-[#829087]">({entry.day})</span>}
                    </div>
                    <span className="rounded-full bg-[#1c5b4d]/10 px-3 py-1 text-xs font-semibold text-[#1c5b4d]">Day {index + 1}</span>
                  </div>

                  {(entry.preacher || entry.openingPrayer) && (
                    <div className="mt-4 space-y-1.5 text-xs text-[#59615b]">
                      {entry.preacher && <p><strong className="text-[#202320]">Preacher:</strong> {entry.preacher}</p>}
                      {entry.openingPrayer && <p><strong className="text-[#202320]">Opening Prayer:</strong> {entry.openingPrayer}</p>}
                    </div>
                  )}

                  {(entry.topic || entry.scripture || entry.character) && (
                    <div className="mt-5">
                      {entry.topic && <><p className="text-[11px] font-bold uppercase tracking-wider text-[#c49752]">Topic</p><h2 className="mt-0.5 font-serif text-lg font-bold text-[#202320]">{entry.topic}</h2></>}
                      {(entry.scripture || entry.character) && (
                        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                          {entry.scripture && <span className="inline-flex items-center gap-1.5 rounded-md bg-[#eef2ec] px-2.5 py-1 font-semibold text-[#1c5b4d]"><BookOpen className="size-3" /> {entry.scripture}</span>}
                          {entry.character && <span className="rounded-md border border-[#e5ebe5] bg-[#f7f5f0] px-2.5 py-1 text-[#59615b]">Character: <strong className="text-[#202320]">{entry.character}</strong></span>}
                        </div>
                      )}
                    </div>
                  )}

                  {entry.reflection && <p className="mt-4 whitespace-pre-line text-xs leading-relaxed text-[#59615b]">{entry.reflection}</p>}
                </div>

                {entry.prayerFocus && (
                  <div className="mt-6 rounded-2xl border border-[#cde0d7] bg-[#f0f7f3] p-4 text-xs text-[#1c5b4d]">
                    <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1c5b4d]">🙏 Prayer Focus</p>
                    <p className="whitespace-pre-line italic leading-relaxed text-[#202320]">&ldquo;{entry.prayerFocus}&rdquo;</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-12 rounded-2xl border border-dashed border-[#b9c6bb] bg-white p-8 text-center text-[#59615b]">The prayer calendar will be updated soon.</p>
        )}
      </div>
    </main>
  )
}
