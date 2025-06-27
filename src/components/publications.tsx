'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from './ui/badge'

export type Publication = {
  url: string | undefined
  title: string
  authors: string
  year: string
  link: string
  categories: string[]
}

const filters = [
  { key: 'all', label: 'All' },
  { key: 'cogn', label: 'Cognitive' },
  { key: 'clin', label: 'Clinical' },
  { key: 'comp', label: 'Computational' },
  { key: 'neuro', label: 'Neuroscience' },
]

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetch('/api/publications')
      .then(res => res.json())
      .then(data => setPublications(data))
  }, [])

  const filtered =
    filter === 'all' ? publications : publications.filter(p => p.categories.includes(filter))

  return (
    <section id="publications" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h2 className="text-4xl font-bold tracking-tight text-pink-600 mb-4">Publications</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              onClick={() => setFilter(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all h-full flex flex-col justify-between border border-pink-200">
              <CardContent className="p-6 flex flex-col gap-2">
                <p className="text-lg font-semibold text-pink-700">{pub.year}</p>
                <p className="text-sm text-gray-700 leading-snug" dangerouslySetInnerHTML={{
                  __html: pub.authors.replace(/(Chunharas C|Chokesuwatanasakul A)/g, '<strong>$1</strong>')
                }} />
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-base font-semibold text-pink-600 hover:underline leading-snug"
                >
                  {pub.title}
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
