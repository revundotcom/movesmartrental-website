/**
 * One-off OG image generator.
 *
 * Renders public/og-share.png from the same layout used by
 * src/app/opengraph-image.tsx, bypassing Vercel's edge cache entirely
 * (the dynamic /opengraph-image/ route is cached `immutable, max-age=1y`
 * — code changes don't refresh it).
 *
 * Output filename: og-share.png (NEW path — Vercel's CDN cache for the
 * older og-default.png path is stubbornly stuck on an outdated build
 * even after redeployments; switching to a fresh path guarantees no
 * cache hit on the first request).
 *
 * Run from project root:
 *   node scripts/generate-og.mjs
 *
 * Requires (npm install --no-save):
 *   satori
 *   @resvg/resvg-js
 * And the font files at scripts/{Inter,Inter-Italic}.woff and
 * scripts/{DMSerif,DMSerif-Italic}.ttf
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const fontInter = fs.readFileSync(path.join(__dirname, 'Inter.woff'))
const fontInterItalic = fs.readFileSync(path.join(__dirname, 'Inter-Italic.woff'))
const fontSerif = fs.readFileSync(path.join(__dirname, 'DMSerif.ttf'))
const fontSerifItalic = fs.readFileSync(path.join(__dirname, 'DMSerif-Italic.ttf'))

// h() helper since this is a .mjs script with no JSX compilation.
function h(type, props, ...children) {
  return { type, props: { ...props, children: children.length === 1 ? children[0] : children } }
}

const tree = h(
  'div',
  {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#001E57',
      backgroundImage:
        'radial-gradient(circle at 15% 85%, rgba(0,153,102,0.32) 0%, rgba(0,30,87,0) 55%), radial-gradient(circle at 85% 10%, rgba(212,168,83,0.25) 0%, rgba(0,30,87,0) 55%)',
      padding: '72px 88px',
      color: '#FBFAF6',
      fontFamily: 'Inter',
    },
  },
  // Gold hairline accent (single visual anchor, no logo)
  h('div', {
    style: { display: 'flex', width: 96, height: 2, background: '#D4A853' },
  }),
  // Headline line 1
  h(
    'div',
    {
      style: {
        display: 'flex',
        fontFamily: 'Serif',
        fontSize: 96,
        fontWeight: 400,
        lineHeight: 1.08,
        letterSpacing: -2.5,
        color: '#FBFAF6',
        marginTop: 40,
      },
    },
    'Full-Service',
  ),
  // Headline line 2 (italic gold)
  h(
    'div',
    {
      style: {
        display: 'flex',
        fontFamily: 'Serif',
        fontSize: 96,
        fontWeight: 400,
        fontStyle: 'italic',
        lineHeight: 1.08,
        letterSpacing: -2.5,
        color: '#D4A853',
      },
    },
    'Leasing & Placement',
  ),
  // Subhead
  h(
    'div',
    {
      style: {
        display: 'flex',
        fontSize: 24,
        fontWeight: 400,
        color: 'rgba(251,250,246,0.78)',
        marginTop: 36,
        letterSpacing: -0.2,
        lineHeight: 1.4,
        maxWidth: 880,
      },
    },
    'Full-cycle leasing for landlords and rental operators across Canada and the US.',
  ),
  // Spacer
  h('div', { style: { display: 'flex', flex: 1 } }),
  // Footer URL (right-aligned, no tagline)
  h(
    'div',
    {
      style: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' },
    },
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 14 } },
      h('div', {
        style: { display: 'flex', width: 8, height: 8, borderRadius: 4, background: '#009966' },
      }),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: '#FBFAF6',
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 0.5,
          },
        },
        'movesmartrentals.com',
      ),
    ),
  ),
)

console.log('Rendering SVG with satori...')
const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Inter', data: fontInter, weight: 400, style: 'normal' },
    { name: 'Inter', data: fontInter, weight: 500, style: 'normal' },
    { name: 'Inter', data: fontInter, weight: 600, style: 'normal' },
    { name: 'Inter', data: fontInter, weight: 800, style: 'normal' },
    { name: 'Inter', data: fontInterItalic, weight: 400, style: 'italic' },
    { name: 'Serif', data: fontSerif, weight: 400, style: 'normal' },
    { name: 'Serif', data: fontSerif, weight: 800, style: 'normal' },
    { name: 'Serif', data: fontSerifItalic, weight: 400, style: 'italic' },
  ],
})

console.log('Converting SVG → PNG with resvg...')
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
})
const pngData = resvg.render().asPng()

const outPath = path.join(ROOT, 'public', 'og-share.png')
fs.writeFileSync(outPath, pngData)
console.log(`Wrote ${pngData.length} bytes → ${outPath}`)
