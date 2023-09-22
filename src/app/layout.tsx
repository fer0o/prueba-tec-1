import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: '📚 midu-libros',
  description: 'Prueba libros midu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <main className=' m-auto grid min-h-screen max-w-screen-lg px-4 grid-rows-[60px, 1fr, 60px] gap-4'> 
          <nav className='flex items-center text-2xl'>📚 midu-libros</nav>
          <section>
            {children}
          </section>
          <footer className='flex items-center justify-center'> prueba tecnica </footer>
        </main>
      </body>
    </html>
  )
}
