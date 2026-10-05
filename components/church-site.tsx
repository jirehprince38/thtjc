'use client'

import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  HeartHandshake,
  MapPin,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react'
import {
  formatServiceTime,
  initialSettings,
  loadRemoteSettings,
  nextPrayerTime,
  readSiteSettings,
  SETTINGS_EVENT,
  type SiteSettings,
} from '@/lib/site-settings'
import { sendPrayerMessage } from '@/lib/prayer-messages'

function safeWebLink(value: string, fallback = '#') {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : fallback
  } catch {
    return fallback
  }
}

function SectionPhotos({
  images,
  label,
}: {
  images: [string, string]
  label: string
}) {
  const visibleImages = images.filter(Boolean).slice(0, 2)
  if (visibleImages.length === 0) return null

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {visibleImages.map((image, index) => (
        <img
          key={`${label}-${index}`}
          src={image}
          alt={`${label} photo ${index + 1}`}
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      ))}
    </div>
  )
}

function PrayerCountdown({ startsAt }: { startsAt: string }) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  if (!startsAt || now === null) return null
  const target = nextPrayerTime(now)

  const remaining = Math.max(0, Math.floor((target - now) / 1000))
  const days = Math.floor(remaining / 86400)
  const hours = Math.floor((remaining % 86400) / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60
  const countdown = [
    days ? `${days}d` : '',
    `${String(hours).padStart(2, '0')}h`,
    `${String(minutes).padStart(2, '0')}m`,
    `${String(seconds).padStart(2, '0')}s`,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className="mt-5 inline-flex flex-col rounded-2xl border border-[#d9ddd7] bg-white px-5 py-4"
      aria-live="polite"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#59615b]">
        Online prayer
      </span>
      <span className="mt-1 font-serif text-2xl text-[#1c5b4d]">
        {remaining === 0 ? 'Prayer time has arrived' : countdown}
      </span>
      <span className="mt-1 text-xs text-[#59615b]">
        {remaining === 0 ? 'Join us in prayer' : 'until we gather'}
      </span>
    </div>
  )
}

export function ChurchSite() {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [submitNotice, setSubmitNotice] = useState('')

  useEffect(() => {
    const refreshSettings = () => setSettings(readSiteSettings())
    refreshSettings()
    loadRemoteSettings()
    window.addEventListener(SETTINGS_EVENT, refreshSettings)
    window.addEventListener('storage', refreshSettings)
    return () => {
      window.removeEventListener(SETTINGS_EVENT, refreshSettings)
      window.removeEventListener('storage', refreshSettings)
    }
  }, [])

  const prayerHref = safeWebLink(settings.prayerLink)
  const facebookHref = safeWebLink(settings.facebookPage)

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#202320]">
      <header className="border-b border-[#d9ddd7] bg-[#f7f5f0]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="THJTC home">
            <span className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-[#1c5b4d] text-[#f7f5f0]">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="THJTC logo" className="size-full object-contain" />
              ) : (
                <span className="text-lg" aria-hidden="true">✝</span>
              )}
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c5b4d]">THJTC</span>
              <span className="block font-serif text-lg leading-none text-[#202320]">The Highest Tabernacle</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#59615b] md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-[#1c5b4d]" href="#welcome">Welcome</a>
            <a className="transition-colors hover:text-[#1c5b4d]" href="#services">Services</a>
            <a className="transition-colors hover:text-[#1c5b4d]" href="#contact">Contact</a>
          </nav>

          <button
            className="rounded-full p-2 text-[#1c5b4d] md:hidden"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            {mobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {mobileNavOpen && (
          <nav className="border-t border-[#d9ddd7] px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-4 text-sm font-medium text-[#59615b]">
              <a href="#welcome" onClick={() => setMobileNavOpen(false)}>Welcome</a>
              <a href="#services" onClick={() => setMobileNavOpen(false)}>Services</a>
              <a href="#contact" onClick={() => setMobileNavOpen(false)}>Contact</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-[#d9ddd7]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:px-10 lg:pb-28 lg:pt-28">
            <div>
              <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#1c5b4d]">
                <span className="h-px w-10 bg-[#c49752]" /> Loving God, loving people
              </div>
              <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] text-[#202320] sm:text-6xl lg:text-8xl">
                A place to belong.<br /><em className="text-[#1c5b4d]">A faith to live.</em>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#59615b]">
                Welcome to The Highest Tabernacle of Jesus Christ Ministry Int&apos;l. Come as you are, grow in grace, and find a community that walks with you.
              </p>
              <SectionPhotos images={settings.sectionImages.hero} label="Home" />
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {settings.prayerOpen ? (
                  <a
                    href={prayerHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-[#1c5b4d] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1c5b4d]/15 transition-transform hover:-translate-y-0.5"
                  >
                    {settings.prayerTitle}<ArrowUpRight className="size-4" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-3 rounded-full border border-[#c9d0c9] bg-white px-6 py-3.5 text-sm font-semibold text-[#1c5b4d]">
                    <Clock3 className="size-4" /> Come back at {settings.returnTime}
                  </div>
                )}
                <a href="#services" className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-semibold text-[#59615b] transition-colors hover:text-[#1c5b4d]">
                  See our services <ArrowUpRight className="size-4" />
                </a>
              </div>
              {settings.prayerDescription && (
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#59615b]">{settings.prayerDescription}</p>
              )}
              {settings.prayerLeaderName && (
                <p className="mt-3 text-sm font-semibold text-[#1c5b4d]">
                  Prayer leader: {settings.prayerLeaderName}
                </p>
              )}
              <PrayerCountdown startsAt={settings.prayerStartsAt} />
            </div>

            <div className="relative lg:pl-10">
              <div className="aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] bg-[#dfe7df] p-5 shadow-2xl shadow-[#1c5b4d]/10 lg:ml-auto">
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/70 bg-[#1c5b4d] p-7 text-[#f7f5f0]">
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-semibold tracking-[0.18em]">THJTC</span>
                    <Sparkles className="size-5 text-[#d6b26e]" />
                  </div>
                  <div>
                    <p className="font-serif text-4xl leading-tight">"Go and make disciples of all nations."</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#d6b26e]">Matthew 28:19</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#d9e4dc]">
                    <MapPin className="size-4" /> Baliti, City of San Fernando
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-1 hidden rounded-2xl border border-[#d9ddd7] bg-white p-4 shadow-xl sm:block lg:left-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1c5b4d]">You are welcome</p>
                <p className="mt-1 text-sm text-[#59615b]">Every Sunday, just as you are.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="welcome" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c49752]">A warm welcome</p>
              <h2 className="mt-4 max-w-sm font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">Faith grows better together.</h2>
            </div>
            <div className="max-w-2xl text-lg leading-8 text-[#59615b]">
              <p>Whether you&apos;re new to the area, looking for a spiritual home, or simply seeking a deeper connection with God, there&apos;s a place here for you.</p>
              <p className="mt-6">Our vision is to win souls for Christ and make disciples — one life, one family, and one faithful step at a time.</p>
              <div className="mt-9 flex items-center gap-3 text-sm font-semibold text-[#1c5b4d]">
                <HeartHandshake className="size-5" /> A community rooted in love and grace
              </div>
              <SectionPhotos images={settings.sectionImages.welcome} label="Welcome" />
            </div>
          </div>
        </section>

        <section id="services" className="border-y border-[#d9ddd7] bg-[#eef2ec]">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1c5b4d]">Make room for worship</p>
                <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Join us this week.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#59615b]">Meet us in person at Purok 1, Baliti, City of San Fernando, Pampanga.</p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#d1d9d0] bg-[#d1d9d0] md:grid-cols-3">
              {settings.services.filter((service) => service.visible).map((service) => (
                <div key={service.id} className="bg-[#f7f5f0] p-7">
                  <div className="mb-12 flex items-center justify-between">
                    <CalendarDays className="size-5 text-[#1c5b4d]" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#829087]">{service.detail}</span>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#59615b]">{service.label}</p>
                  <p className="mt-2 font-serif text-4xl text-[#202320]">{formatServiceTime(service.time)}</p>
                </div>
              ))}
            </div>
            <SectionPhotos images={settings.sectionImages.services} label="Services" />
          </div>
        </section>

        <section id="contact" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1fr_0.8fr] lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c49752]">We&apos;d love to hear from you</p>
            <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">Share your prayer request</h2>
            <p className="mt-6 max-w-lg leading-7 text-[#59615b]">Send your name and prayer request below. It will be posted on our Prayer Wall so we can pray for you.</p>
            {submitNotice && (
              <p className="mt-4 rounded-xl border border-[#cde0d7] bg-[#edf7f1] px-4 py-3 text-sm font-medium text-[#1c5b4d]">
                {submitNotice}
              </p>
            )}
            <form
              className="mt-8 max-w-lg space-y-4"
              onSubmit={async (event) => {
                event.preventDefault()
                const form = event.currentTarget
                const data = new FormData(form)
                try {
                  await sendPrayerMessage(String(data.get('name') || ''), String(data.get('message') || ''))
                  form.reset()
                  setSubmitNotice('You submitted your prayer request.')
                } catch {
                  setSubmitNotice('Could not send your prayer request. Please try again.')
                }
              }}
            >
              <input name="name" required maxLength={120} placeholder="Your name" className="h-12 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 text-sm outline-none focus:border-[#1c5b4d] focus:ring-2 focus:ring-[#1c5b4d]/15" />
              <textarea name="message" required minLength={3} maxLength={3000} placeholder="Your prayer request" className="min-h-32 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 py-3 text-sm outline-none focus:border-[#1c5b4d] focus:ring-2 focus:ring-[#1c5b4d]/15" />
              <button className="inline-flex items-center gap-2 rounded-full bg-[#1c5b4d] px-5 py-3 text-sm font-semibold text-white">
                <MessageCircle className="size-4" /> Send prayer request
              </button>
            </form>
            <SectionPhotos images={settings.sectionImages.contact} label="Contact" />
          </div>
          <div className="rounded-2xl bg-[#1c5b4d] p-8 text-[#f7f5f0]">
            <MessageCircle className="size-7 text-[#d6b26e]" />
            <p className="mt-10 font-serif text-3xl leading-tight">"You are welcome here."</p>
            <p className="mt-4 text-sm leading-6 text-[#d9e4dc]">No matter where you are in your journey, there is room for you in this family.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d9ddd7] px-5 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[#59615b] sm:flex-row">
          <p className="font-medium text-[#202320]">The Highest Tabernacle of Jesus Christ Ministry Int&apos;l</p>
          <div className="flex items-center gap-5">
            <p>© 2026 All Rights Reserved.</p>
            {settings.facebookPage && facebookHref !== '#' && (
              <a href={facebookHref} target="_blank" rel="noreferrer" className="font-semibold text-[#1c5b4d] hover:underline">Facebook page</a>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ChurchSite
