// next.config.js
import withMDX from '@next/mdx'

const withMDXConfig = withMDX({
  extension: /\.mdx$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // คุณสามารถใส่ config อื่นๆ ที่ต้องการได้ที่นี่
}

export default withMDXConfig(nextConfig)

