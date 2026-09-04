import { Client } from '@gradio/client'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const SPACE = 'yisol/IDM-VTON'

export async function POST(request: Request) {
  const token = process.env.HUGGINGFACE_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'HUGGINGFACE_TOKEN is not configured.' }, { status: 500 })
  }

  const formData = await request.formData()
  const personImage = formData.get('personImage')
  const garmentImage = formData.get('garmentImage')

  if (!(personImage instanceof File) || !(garmentImage instanceof File)) {
    return NextResponse.json({ error: 'personImage and garmentImage are required image files.' }, { status: 400 })
  }

  try {
    const client = await Client.connect(SPACE, { hf_token: token as `hf_${string}` })
    const result = await client.predict('/tryon', {
      dict: {
        background: personImage,
        layers: [garmentImage],
        composite: null,
      },
      garm_img: garmentImage,
      garment_des: 'A garment for a fashion outfit',
      is_checked: true,
      is_checked_crop: false,
      denoise_steps: 30,
      seed: 42,
    })

    const data = result.data as Array<{ url?: string; path?: string } | string>
    const first = data?.[0]
    const imageUrl = typeof first === 'string' ? first : first?.url ?? first?.path

    if (!imageUrl) {
      return NextResponse.json({ error: 'The try-on Space returned no generated image.' }, { status: 502 })
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Hugging Face error'
    const isUnavailable = /queue|rate|busy|space|timeout|connect|503|429/i.test(message)
    return NextResponse.json(
      { error: isUnavailable ? 'The virtual try-on Space is busy or unavailable. Please try again shortly.' : `Virtual try-on failed: ${message}` },
      { status: isUnavailable ? 503 : 502 },
    )
  }
}

export function GET() {
  return NextResponse.json({ error: 'Use POST with personImage and garmentImage.' }, { status: 405 })
}
