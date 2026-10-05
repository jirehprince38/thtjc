import ChurchSite from '@/components/church-site'

export default function Page() {
  return <ChurchSite />
}

// The homepage is intentionally kept as a route shell so the interactive site remains easy to maintain.
// The public site and its admin preview share the same component state for a fast editing workflow.
