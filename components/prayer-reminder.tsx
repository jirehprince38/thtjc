'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PrayerReminder() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  useEffect(() => {
    const show = window.setTimeout(() => setVisible(true), 3000)
    const hide = window.setTimeout(() => setVisible(false), 11000)
    const remove = window.setTimeout(() => setDismissed(true), 11300)
    return () => { window.clearTimeout(show); window.clearTimeout(hide); window.clearTimeout(remove) }
  }, [])
  if (dismissed) return null
  return (
    <div className="church-site prayer-reminder" data-visible={visible} aria-hidden={!visible}>
      <div role="status" aria-live="polite">
        <MessageCircle className="size-5" aria-hidden="true" />
        <p><strong>Have a prayer request?</strong><span>Scroll down — we'd love to pray for you.</span></p>
      </div>
      <Button variant="ghost" size="icon" className="prayer-reminder-close" aria-label="Dismiss prayer reminder" title="Dismiss reminder" tabIndex={visible ? 0 : -1} onClick={() => setDismissed(true)}><X className="size-4" /></Button>
      <a href="#contact" tabIndex={visible ? 0 : -1} onClick={() => setDismissed(true)}>Prayer request <ArrowDown className="size-4" aria-hidden="true" /></a>
    </div>
  )
}
