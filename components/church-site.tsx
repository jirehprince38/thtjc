'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarDays, Clock3, HeartHandshake, MapPin, Menu, MessageCircle, Play, X } from 'lucide-react'
import { formatServiceTime, initialSettings, loadRemoteSettings, nextPrayerTime, readSiteSettings, SETTINGS_EVENT, type SiteSettings } from '@/lib/site-settings'
import { sendPrayerMessage } from '@/lib/prayer-messages'

function safeWebLink(value: string, fallback = '#') {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : fallback
  } catch { return fallback }
}

function SectionPhotos({ images, label, className = '' }: { images: [string, string]; label: string; className?: string }) {
  const [failedImages, setFailedImages] = useState<string[]>([])
  const visibleImages = images.filter((image) => image && !failedImages.includes(image)).slice(0, 2)
  if (!visibleImages.length) return null
  return (
    <div className={`mt-10 ${visibleImages.length === 1 ? 'max-w-3xl' : 'grid gap-6 sm:grid-cols-2'} ${className}`}>
      {visibleImages.map((image, index) => (
        <div key={`${label}-${index}`} className="group overflow-hidden rounded-lg border border-church-line bg-church-soft">
          <img src={image} alt={`${label} photo ${index + 1}`} loading="lazy" onError={() => setFailedImages((previous) => [...previous, image])} className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        </div>
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
  const remaining = Math.max(0, Math.floor((nextPrayerTime(now) - now) / 1000))
  const days = Math.floor(remaining / 86400)
  const countdown = [days ? `${days}d` : '', `${String(Math.floor((remaining % 86400) / 3600)).padStart(2, '0')}h`, `${String(Math.floor((remaining % 3600) / 60)).padStart(2, '0')}m`, `${String(remaining % 60).padStart(2, '0')}s`].filter(Boolean).join(' ')
  return (
    <div className="mt-5 inline-flex flex-col border-l-2 border-church-brand pl-4">
      <span className="text-xs font-semibold uppercase text-church-muted">Online prayer</span>
      <span className="mt-1 text-xl font-medium tabular-nums text-church-brand">{remaining === 0 ? 'Prayer time has arrived' : countdown}</span>
      <span className="mt-1 text-xs text-church-muted">{remaining === 0 ? 'Join us in prayer' : 'until we gather'}</span>
    </div>
  )
}

const primaryLink = 'inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-church-brand px-6 py-3 text-sm font-semibold text-church-on-brand transition-colors hover:bg-church-brand-deep'
const secondaryLink = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-church-line bg-church-surface px-5 py-3 text-sm font-semibold text-church-brand hover:bg-church-soft'
const navigationLink = 'py-2 text-sm font-medium text-church-muted hover:text-church-brand'

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
    return () => { window.removeEventListener(SETTINGS_EVENT, refreshSettings); window.removeEventListener('storage', refreshSettings) }
  }, [])
  const prayerHref = safeWebLink(settings.prayerLink)
  const prayerRecordingHref = safeWebLink(settings.prayerRecordingLink)
  const facebookHref = safeWebLink(settings.facebookPage)
  return (
    <div className="church-site min-h-screen bg-church-paper text-church-ink">
      <header className="sticky top-0 z-40 border-b border-church-line bg-church-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="THTJC home">
            <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-church-brand text-church-on-brand">
              {settings.logoUrl ? <img src={settings.logoUrl} alt="THTJC logo" className="size-full object-cover" /> : <span className="text-lg" aria-hidden="true">✝</span>}
            </span>
            <span><span className="block text-[11px] font-semibold uppercase text-church-brand">THTJC</span><span className="block font-serif text-lg leading-tight">The Highest Tabernacle</span></span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            <a className={navigationLink} href="#welcome">Welcome</a><a className={navigationLink} href="/prayer-calendar">Prayer Calendar</a><a className={navigationLink} href="#services">Services</a><a className={navigationLink} href="#contact">Contact</a>
          </nav>
          <button className="flex size-11 shrink-0 items-center justify-center rounded-md text-church-brand md:hidden" aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileNavOpen} aria-controls="church-mobile-nav" onClick={() => setMobileNavOpen((open) => !open)}>{mobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
        {mobileNavOpen && <nav id="church-mobile-nav" className="border-t border-church-line px-5 py-3 md:hidden" aria-label="Mobile navigation"><div className="flex flex-col gap-1"><a className={navigationLink} href="#welcome" onClick={() => setMobileNavOpen(false)}>Welcome</a><a className={navigationLink} href="/prayer-calendar" onClick={() => setMobileNavOpen(false)}>Prayer Calendar</a><a className={navigationLink} href="#services" onClick={() => setMobileNavOpen(false)}>Services</a><a className={navigationLink} href="#contact" onClick={() => setMobileNavOpen(false)}>Contact</a></div></nav>}
      </header>
      <main id="top">
        <section className="border-b border-church-line">
          <div className="mx-auto max-w-7xl px-5 pb-8 pt-8 lg:px-10 lg:pb-12 lg:pt-12">
            <p className="mb-5 text-xs font-semibold uppercase text-church-brand">Loving God, loving people</p>
            <h1 className="max-w-4xl font-serif text-4xl leading-[1.08] tracking-normal sm:text-5xl lg:text-6xl">The Highest Tabernacle<br /><span className="text-church-brand">of Jesus Christ</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-church-muted sm:text-lg">Welcome to The Highest Tabernacle of Jesus Christ Ministry Int&apos;l. Come as you are, grow in grace, and find a community that walks with you.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {settings.prayerOpen ? <a href={prayerHref} target="_blank" rel="noreferrer" className={primaryLink}>{settings.prayerTitle}<ArrowUpRight className="size-4" /></a> : <div className="inline-flex min-h-12 items-center gap-2 rounded-md border border-church-line bg-church-surface px-5 py-3 text-sm text-church-muted"><Clock3 className="size-4 text-church-brand" />Come back at {settings.returnTime}</div>}
              {settings.prayerRecordingLink && prayerRecordingHref !== '#' && <a href={prayerRecordingHref} target="_blank" rel="noreferrer" className={settings.prayerOpen ? secondaryLink : primaryLink}><Play className="size-4 fill-current" />Watch the prayer recording<ArrowUpRight className="size-4" /></a>}
              <a href="#services" className="inline-flex min-h-12 items-center gap-2 px-2 py-3 text-sm font-semibold text-church-muted hover:text-church-brand">See our services<ArrowUpRight className="size-4" /></a>
            </div>
            {settings.prayerDescription && <p className="mt-4 max-w-2xl text-sm leading-6 text-church-muted">{settings.prayerDescription}</p>}
            {settings.prayerLeaderName && <p className="mt-3 text-sm font-semibold text-church-brand">Prayer leader: {settings.prayerLeaderName}</p>}
            <PrayerCountdown startsAt={settings.prayerStartsAt} />
          </div>
          <div className="church-announcement border-t border-church-line bg-church-soft"><div className="mx-auto max-w-7xl px-5 py-7 lg:px-10">
            <img src={settings.sectionImages.hero[0] || 'https://user42297.na.imgto.link/public/20261008/736a9af8009c0fb5a557476f-online-prayer-church-announcement.avif?__imgto_raw=1'} alt="THTJC Church Pampanga — online prayer gathering" className="mx-auto max-h-80 w-full object-contain" fetchPriority="high" />
            {settings.sectionImages.hero[1] && <SectionPhotos images={['', settings.sectionImages.hero[1]]} label="Home" />}
          </div></div>
        </section>
        <section id="welcome" className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div><p className="text-xs font-semibold uppercase text-church-gold">A warm welcome</p><h2 className="mt-4 max-w-sm font-serif text-4xl leading-tight sm:text-5xl">Faith grows better together.</h2></div>
            <div className="max-w-2xl text-lg leading-8 text-church-muted"><p>Whether you&apos;re new to the area, looking for a spiritual home, or simply seeking a deeper connection with God, there&apos;s a place here for you.</p><p className="mt-6">Our vision is to win souls for Christ and make disciples — one life, one family, and one faithful step at a time.</p><div className="mt-8 flex items-center gap-3 text-sm font-semibold text-church-brand"><HeartHandshake className="size-5 shrink-0" />A community rooted in love and grace</div><SectionPhotos images={settings.sectionImages.welcome} label="Welcome" /></div>
          </div>
        </section>
        <section id="services" className="border-y border-church-line bg-church-soft"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase text-church-brand">Make room for worship</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Join us this week.</h2></div><p className="max-w-sm text-sm leading-6 text-church-muted">Meet us in person at Purok 1, Baliti, City of San Fernando, Pampanga.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{settings.services.filter((service) => service.visible).map((service) => <div key={service.id} className="border-t-2 border-church-brand bg-church-surface p-7"><div className="mb-8 flex items-center justify-between gap-4"><CalendarDays className="size-5 shrink-0 text-church-brand" /><span className="text-xs font-semibold text-church-muted">{service.detail}</span></div><p className="text-sm font-semibold text-church-muted">{service.label}</p><p className="mt-2 font-serif text-4xl">{formatServiceTime(service.time)}</p></div>)}</div>
          <SectionPhotos images={settings.sectionImages.services} label="Services" />
        </div></section>
        <section id="contact" className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_0.8fr] lg:px-10 lg:py-20">
          <div><p className="text-xs font-semibold uppercase text-church-gold">We&apos;d love to hear from you</p><h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight sm:text-5xl">Share your prayer request</h2><p className="mt-6 max-w-lg leading-7 text-church-muted">Send your name and prayer request below. It will be posted on our Prayer Wall so we can pray for you.</p>
            {submitNotice && <p role="status" className="mt-4 rounded-md border border-church-line bg-church-soft px-4 py-3 text-sm font-medium text-church-brand">{submitNotice}</p>}
            <form className="mt-8 max-w-lg space-y-4" onSubmit={async (event) => {
              event.preventDefault()
              const form = event.currentTarget
              const data = new FormData(form)
              try { await sendPrayerMessage(String(data.get('name') || ''), String(data.get('message') || '')); form.reset(); setSubmitNotice('You submitted your prayer request.') } catch { setSubmitNotice('Could not send your prayer request. Please try again.') }
            }}>
              <label className="block text-sm font-semibold" htmlFor="prayer-name">Your name</label><input id="prayer-name" name="name" autoComplete="name" required maxLength={120} placeholder="Your name" className="h-12 w-full rounded-md border border-church-line bg-church-surface px-4 text-sm outline-none focus:border-church-brand focus:ring-2 focus:ring-church-brand/15" />
              <label className="block text-sm font-semibold" htmlFor="prayer-message">Your prayer request</label><textarea id="prayer-message" name="message" required minLength={3} maxLength={3000} placeholder="Your prayer request" className="min-h-32 w-full rounded-md border border-church-line bg-church-surface px-4 py-3 text-sm outline-none focus:border-church-brand focus:ring-2 focus:ring-church-brand/15" />
              <button className={primaryLink}><MessageCircle className="size-4" />Send prayer request</button>
            </form><SectionPhotos images={settings.sectionImages.contact} label="Contact" />
          </div>
          <div className="border-l border-church-line pl-8"><MessageCircle className="size-7 text-church-brand" /><p className="mt-8 font-serif text-3xl leading-tight">&quot;You are welcome here.&quot;</p><p className="mt-4 max-w-sm text-sm leading-6 text-church-muted">No matter where you are in your journey, there is room for you in this family.</p><p className="mt-8 flex items-start gap-3 text-sm leading-6 text-church-muted"><MapPin className="mt-1 size-4 shrink-0 text-church-brand" />Purok 1, Baliti, City of San Fernando, Pampanga</p></div>
        </section>
      </main>
      <footer className="border-t border-church-line px-5 py-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-church-muted sm:flex-row"><p className="max-w-lg font-medium text-church-ink">The Highest Tabernacle of Jesus Christ Ministry Int&apos;l</p><div className="flex flex-wrap items-center gap-5"><p>© 2026 All Rights Reserved.</p>{settings.facebookPage && facebookHref !== '#' && <a href={facebookHref} target="_blank" rel="noreferrer" className="font-semibold text-church-brand hover:underline">Facebook page</a>}</div></div></footer>
    </div>
  )
}
export default ChurchSite
