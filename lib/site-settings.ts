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
  prayerLink: string
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
  prayerLink: 'https://meet.google.com/',
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

export function saveSiteSettings(settings: SiteSettings) {
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: settings }))
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
