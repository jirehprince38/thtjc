'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Check,
  Download,
  ImagePlus,
  Printer,
  Plus,
  Save,
  Trash2,
} from 'lucide-react'
import {
  initialSettings,
  loadRemoteSettings,
  readSiteSettings,
  safeImageUrl,
  saveSiteSettings,
  type ContentSection,
  type EditableService,
  type ImagePair,
  type SiteSettings,
} from '@/lib/site-settings'

const inputClass =
  'mt-2 h-11 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 text-sm outline-none focus:border-[#1c5b4d] focus:ring-2 focus:ring-[#1c5b4d]/15'

const imageSections: { id: ContentSection; label: string }[] = [
  { id: 'hero', label: 'Home / hero text' },
  { id: 'welcome', label: 'Welcome text' },
  { id: 'services', label: 'Services text' },
  { id: 'contact', label: 'Contact text' },
]

const MAX_IMAGE_BYTES = 300 * 1024

function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Could not read that image.'))
    reader.readAsDataURL(file)
  })
}

function ImageEditor({
  title,
  value,
  onUrlChange,
  onFile,
}: {
  title: string
  value: string
  onUrlChange: (value: string) => void
  onFile: (file: File) => void
}) {
  const invalidUrl = Boolean(value) && !safeImageUrl(value)
  return (
    <div className="rounded-xl border border-[#d9ddd7] bg-white p-4">
      <label className="block text-sm font-semibold">{title}</label>
      <input
        type="url"
        value={value.startsWith('data:') ? '' : value}
        onChange={(event) => onUrlChange(event.target.value)}
        placeholder="https://example.com/image.jpg"
        aria-invalid={invalidUrl}
        className={inputClass}
      />
      {invalidUrl && (
        <p className="mt-2 text-xs text-red-700">Use an http or https image URL, or upload an image file.</p>
      )}
      <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#b9c6bb] px-4 py-2 text-sm font-semibold text-[#1c5b4d] hover:bg-[#eef2ec]">
        <ImagePlus className="size-4" />
        Upload image
        <input
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) onFile(file)
            event.currentTarget.value = ''
          }}
        />
      </label>
      {value && (
        <div className="mt-3 flex items-center gap-3">
          <img src={value} alt="" className="size-14 rounded-lg object-cover" />
          <button
            type="button"
            onClick={() => onUrlChange('')}
            className="text-sm font-medium text-red-700 underline"
          >
            Remove image
          </button>
        </div>
      )}
    </div>
  )
}

export default function AdminPanel() {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)
  const [ready, setReady] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    setSettings(readSiteSettings())
    loadRemoteSettings().then((remote) => {
      setSettings(remote)
      setReady(true)
    })
  }, [])

  function update(patch: Partial<SiteSettings>) {
    setSettings((current) => ({ ...current, ...patch }))
    setNotice('')
  }

  function updateImages(section: ContentSection, index: number, value: string) {
    setSettings((current) => {
      const pair = [...current.sectionImages[section]] as ImagePair
      pair[index] = value
      return {
        ...current,
        sectionImages: { ...current.sectionImages, [section]: pair },
      }
    })
    setNotice('')
  }

  async function setUploadedImage(onValue: (value: string) => void, file: File) {
    if (!['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(file.type)) {
      setNotice('Choose a PNG, JPEG, GIF, or WebP image.')
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      const sizeInKb = Math.round(file.size / 1024)
      setNotice(`This image is ${sizeInKb} KB. Please use 300 KB or smaller.`)
      return
    }
    try {
      onValue(await readImageFile(file))
      setNotice('Image ready. Press Save to publish it for everyone.')
    } catch {
      setNotice('The image could not be read. Try another file.')
    }
  }

  function updateService(index: number, patch: Partial<EditableService>) {
    update({
      services: settings.services.map((service, serviceIndex) =>
        serviceIndex === index ? { ...service, ...patch } : service,
      ),
    })
  }

  async function save() {
    const images = [
      settings.logoUrl,
      ...Object.values(settings.sectionImages).flat(),
    ]
    if (images.some((image) => !safeImageUrl(image))) {
      setNotice('Image links must start with http:// or https://.')
      return
    }
    try {
      setNotice('Saving...')
      await saveSiteSettings(settings)
      setNotice('Saved! Everyone will now see these changes.')
    } catch {
      setNotice('Could not save. Remove an image or use a smaller file, then try again.')
    }
  }

  function downloadSettings() {
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'thtjc-site-settings.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  function addService() {
    update({
      services: [
        ...settings.services,
        {
          id: `service-${Date.now()}`,
          label: 'New service',
          time: '18:00',
          detail: 'Add a schedule',
          visible: true,
        },
      ],
    })
  }

  function removeService(index: number) {
    update({ services: settings.services.filter((_, itemIndex) => itemIndex !== index) })
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#202320]">
      <div className="mx-auto max-w-4xl px-5 py-8 sm:py-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d9ddd7] pb-6">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1c5b4d]">
              <ArrowLeft className="size-4" /> Public website
            </a>
            <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1c5b4d]">
              <ImagePlus className="size-4" /> Site admin
            </p>
            <h1 className="mt-2 font-serif text-4xl tracking-tight">Edit your church page</h1>
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-[#b9c6bb] px-4 py-2.5 text-sm font-semibold text-[#1c5b4d]"
            >
              <Printer className="size-4" /> Download admin page
            </button>
            <button
              type="button"
              onClick={downloadSettings}
              className="inline-flex items-center gap-2 rounded-full border border-[#b9c6bb] px-4 py-2.5 text-sm font-semibold text-[#1c5b4d]"
            >
              <Download className="size-4" /> Export settings
            </button>
          </div>
        </header>

        <aside className="mt-6 rounded-xl border border-[#e1c98f] bg-[#fff8e8] p-4 text-sm leading-6 text-[#58491f]">
          No login is required. This unlinked admin page is not password-protected. Changes and uploaded images are saved only in this browser and will not update other visitors&apos; devices.
        </aside>

        <div className="mt-8 space-y-8">
          <section className="rounded-2xl border border-[#d9ddd7] bg-white p-5 sm:p-7">
            <h2 className="font-serif text-2xl">Logo</h2>
            <p className="mt-1 text-sm text-[#59615b]">Use an image URL or upload an image (300 KB max).</p>
            <div className="mt-5">
              <ImageEditor
                title="Church logo"
                value={settings.logoUrl}
                onUrlChange={(value) => update({ logoUrl: value })}
                onFile={(file) => void setUploadedImage((value) => update({ logoUrl: value }), file)}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-[#d9ddd7] bg-white p-5 sm:p-7">
            <h2 className="font-serif text-2xl">Two pictures for each text section</h2>
            <p className="mt-1 text-sm text-[#59615b]">Add a web image URL or upload a small image for each slot.</p>
            <div className="mt-5 space-y-6">
              {imageSections.map((section) => (
                <div key={section.id}>
                  <h3 className="mb-3 text-sm font-semibold">{section.label}</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {settings.sectionImages[section.id].map((value, index) => (
                      <ImageEditor
                        key={`${section.id}-${index}`}
                        title={`Picture ${index + 1}`}
                        value={value}
                        onUrlChange={(next) => updateImages(section.id, index, next)}
                        onFile={(file) =>
                          void setUploadedImage(
                            (next) => updateImages(section.id, index, next),
                            file,
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#d9ddd7] bg-white p-5 sm:p-7">
            <h2 className="font-serif text-2xl">Online prayer</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="flex items-center justify-between rounded-xl border border-[#d9ddd7] p-4">
                <span>
                  <span className="block text-sm font-semibold">Prayer link is live</span>
                  <span className="mt-1 block text-xs text-[#59615b]">Show the join button</span>
                </span>
                <input
                  type="checkbox"
                  checked={settings.prayerOpen}
                  onChange={(event) => update({ prayerOpen: event.target.checked })}
                  className="size-5 accent-[#1c5b4d]"
                />
              </label>
              <label className="flex items-center justify-between rounded-xl border border-[#d9ddd7] p-4">
                <span>
                  <span className="block text-sm font-semibold">Show countdown</span>
                  <span className="mt-1 block text-xs text-[#59615b]">Every night at 9:00 PM (Philippine time)</span>
                </span>
                <input
                  type="checkbox"
                  checked={Boolean(settings.prayerStartsAt)}
                  onChange={(event) =>
                    update({
                      prayerStartsAt: event.target.checked
                        ? 'daily'
                        : '',
                    })
                  }
                  className="size-5 accent-[#1c5b4d]"
                />
              </label>
              <label>
                <span className="text-sm font-semibold">Prayer button text</span>
                <input
                  value={settings.prayerTitle}
                  onChange={(event) => update({ prayerTitle: event.target.value })}
                  className={inputClass}
                />
              </label>
              <label>
                <span className="text-sm font-semibold">Prayer description</span>
                <textarea
                  value={settings.prayerDescription}
                  onChange={(event) => update({ prayerDescription: event.target.value })}
                  className="mt-2 min-h-24 w-full rounded-xl border border-[#cbd3cb] bg-white px-4 py-3 text-sm outline-none focus:border-[#1c5b4d] focus:ring-2 focus:ring-[#1c5b4d]/15"
                />
              </label>
              <label>
                <span className="text-sm font-semibold">Online prayer link</span>
                <input
                  type="url"
                  value={settings.prayerLink}
                  onChange={(event) => update({ prayerLink: event.target.value })}
                  className={inputClass}
                />
              </label>
              <label>
                <span className="text-sm font-semibold">Return time when offline</span>
                <input
                  value={settings.returnTime}
                  onChange={(event) => update({ returnTime: event.target.value })}
                  className={inputClass}
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-[#d9ddd7] bg-white p-5 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl">Service schedule</h2>
                <p className="mt-1 text-sm text-[#59615b]">Edit names, times, details, and visibility.</p>
              </div>
              <button
                type="button"
                onClick={addService}
                className="inline-flex items-center gap-2 rounded-full border border-[#b9c6bb] px-4 py-2 text-sm font-semibold text-[#1c5b4d]"
              >
                <Plus className="size-4" /> Add service
              </button>
            </div>
            <div className="mt-5 space-y-3">
              {settings.services.map((service, index) => (
                <div key={service.id} className="rounded-xl border border-[#d9ddd7] p-4">
                  <div className="grid gap-3 sm:grid-cols-[1fr_150px_1fr_auto] sm:items-end">
                    <label>
                      <span className="text-xs font-semibold text-[#59615b]">Service name</span>
                      <input
                        value={service.label}
                        onChange={(event) => updateService(index, { label: event.target.value })}
                        className={inputClass}
                      />
                    </label>
                    <label>
                      <span className="text-xs font-semibold text-[#59615b]">Time</span>
                      <input
                        type="time"
                        value={service.time}
                        onChange={(event) => updateService(index, { time: event.target.value })}
                        className={inputClass}
                      />
                    </label>
                    <label>
                      <span className="text-xs font-semibold text-[#59615b]">Day / details</span>
                      <input
                        value={service.detail}
                        onChange={(event) => updateService(index, { detail: event.target.value })}
                        className={inputClass}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      aria-label={`Remove ${service.label}`}
                      className="mb-1 rounded-full p-2 text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <label className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={service.visible}
                      onChange={(event) => updateService(index, { visible: event.target.checked })}
                      className="size-4 accent-[#1c5b4d]"
                    />
                    Show this service on the public page
                  </label>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#d9ddd7] bg-white p-5 sm:p-7">
            <h2 className="font-serif text-2xl">Other links</h2>
            <label className="mt-5 block">
              <span className="text-sm font-semibold">Facebook page URL</span>
              <input
                type="url"
                value={settings.facebookPage}
                onChange={(event) => update({ facebookPage: event.target.value })}
                placeholder="https://facebook.com/your-page"
                className={inputClass}
              />
            </label>
          </section>
        </div>

        <footer className="sticky bottom-0 mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#d9ddd7] bg-[#f7f5f0]/95 py-4 backdrop-blur print:hidden">
          <p aria-live="polite" className="flex items-center gap-2 text-sm text-[#59615b]">
            {notice.startsWith('Saved') && <Check className="size-4 text-[#1c5b4d]" />}
            {ready ? notice || 'Changes are not saved until you press Save.' : 'Loading saved settings…'}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={!ready}
            className="inline-flex items-center gap-2 rounded-full bg-[#1c5b4d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#153f36] disabled:opacity-50"
          >
            <Save className="size-4" /> Save changes
          </button>
        </footer>
      </div>

      {Object.values(settings.sectionImages).flat().some((value) => value && !safeImageUrl(value)) && (
        <span className="sr-only">Use http or https image URLs.</span>
      )}
    </main>
  )
}
