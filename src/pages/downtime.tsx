import Image from 'next/image'
import './styles.css'
import Link from 'next/link'

export default function Downtime() {
  return (
    <div className="container">
      <div className="flex justify-center items-center">
        {/* Add Name of company */}
      </div>
      <h1 className="font-bold">We&apos;ll Be Back Soon!</h1>
      {/* add link from environment variables */}
      <Link href="">
        <button>Follow on X.com</button>
      </Link>
    </div>
  )
}
