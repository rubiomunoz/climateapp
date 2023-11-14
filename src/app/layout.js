import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WeatherApp Rubiomunoz',
  description: 'Weather webapp based on your location',
}

export default function RootLayout({ children }) {
  const actualYear = new Date().getFullYear();
  return (
    <html lang="es">

      <head>
        <link rel="icon" type="image/png" href="images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"></link>
      </head>

      <body className={inter.className}>
        <main className="block min-h-screen p-4">
          <div className="max-w-xl m-auto backdrop-blur-lg p-4 relative mt-5 rounded-2xl border">
            {children}
          </div>
          <p className='text-center text-gray-400 text-xs mt-5'>© WeatherApp Rubiomunoz - {actualYear}</p>
        </main>
      </body>
    </html>
  )
}
