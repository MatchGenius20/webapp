import Image from 'next/image'
import './styles.css'
import Link from 'next/link'

export default function Custom404Page() {
  return (
    <div className="container">
      <h1>404 Not Found</h1>
      <p>Oops! The page you are looking for might be in another castle.</p>
      <Link href="/">
        <button>Go to Home</button>
      </Link>
    </div>
  )
}
