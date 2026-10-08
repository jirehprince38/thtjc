export const SETTINGS_STORAGE_KEY = 'thtjc-site-settings-v1'
export const SETTINGS_EVENT = 'thtjc-site-settings-change'

export type ContentSection = 'hero' | 'welcome' | 'services' | 'contact'
export type ImagePair = [string, string]

export type EditableService = {
  id: string
  label: string
  time: string
  detail: string
  visible: boolean
}

export type EditablePrayerCalendarEntry = {
  id: string
  date: string
  day: string
  preacher: string
  openingPrayer: string
  topic: string
  scripture: string
  character: string
  reflection: string
  prayerFocus: string
}

export type PrayerCalendarContent = {
  title: string
  theme: string
  verseText: string
  verseReference: string
  entries: EditablePrayerCalendarEntry[]
}

export type SiteSettings = {
  logoUrl: string
  prayerTitle: string
  prayerDescription: string
  prayerLeaderName: string
  prayerLink: string
  prayerRecordingLink: string
  prayerStartsAt: string
  returnTime: string
  prayerOpen: boolean
  facebookPage: string
  services: EditableService[]
  prayerCalendar: PrayerCalendarContent
  sectionImages: Record<ContentSection, ImagePair>
}

export const initialSettings: SiteSettings = {
  logoUrl: '',
  prayerTitle: 'Join our online prayer here',
  prayerDescription:
    'We gather online to pray, encourage one another, and make space for God together.',
  prayerLeaderName: '',
  prayerLink: 'https://meet.google.com/',
  prayerRecordingLink: '',
  prayerStartsAt: '',
  returnTime: '9:00 PM',
  prayerOpen: true,
  facebookPage: '',
  services: [
    { id: 'sunday', label: 'Sunday Celebration', time: '08:00', detail: 'Every Sunday', visible: true },
    { id: 'midweek', label: 'Mid-week Service', time: '19:00', detail: 'Every Wednesday', visible: true },
    { id: 'prayer-night', label: 'Prayer Night', time: '21:00', detail: 'Online gathering', visible: true },
  ],
  prayerCalendar: {
    title: 'THTJC Prayer & Fasting Calendar',
    theme: "HUNGER & THIRST IN GOD'S PRESENCE",
    verseText: 'Gaya ng usa na sabik sa batis ng tubig, gayon ang aking kaluluwa ay sabik sa iyo, O Diyos.',
    verseReference: 'Awit 42:1',
    entries: [
      { id: 'day-1', date: 'October 5', day: 'Monday', preacher: 'Samuel Ocampo', openingPrayer: 'Arnel Templado', topic: 'HUNGER FOR GOD', scripture: 'Awit 63:1', character: 'David', reflection: 'Si David ay may matinding pagnanais na hanapin ang Diyos. Kahit nasa ilang siya, hindi niya hinanap lamang ang comfort—hinanap niya ang presensya ng Diyos.', prayerFocus: 'Lord, bigyan Mo ako ng pusong tunay na nagugutom sa Iyo. Higit sa pera, success, comfort, at approval ng tao, Ikaw ang maging pinakamahalaga sa akin.' },
      { id: 'day-2', date: 'October 6', day: 'Tuesday', preacher: 'Ching Baid', openingPrayer: 'Khecelyn Baid', topic: 'THIRST FOR GOD’S WORD', scripture: 'Jeremias 15:16', character: 'Jeremiah', reflection: 'Para kay Jeremias, ang salita ng Diyos ay parang pagkain na nagbibigay-buhay. Kapag tunay tayong uhaw sa Diyos, magiging mahalaga sa atin ang Kanyang Salita.', prayerFocus: 'Lord, alisin Mo ang spiritual dryness. Bigyan Mo ako ng desire na magbasa, makinig, at mamuhay ayon sa Iyong Salita.' },
      { id: 'day-3', date: 'October 7', day: 'Wednesday', preacher: 'Maribel Juan', openingPrayer: 'Maribel Espino', topic: 'CHOOSE GOD’S PRESENCE', scripture: 'Lucas 10:38–42', character: 'Mary', reflection: 'Habang abala si Martha sa paglilingkod, pinili ni Mary na umupo sa paanan ni Jesus at makinig sa Kanya. Hindi masama ang maglingkod, pero kailangan nating matutunan na bago ang ginagawa para kay Jesus, mahalaga ang relasyon natin kay Jesus.', prayerFocus: 'Lord, tulungan Mo akong hindi maging sobrang abala sa ministry at buhay na nakakalimutan ko nang umupo sa Iyong presensya.' },
      { id: 'day-4', date: 'October 8', day: 'Thursday', preacher: 'Maan Inah Palmer', openingPrayer: 'Lyn Igana', topic: 'DESIRE MORE OF GOD', scripture: '1 Hari 19:9–13', character: 'Elijah', reflection: 'Pagkatapos ng matinding battle, natutunan ni Elijah na makinig sa Diyos hindi lamang sa malalaking manifestations kundi maging sa banayad na tinig ng Panginoon.', prayerFocus: 'Lord, quiet my heart. Alisin ang distractions at ingay na pumipigil sa akin na marinig Ka. Give me a deeper desire for Your presence.' },
      { id: 'day-5', date: 'October 9', day: 'Friday', preacher: 'Nanay Leonida', openingPrayer: 'Bro Ariel Espino', topic: 'NEVER STOP SEEKING GOD', scripture: 'Filipos 3:10–14', character: 'Paul', reflection: 'Kahit marami nang naranasan si Paul kasama ang Diyos, hindi siya tumigil. Patuloy niyang hinahangad na mas makilala si Cristo. Hindi dapat matapos ang hunger natin dahil lamang may naranasan na tayo sa Diyos.', prayerFocus: 'Lord, give me a hunger that never dies and a thirst that never disappears. Help me to seek You every day until the end.' },
      { id: 'day-6', date: 'October 10', day: 'Saturday', preacher: 'Sheena Salvador', openingPrayer: 'Bro Jerry', topic: 'HUNGER THAT LEADS TO OBEDIENCE', scripture: 'Genesis 12:1–4', character: 'Abraham', reflection: 'Nang tawagin ng Diyos si Abraham, sumunod siya kahit hindi niya alam ang buong journey. Ang tunay na gutom sa Diyos ay hindi lamang emosyon—humahantong ito sa pagsunod.', prayerFocus: 'Lord, bigyan Mo ako ng faith to obey. Kahit hindi ko pa nakikita ang lahat, susunod ako sa Iyong salita.' },
      { id: 'day-7', date: 'October 11', day: 'Sunday', preacher: 'Ps Emilie', openingPrayer: 'Precious', topic: 'HUNGER FOR REVIVAL', scripture: 'Habakuk 3:2', character: 'Habakuk', reflection: 'Nananalangin si Habakuk: “Buhayin Mo muli ang Iyong gawain.” Ang revival ay nagsisimula sa mga taong nagugutom at nauuhaw na makita ang Diyos na kumilos muli.', prayerFocus: 'Lord, revive my heart. Revive our families. Revive our young people. Revive our leaders. Revive THTJC. Let revival begin in me.' },
    ],
  },
  sectionImages: {
    hero: ['', ''],
    welcome: ['', ''],
    services: ['', ''],
    contact: ['', ''],
  },
}

export function readSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return initialSettings

  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!stored) return initialSettings

    const parsed = JSON.parse(stored) as Partial<SiteSettings>
    const sectionImages = { ...initialSettings.sectionImages }
    for (const section of Object.keys(sectionImages) as ContentSection[]) {
      const pair = parsed.sectionImages?.[section]
      if (Array.isArray(pair)) {
        sectionImages[section] = [String(pair[0] || ''), String(pair[1] || '')]
      }
    }

    const calendar = parsed.prayerCalendar
    const calendarEntries = Array.isArray(calendar?.entries)
      ? calendar.entries.map((entry, index) => {
          const fallback = initialSettings.prayerCalendar.entries[index] || {
            id: `day-${index + 1}`, date: '', day: '', preacher: '', openingPrayer: '',
            topic: '', scripture: '', character: '', reflection: '', prayerFocus: '',
          }
          return {
            ...fallback,
            ...entry,
            id: String(entry.id ?? fallback.id),
            date: String(entry.date ?? ''),
            day: String(entry.day ?? ''),
            preacher: String(entry.preacher ?? ''),
            openingPrayer: String(entry.openingPrayer ?? ''),
            topic: String(entry.topic ?? ''),
            scripture: String(entry.scripture ?? ''),
            character: String(entry.character ?? ''),
            reflection: String(entry.reflection ?? ''),
            prayerFocus: String(entry.prayerFocus ?? ''),
          }
        })
      : initialSettings.prayerCalendar.entries
    const prayerCalendar = {
      ...initialSettings.prayerCalendar,
      ...calendar,
      title: String(calendar?.title ?? initialSettings.prayerCalendar.title),
      theme: String(calendar?.theme ?? initialSettings.prayerCalendar.theme),
      verseText: String(calendar?.verseText ?? initialSettings.prayerCalendar.verseText),
      verseReference: String(calendar?.verseReference ?? initialSettings.prayerCalendar.verseReference),
      entries: calendarEntries,
    }

    return {
      ...initialSettings,
      ...parsed,
      prayerCalendar,
      prayerLeaderName: String(parsed.prayerLeaderName || ''),
      prayerRecordingLink: String(parsed.prayerRecordingLink || ''),
      services: Array.isArray(parsed.services)
        ? parsed.services.map((service, index) => ({
            ...initialSettings.services[index % initialSettings.services.length],
            ...service,
            id: String(service.id || `service-${index + 1}`),
            label: String(service.label || ''),
            time: String(service.time || ''),
            detail: String(service.detail || ''),
            visible: service.visible !== false,
          }))
        : initialSettings.services,
      sectionImages,
    }
  } catch {
    return initialSettings
  }
}

// Shared online storage so every phone/computer sees the same settings.
const REMOTE_URL = 'https://uyvzaowcbpvyhyvzrccj.supabase.co/rest/v1/site_settings'
const REMOTE_KEY = 'sb_publishable_DVuX2f0iSzSIwgXuAUO56A_DdcUN05B'
const remoteHeaders = { apikey: REMOTE_KEY, 'Content-Type': 'application/json' }

function cacheLocally(settings: SiteSettings) {
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // ignore full storage; remote copy is the source of truth
  }
  window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: settings }))
}

export async function loadRemoteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${REMOTE_URL}?id=eq.1&select=data`, {
      headers: remoteHeaders,
      cache: 'no-store',
    })
    if (!res.ok) return readSiteSettings()
    const rows = (await res.json()) as { data: Partial<SiteSettings> }[]
    const data = rows[0]?.data
    if (data && Object.keys(data).length > 0) {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(data))
      const settings = readSiteSettings()
      window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: settings }))
      return settings
    }
  } catch {
    // offline: fall back to cached copy
  }
  return readSiteSettings()
}

export async function saveSiteSettings(settings: SiteSettings) {
  const res = await fetch(`${REMOTE_URL}?id=eq.1`, {
    method: 'PATCH',
    headers: { ...remoteHeaders, Prefer: 'return=minimal' },
    body: JSON.stringify({ data: settings, updated_at: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error(`Save failed [${res.status}]: ${await res.text()}`)
  cacheLocally(settings)
}

// Next nightly prayer: every day at 9:00 PM Philippine time (UTC+8, no DST).
export const PRAYER_HOUR_PH = 21
export function nextPrayerTime(now = Date.now()) {
  const PH_OFFSET = 8 * 3600_000
  const ph = new Date(now + PH_OFFSET)
  let target =
    Date.UTC(ph.getUTCFullYear(), ph.getUTCMonth(), ph.getUTCDate(), PRAYER_HOUR_PH) - PH_OFFSET
  // Keep showing "prayer time" for 1 hour after it starts
  if (now >= target + 3600_000) target += 86400_000
  return target
}

export function formatServiceTime(value: string) {
  if (!/^\d{2}:\d{2}$/.test(value)) return value
  const [hour, minute] = value.split(':').map(Number)
  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function safeImageUrl(value: string) {
  if (!value) return true
  if (/^data:image\/(?:png|jpe?g|gif|webp);base64,/i.test(value)) return true
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}
