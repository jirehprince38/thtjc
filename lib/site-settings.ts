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

    return {
      ...initialSettings,
      ...parsed,
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

export const PRAYER_HOUR_PH = 21
export function nextPrayerTime(now = Date.now()) {
  const PH_OFFSET = 8 * 3600_000
  const ph = new Date(now + PH_OFFSET)
  let target =
    Date.UTC(ph.getUTCFullYear(), ph.getUTCMonth(), ph.getUTCDate(), PRAYER_HOUR_PH) - PH_OFFSET
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
