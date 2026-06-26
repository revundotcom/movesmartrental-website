/**
 * One-off OG image generator.
 *
 * Renders public/og-default.png from the same JSX-style layout used by
 * src/app/opengraph-image.tsx, but bypasses Vercel's edge cache entirely
 * (the dynamic /opengraph-image/ route is cached `immutable, max-age=1y`
 * — code changes don't refresh it without a new URL).
 *
 * Run from project root:
 *   node scripts/generate-og.mjs
 *
 * Requires (npm install --no-save):
 *   satori
 *   @resvg/resvg-js
 * And the TTF files at /tmp/{Inter,Inter-Italic,DMSerif,DMSerif-Italic}.ttf
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

// Satori takes the JSX as a plain object tree (since there's no JSX
// compilation in a .mjs script). Use h() helpers to build it.
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
        'radial-gradient(circle at 15% 85%, rgba(0,153,102,0.28) 0%, rgba(0,30,87,0) 55%), radial-gradient(circle at 85% 10%, rgba(212,168,83,0.22) 0%, rgba(0,30,87,0) 55%)',
      padding: '56px 88px',
      color: '#FBFAF6',
      fontFamily: 'Inter',
    },
  },
  // Brand mark row
  h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: 14 } },
    h(
      'div',
      {
        style: {
          display: 'flex',
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FBFAF6',
          color: '#001E57',
          fontSize: 26,
          fontWeight: 800,
          fontFamily: 'Serif',
          borderRadius: 5,
        },
      },
      'M',
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: '#FBFAF6',
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: 'uppercase',
        },
      },
      'MoveSmart Rentals',
    ),
  ),
  // Gold hairline
  h('div', {
    style: { display: 'flex', width: 88, height: 2, background: '#D4A853', marginTop: 40 },
  }),
  // Headline line 1
  h(
    'div',
    {
      style: {
        display: 'flex',
        fontFamily: 'Serif',
        fontSize: 80,
        fontWeight: 400,
        lineHeight: 1.08,
        letterSpacing: -2,
        color: '#FBFAF6',
        marginTop: 28,
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
        fontSize: 80,
        fontWeight: 400,
        fontStyle: 'italic',
        lineHeight: 1.08,
        letterSpacing: -2,
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
        marginTop: 24,
        letterSpacing: -0.2,
        lineHeight: 1.4,
        maxWidth: 880,
      },
    },
    'Full-cycle leasing for landlords and rental operators across Canada and the US.',
  ),
  // Spacer
  h('div', { style: { display: 'flex', flex: 1 } }),
  // Footer row
  h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 12 } },
      h('div', {
        style: { display: 'flex', width: 8, height: 8, borderRadius: 4, background: '#009966' },
      }),
      h(
        'div',
        {
          style: {
            display: 'flex',
            color: 'rgba(251,250,246,0.82)',
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: 'uppercase',
          },
        },
        'Strategic - Professional - Transparent',
      ),
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          color: 'rgba(251,250,246,0.6)',
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: 1,
        },
      },
      'movesmartrentals.com',
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

const outPath = path.join(ROOT, 'public', 'og-default.png')
fs.writeFileSync(outPath, pngData)
console.log(`Wrote ${pngData.length} bytes → ${outPath}`)
