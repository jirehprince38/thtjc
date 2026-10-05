import AdminPanel from '@/components/admin-panel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Site admin | THJTC',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminPanel />
}
