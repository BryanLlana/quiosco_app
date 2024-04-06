"use client"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

type Props = {
  link: {
    url: string,
    text: string,
    blank: boolean
  }
}

const AdminRoute = ({ link }: Props) => {
  const { url, text, blank } = link
  const pathname = usePathname()
  const isActive = pathname.startsWith(url)
  return (
    <Link
      className={`${isActive ? 'bg-amber-400' : ''} font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
      href={url}
      target={blank ? '_blank' : ''}
    >{text}
    </Link>
  )
}

export default AdminRoute