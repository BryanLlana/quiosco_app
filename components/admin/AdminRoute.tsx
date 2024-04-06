import Link from "next/link"

type Props = {
  link: {
    url: string,
    text: string,
    blank: boolean
  }
}

const AdminRoute = ({ link }: Props) => {
  const { url, text, blank } = link
  return (
    <Link
      className={`font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
      href={url}
    >{text}
    </Link>
  )
}

export default AdminRoute