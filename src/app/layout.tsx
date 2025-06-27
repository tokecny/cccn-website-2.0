import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Radiant',
    default: 'Radiant - Close every deal',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans">
        <header className="w-full px-4 sm:px-6 py-4 border-b shadow-sm sticky top-0 bg-white z-50">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <h1 className="text-2xl font-bold text-pink-500">CCCN Lab</h1>
            <nav className="space-x-2 sm:space-x-4 text-sm sm:text-base">
              <a href="#home" className="hover:underline text-cccn-accent">Home</a>
              <a href="#people" className="hover:underline text-cccn-accent">People</a>
              <a href="#publications" className="hover:underline text-cccn-accent">Publications</a>
              <a href="#activity" className="hover:underline text-cccn-accent">Activity</a>
              <a href="#contact" className="hover:underline text-cccn-accent">Contact</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {children}
        </main>
        <footer className="border-t text-sm text-gray-500 text-center py-6">
          <p>&copy; {new Date().getFullYear()} CCCN Lab. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}