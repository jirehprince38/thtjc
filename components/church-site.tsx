'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  HeartHandshake,
  LayoutDashboard,
  Link2,
  MapPin,
  Menu,
  MessageCircle,
  Settings2,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

type SiteSettings = {
  prayerTitle: string
  prayerDescription: string
  prayerLink: string
  returnTime: string
  prayerOpen: boolean
  facebookPage: string
}

const initialSettings: SiteSettings = {
  prayerTitle: 'Join our online prayer here',
  prayerDescription:
    'We gather online to pray, encourage one another, and make space for God together.',
  prayerLink: 'https://meet.google.com/',
  returnTime: '9:00 PM',
  prayerOpen: true,
  facebookPage: '',
}

const serviceTimes = [
  { label: 'Sunday Celebration', time: '8:00 AM', detail: 'Every Sunday' },
  { label: 'Mid-week Service', time: '7:00 PM', detail: 'Every Wednesday' },
  { label: 'Prayer Night', time: '9:00 PM', detail: 'Online gathering' },
]

export function ChurchSite() {
  const [settings, setSettings] = useState(initialSettings)
  const [adminOpen, setAdminOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  function updateSettings(next: Partial<SiteSettings>) {
    setSettings((current) => ({ ...current, ...next }))
    setSaved(false)
  }

  function saveSettings() {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2400)
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#202320]">
      <header className="border-b border-[#d9ddd7] bg-[#f7f5f0]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="THJTC home">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#1c5b4d] text-[#f7f5f0]">
              <span className="text-lg" aria-hidden="true">✝</span>
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
            <button className="flex items-center gap-2 rounded-full border border-[#b9c6bb] px-4 py-2 text-[#1c5b4d] transition-colors hover:border-[#1c5b4d]" onClick={() => setAdminOpen(true)}><Settings2 className="size-4" /> Admin</button>
          </nav>

          <button className="rounded-full p-2 text-[#1c5b4d] md:hidden" aria-label="Open menu" onClick={() => setMobileNavOpen((open) => !open)}>
            {mobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {mobileNavOpen && (
          <nav className="border-t border-[#d9ddd7] px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-4 text-sm font-medium text-[#59615b]">
              <a href="#welcome" onClick={() => setMobileNavOpen(false)}>Welcome</a>
              <a href="#services" onClick={() => setMobileNavOpen(false)}>Services</a>
              <a href="#contact" onClick={() => setMobileNavOpen(false)}>Contact</a>
              <button className="flex items-center gap-2 text-left text-[#1c5b4d]" onClick={() => { setAdminOpen(true); setMobileNavOpen(false) }}><Settings2 className="size-4" /> Admin panel</button>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-[#d9ddd7]">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:px-10 lg:pb-28 lg:pt-28">
            <div>
              <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#1c5b4d]"><span className="h-px w-10 bg-[#c49752]" /> Loving God, loving people</div>
              <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] text-[#202320] sm:text-6xl lg:text-8xl">A place to belong.<br /><em className="text-[#1c5b4d]">A faith to live.</em></h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#59615b]">Welcome to The Highest Tabernacle of Jesus Christ Ministry Int&apos;l. Come as you are, grow in grace, and find a community that walks with you.</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {settings.prayerOpen ? (
                  <a href={settings.prayerLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#1c5b4d] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1c5b4d]/15 transition-transform hover:-translate-y-0.5">{settings.prayerTitle}<ArrowUpRight className="size-4" /></a>
                ) : (
                  <div className="inline-flex items-center gap-3 rounded-full border border-[#c9d0c9] bg-white px-6 py-3.5 text-sm font-semibold text-[#1c5b4d]"><Clock3 className="size-4" /> Come back at {settings.returnTime}</div>
                )}
                <a href="#services" className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-semibold text-[#59615b] transition-colors hover:text-[#1c5b4d]">See our services <ArrowUpRight className="size-4" /></a>
              </div>
            </div>
            <div className="relative lg:pl-10">
              <div className="aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] bg-[#dfe7df] p-5 shadow-2xl shadow-[#1c5b4d]/10 lg:ml-auto">
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/70 bg-[#1c5b4d] p-7 text-[#f7f5f0]">
                  <div className="flex items-start justify-between"><span className="text-sm font-semibold tracking-[0.18em]">THJTC</span><Sparkles className="size-5 text-[#d6b26e]" /></div>
                  <div><p className="font-serif text-4xl leading-tight">“Go and make disciples of all nations.”</p><p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#d6b26e]">Matthew 28:19</p></div>
                  <div className="flex items-center gap-2 text-sm text-[#d9e4dc]"><MapPin className="size-4" /> Baliti, City of San Fernando</div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-1 hidden rounded-2xl border border-[#d9ddd7] bg-white p-4 shadow-xl sm:block lg:left-0"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1c5b4d]">You are welcome</p><p className="mt-1 text-sm text-[#59615b]">Every Sunday, just as you are.</p></div>
            </div>
          </div>
        </section>

        <section id="welcome" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c49752]">A warm welcome</p><h2 className="mt-4 max-w-sm font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">Faith grows better together.</h2></div><div className="max-w-2xl text-lg leading-8 text-[#59615b]"><p>Whether you&apos;re new to the area, looking for a spiritual home, or simply seeking a deeper connection with God, there&apos;s a place here for you.</p><p className="mt-6">Our vision is to win souls for Christ and make disciples — one life, one family, and one faithful step at a time.</p><div className="mt-9 flex items-center gap-3 text-sm font-semibold text-[#1c5b4d]"><HeartHandshake className="size-5" /> A community rooted in love and grace</div></div></div>
        </section>

        <section id="services" className="border-y border-[#d9ddd7] bg-[#eef2ec]"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-10"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1c5b4d]">Make room for worship</p><h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Join us this week.</h2></div><p className="max-w-sm text-sm leading-6 text-[#59615b]">Meet us in person at Purok 1, Baliti, City of San Fernando, Pampanga.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#d1d9d0] bg-[#d1d9d0] md:grid-cols-3">{serviceTimes.map((service) => <div key={service.label} className="bg-[#f7f5f0] p-7"><div className="mb-12 flex items-center justify-between"><CalendarDays className="size-5 text-[#1c5b4d]" /><span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#829087]">{service.detail}</span></div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#59615b]">{service.label}</p><p className="mt-2 font-serif text-4xl text-[#202320]">{service.time}</p></div>)}</div></div></section>

        <section id="contact" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1fr_0.8fr] lg:px-10"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c49752]">We&apos;d love to hear from you</p><h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">Have a question or prayer request?</h2><p className="mt-6 max-w-lg leading-7 text-[#59615b]">Send your name and message below. Our admin team will receive it securely.</p><form className="mt-8 max-w-lg space-y-4" onSubmit={async (event) => { event.preventDefault(); const form = event.currentTarget; const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) }); if (response.ok) { form.reset(); window.alert('Your message was sent. Thank you.') } }}><input name="name" required maxLength={120} placeholder="Your name" className="h-12 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 text-sm outline-none focus:border-[#1c5b4d]" /><textarea name="message" required minLength={3} maxLength={3000} placeholder="Your question or message" className="min-h-32 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 py-3 text-sm outline-none focus:border-[#1c5b4d]" /><button className="inline-flex items-center gap-2 rounded-full bg-[#1c5b4d] px-5 py-3 text-sm font-semibold text-white"><MessageCircle className="size-4" /> Send message</button></form></div><div className="rounded-2xl bg-[#1c5b4d] p-8 text-[#f7f5f0]"><MessageCircle className="size-7 text-[#d6b26e]" /><p className="mt-10 font-serif text-3xl leading-tight">“You are welcome here.”</p><p className="mt-4 text-sm leading-6 text-[#d9e4dc]">No matter where you are in your journey, there is room for you in this family.</p></div></section>
      </main>

      <footer className="border-t border-[#d9ddd7] px-5 py-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[#59615b] sm:flex-row"><p className="font-medium text-[#202320]">The Highest Tabernacle of Jesus Christ Ministry Int&apos;l</p><div className="flex items-center gap-5"><p>© 2026 All Rights Reserved.</p>{settings.facebookPage && <a href={settings.facebookPage} target="_blank" rel="noreferrer" className="font-semibold text-[#1c5b4d] hover:underline">Facebook page</a>}</div></div></footer>

      {adminOpen && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#15231d]/35 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="admin-title"><div className="max-h-[92vh] w-full max-w-xl overflow-auto rounded-t-3xl bg-[#f7f5f0] p-6 shadow-2xl sm:rounded-3xl sm:p-8"><div className="flex items-start justify-between"><div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1c5b4d]"><LayoutDashboard className="size-4" /> Site admin</div><h2 id="admin-title" className="mt-3 font-serif text-3xl">Prayer gathering settings</h2><p className="mt-2 text-sm leading-6 text-[#59615b]">Update the public prayer card without touching the rest of the site.</p></div><button className="rounded-full p-2 text-[#59615b] hover:bg-[#e7ebe5]" aria-label="Close admin panel" onClick={() => setAdminOpen(false)}><X className="size-5" /></button></div><div className="mt-8 space-y-5"><label className="flex items-center justify-between rounded-xl border border-[#d9ddd7] bg-white p-4"><span><span className="block text-sm font-semibold">Prayer gathering is live</span><span className="mt-1 block text-xs text-[#59615b]">Show the join link on the homepage</span></span><input type="checkbox" checked={settings.prayerOpen} onChange={(event) => updateSettings({ prayerOpen: event.target.checked })} className="size-5 accent-[#1c5b4d]" /></label><label className="block"><span className="text-sm font-semibold">Button title</span><input value={settings.prayerTitle} onChange={(event) => updateSettings({ prayerTitle: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 text-sm outline-none focus:border-[#1c5b4d] focus:ring-2 focus:ring-[#1c5b4d]/15" /></label><label className="block"><span className="text-sm font-semibold">Facebook page link</span><input value={settings.facebookPage} onChange={(event) => updateSettings({ facebookPage: event.target.value })} placeholder="https://facebook.com/your-page" className="mt-2 h-11 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 text-sm outline-none focus:border-[#1c5b4d] focus:ring-2 focus:ring-[#1c5b4d]/15" /></label><label className="block"><span className="text-sm font-semibold">Online prayer link</span><span className="mt-1 flex items-center gap-2 rounded-xl border border-[#cbd3cb] bg-white px-4 focus-within:border-[#1c5b4d] focus-within:ring-2 focus-within:ring-[#1c5b4d]/15"><Link2 className="size-4 text-[#829087]" /><input value={settings.prayerLink} onChange={(event) => updateSettings({ prayerLink: event.target.value })} className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none" /></span></label><label className="block"><span className="text-sm font-semibold">Return time when offline</span><input value={settings.returnTime} onChange={(event) => updateSettings({ returnTime: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 text-sm outline-none focus:border-[#1c5b4d] focus:ring-2 focus:ring-[#1c5b4d]/15" /></label></div><div className="mt-8 flex items-center justify-between border-t border-[#d9ddd7] pt-6"><span className="flex items-center gap-2 text-xs text-[#59615b]">{saved ? <><Check className="size-4 text-[#1c5b4d]" /> Changes saved for this session</> : <><ShieldCheck className="size-4" /> Admin preview mode</>}</span><button onClick={saveSettings} className="rounded-full bg-[#1c5b4d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#153f36]">Save changes</button></div></div></div>}
    </div>
  )
}

export default ChurchSite
