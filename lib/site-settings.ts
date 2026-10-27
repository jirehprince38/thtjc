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

export type PrayerCalendarMonth = {
  id: string
  label: string
  theme: string
  introduction: string
  verseText: string
  verseReference: string
  entries: EditablePrayerCalendarEntry[]
}

export type PrayerCalendarContent = {
  title: string
  theme: string
  verseText: string
  verseReference: string
  entries: EditablePrayerCalendarEntry[]
  months: PrayerCalendarMonth[]
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
  gmailContact: string
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
  gmailContact: '',
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
    months: [],
  },
  sectionImages: {
    hero: ['', ''],
    welcome: ['', ''],
    services: ['', ''],
    contact: ['', ''],
  },
}



const novemberPrayerCalendarEntries: EditablePrayerCalendarEntry[] = [
  { id: "november-2026-02", date: "November 2", day: "Monday", preacher: "Ptra Shinar", openingPrayer: "Brooks", topic: "Less of Self, More of Jesus", scripture: "Galatians 2:20", character: "", reflection: "", prayerFocus: "• Isuko ang sariling kagustuhan at unahin ang kalooban ng Diyos.\n• Hayaang si Jesus ang mamahala sa ating buhay.\n• Iwasan ang pagiging makasarili at matutong magpakumbaba." },
  { id: "november-2026-03", date: "November 3", day: "Tuesday", preacher: "Amelia Catacutan", openingPrayer: "Joy Balingan", topic: "Less Distractions, More of God’s Presence", scripture: "Luke 10:41–42", character: "", reflection: "", prayerFocus: "• Alisin ang mga distractions na umaagaw ng oras natin sa Diyos.\n• Magkaroon ng disiplina sa pananalangin at pagbabasa ng Salita.\n• Matutong unahin ang presensya ng Diyos kaysa sa mga bagay ng mundo." },
  { id: "november-2026-04", date: "November 4", day: "Wednesday", preacher: "Marie Emborong", openingPrayer: "Arnel Templado", topic: "Less Worry, More Faith", scripture: "Proverbs 3:5–6", character: "", reflection: "", prayerFocus: "• Isuko sa Diyos ang mga alalahanin at takot.\n• Matutong magtiwala kahit hindi natin nauunawaan ang lahat.\n• Palakasin ang pananampalataya sa gitna ng mga pagsubok." },
  { id: "november-2026-05", date: "November 5", day: "Thursday", preacher: "Maribel Espino", openingPrayer: "Ariel Espino", topic: "Less Pride, More Humility", scripture: "James 4:6", character: "", reflection: "", prayerFocus: "• Alisin ang pride, inggit, at pagnanais na laging mapansin.\n• Magkaroon ng pusong mapagpakumbaba at madaling maturuan.\n• Matutong magbigay ng karangalan sa Diyos at sa ibang tao." },
  { id: "november-2026-06", date: "November 6", day: "Friday", preacher: "Leoinida", openingPrayer: "Lyn Igana", topic: "Less Anger, More Love", scripture: "1 Corinthians 13:4–5", character: "", reflection: "", prayerFocus: "• Ipagdasal ang kagalingan mula sa galit, sama ng loob, at unforgiveness.\n• Matutong magmahal, magpatawad, at umunawa sa kapwa.\n• Ipakita ang pag-ibig ni Cristo sa pamilya at church family." },
  { id: "november-2026-07", date: "November 7", day: "Saturday", preacher: "Precious", openingPrayer: "Moises Mallari", topic: "Less Complaining, More Thanksgiving", scripture: "1 Thessalonians 5:18", character: "", reflection: "", prayerFocus: "• Iwasan ang pagrereklamo at negatibong pananalita.\n• Matutong magpasalamat sa Diyos sa lahat ng pagkakataon.\n• Magkaroon ng pusong kuntento at nagtitiwala sa Kanyang kabutihan." },
  { id: "november-2026-08", date: "November 8", day: "Sunday", preacher: "Lily Garcia", openingPrayer: "Bro Jerry", topic: "Less Sin, More Holiness", scripture: "1 Peter 1:15–16", character: "", reflection: "", prayerFocus: "• Magsisi at talikuran ang mga kasalanang humahadlang sa ating spiritual growth.\n• Hilingin sa Diyos ang malinis na puso at matuwid na espiritu.\n• Mamuhay nang banal at kalugod-lugod sa Panginoon." },
  { id: "november-2026-09", date: "November 9", day: "Monday", preacher: "Samuel Ocampo", openingPrayer: "Wendell", topic: "Less Self-Interest, More Service", scripture: "Philippians 2:3–4", character: "", reflection: "", prayerFocus: "• Alisin ang pagiging makasarili at ang pagnanais na laging mauna.\n• Magkaroon ng pusong handang maglingkod nang may kagalakan.\n• Ipagdasal ang unity, faithfulness, at commitment ng bawat THTJC member sa gawain ng Panginoon." },
  { id: "november-2026-10", date: "November 10", day: "Tuesday", preacher: "Retch Baid", openingPrayer: "Fernando", topic: "Less of the World, More of God’s Kingdom", scripture: "Matthew 6:33", character: "", reflection: "", prayerFocus: "• Unahin ang Diyos sa ating mga desisyon, plano, at pang-araw-araw na buhay.\n• Ipagdasal ang mas malalim na commitment sa prayer, worship, at ministry.\n• Hilingin ang spiritual revival sa bawat pamilya, cell group, leaders, at buong THTJC family." },
]

initialSettings.prayerCalendar.months = [
  { id: "2026-10", label: "October 2026", theme: initialSettings.prayerCalendar.theme, introduction: "", verseText: initialSettings.prayerCalendar.verseText, verseReference: initialSettings.prayerCalendar.verseReference, entries: initialSettings.prayerCalendar.entries },
  { id: "2026-11", label: "November 2026", theme: "DO LESS, DO MORE", introduction: "Ang tunay na revival ay nagsisimula kapag binabawasan natin ang mga bagay na humahadlang sa ating relasyon sa Diyos at mas binibigyan natin ng puwang ang Kanyang presensya, Salita, at kalooban. Less of self, more of God!\n\nOur prayer is not just to do more for God, but to allow God to do more in us and through us.", verseText: "He must become greater; I must become less.", verseReference: "John 3:30", entries: novemberPrayerCalendarEntries },
]

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
    const normalizeEntry = (entry: Partial<EditablePrayerCalendarEntry>, index: number) => {
      const fallback = initialSettings.prayerCalendar.entries[index] || {
        id: "calendar-day-" + (index + 1), date: "", day: "", preacher: "", openingPrayer: "",
        topic: "", scripture: "", character: "", reflection: "", prayerFocus: "",
      }
      return {
        ...fallback,
        ...entry,
        id: String(entry.id ?? fallback.id),
        date: String(entry.date ?? ""),
        day: String(entry.day ?? ""),
        preacher: String(entry.preacher ?? ""),
        openingPrayer: String(entry.openingPrayer ?? ""),
        topic: String(entry.topic ?? ""),
        scripture: String(entry.scripture ?? ""),
        character: String(entry.character ?? ""),
        reflection: String(entry.reflection ?? ""),
        prayerFocus: String(entry.prayerFocus ?? ""),
      }
    }
    const calendarEntries = Array.isArray(calendar?.entries)
      ? calendar.entries.map(normalizeEntry)
      : initialSettings.prayerCalendar.entries
    const entriesByMonth = new Map<string, EditablePrayerCalendarEntry[]>()
    for (const entry of calendarEntries) {
      const match = entry.date.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\b/i)
      const key = match?.[1].toLowerCase() || "other"
      entriesByMonth.set(key, [...(entriesByMonth.get(key) || []), entry])
    }
    const metadataMonth = entriesByMonth.has("october")
      ? "october"
      : entriesByMonth.keys().next().value || "october"
    const calendarMonths = Array.isArray(calendar?.months)
      ? calendar.months.map((month, index) => {
          const fallback = initialSettings.prayerCalendar.months[index] || {
            id: "calendar-month-" + (index + 1), label: "Calendar month " + (index + 1), theme: "",
            introduction: "", verseText: "", verseReference: "", entries: [],
          }
          const monthEntries = Array.isArray(month.entries) ? month.entries.map(normalizeEntry) : fallback.entries
          return {
            ...fallback,
            ...month,
            id: String(month.id ?? fallback.id),
            label: String(month.label ?? fallback.label),
            theme: String(month.theme ?? ""),
            introduction: String(month.introduction ?? ""),
            verseText: String(month.verseText ?? ""),
            verseReference: String(month.verseReference ?? ""),
            entries: monthEntries,
          }
        })
      : (() => {
          const legacyMonths = initialSettings.prayerCalendar.months.map((defaultMonth) => {
            const monthName = defaultMonth.label.split(" ")[0].toLowerCase()
            const metadataIsForThisMonth = monthName === metadataMonth
            const groupedEntries = entriesByMonth.get(monthName)
            const isNovember = monthName === "november"
            return {
              ...defaultMonth,
              theme: metadataIsForThisMonth ? String(calendar?.theme ?? defaultMonth.theme) : defaultMonth.theme,
              verseText: metadataIsForThisMonth ? String(calendar?.verseText ?? defaultMonth.verseText) : defaultMonth.verseText,
              verseReference: metadataIsForThisMonth ? String(calendar?.verseReference ?? defaultMonth.verseReference) : defaultMonth.verseReference,
              entries: groupedEntries || (isNovember ? defaultMonth.entries : Array.isArray(calendar?.entries) ? [] : defaultMonth.entries),
            }
          })
          const knownMonths = new Set(legacyMonths.map((month) => month.label.split(" ")[0].toLowerCase()))
          const otherMonths = [...entriesByMonth.entries()]
            .filter(([name]) => !knownMonths.has(name))
            .map(([name, entries]) => ({
              id: name === "other" ? "unsorted-2026" : name + "-2026",
              label: name === "other" ? "Other dates" : name[0].toUpperCase() + name.slice(1) + " 2026",
              theme: String(calendar?.theme ?? ""), introduction: "",
              verseText: String(calendar?.verseText ?? ""), verseReference: String(calendar?.verseReference ?? ""), entries,
            }))
          return [...legacyMonths, ...otherMonths]
        })()
    const prayerCalendar = {
      ...initialSettings.prayerCalendar,
      ...calendar,
      title: String(calendar?.title ?? initialSettings.prayerCalendar.title),
      theme: String(calendar?.theme ?? initialSettings.prayerCalendar.theme),
      verseText: String(calendar?.verseText ?? initialSettings.prayerCalendar.verseText),
      verseReference: String(calendar?.verseReference ?? initialSettings.prayerCalendar.verseReference),
      entries: calendarMonths.flatMap((month) => month.entries),
      months: calendarMonths,
    }

    return {
      ...initialSettings,
      ...parsed,
      prayerCalendar,
      prayerLeaderName: String(parsed.prayerLeaderName || ''),
      gmailContact: String(parsed.gmailContact || ''),
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
