const URL_BASE = 'https://uyvzaowcbpvyhyvzrccj.supabase.co/rest/v1/prayer_messages'
const KEY = 'sb_publishable_DVuX2f0iSzSIwgXuAUO56A_DdcUN05B'
const headers = { apikey: KEY, 'Content-Type': 'application/json' }

export type PrayerMessage = { id: string; name: string; message: string; created_at: string }

export async function sendPrayerMessage(name: string, message: string) {
  const res = await fetch(URL_BASE, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=minimal' },
    body: JSON.stringify({ name: name.trim(), message: message.trim() }),
  })
  if (!res.ok) throw new Error(`Send failed [${res.status}]: ${await res.text()}`)
}

export async function listPrayerMessages(): Promise<PrayerMessage[]> {
  const res = await fetch(`${URL_BASE}?select=id,name,message,created_at&order=created_at.desc&limit=200`, {
    headers,
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Load failed [${res.status}]: ${await res.text()}`)
  return res.json()
}
