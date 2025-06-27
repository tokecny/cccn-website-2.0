// app/api/publications/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const publications = [
    {
      title: "Optimal tuning of feature-based attention warps the perception of visual features.",
      authors: "Chapman A, Chunharas C, Störmer VS",
      year: "2022",
      link: "https://scholar.google.com/...",
      categories: ["cogn"]
    },
    {
      title: "Clusters of Cognitive Performance among Aging People Living with HIV: the Application of Unsupervised Machine Learning",
      authors: "Hiransuthikul A, Rattananupong T, Phusuwan W, Chunharas C, Apornpong T, Lohsoonthorn V, Avihingsanon A.",
      year: "2022",
      link: "https://scholar.google.com/...",
      categories: ["cogn", "comp", "neuro"]
    }
    // เพิ่มอีกเรื่อยๆ
  ]

  return NextResponse.json(publications)
}
