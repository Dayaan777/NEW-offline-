'use client'

import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Slide =
  | { type: 'image'; src: string; alt: string }
  | { type: 'split-video'; leftSrc: string; rightSrc: string }

const SLIDES: Slide[] = [
  {
    type: 'image',
    src: '/images/summer-26.jpg',
    alt: "A man in sunglasses wearing a light ribbed polo by the sea with large 'SUMMER ’26' campaign text",
  },
  { type: 'split-video', leftSrc: '/videos/desktop-hero-clip-1.mp4', rightSrc: '/videos/desktop-hero-clip-2.mp4' },
  { type: 'split-video', leftSrc: '/videos/desktop-hero-clip-3.mp4', rightSrc: '/videos/desktop-hero-clip-1.mp4' },
]

const SLIDE_DURATION_MS = 4000

export function DesktopHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const videoRefs = useRef<HTMLVideoElement[]>([])

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_DURATION_MS)

    return () => clearInterval(timer)
  }, [isPaused])

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return
      if (isPaused) video.pause()
      else void video.play().catch(() => {})
    })
  }, [isPaused])

  return (
    <div className="absolute inset-0" role="group" aria-label="Campaign hero slideshow">
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === activeIndex ? 1 : 0 }}
          aria-hidden={index !== activeIndex}
        >
          {slide.type === 'image' ? (
            <Image
              src={slide.src || '/placeholder.svg'}
              alt={slide.alt}
              fill
              priority
              className="object-cover object-[left_50%]"
              sizes="100vw"
            />
          ) : (
            <div className="flex h-full w-full">
              <div className="relative h-full min-w-0 flex-1 overflow-hidden">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[index * 2] = el
                  }}
                  className="h-full w-full scale-[1.02] object-cover object-center"
                  src={slide.leftSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
              <div className="relative h-full min-w-0 flex-1 overflow-hidden">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[index * 2 + 1] = el
                  }}
                  className="h-full w-full scale-[1.02] object-cover object-center"
                  src={slide.rightSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="absolute bottom-5 right-6 z-10 flex items-center gap-3">
        <div
          className="flex gap-1"
          role="progressbar"
          aria-valuenow={activeIndex + 1}
          aria-valuemin={1}
          aria-valuemax={SLIDES.length}
          aria-label={`Slide ${activeIndex + 1} of ${SLIDES.length}`}
        >
          {SLIDES.map((_, index) => (
            <div key={index} className="h-[1.5px] w-8 overflow-hidden rounded-full bg-white/25">
              <div
                className="h-full rounded-full bg-white/70"
                style={
                  index < activeIndex
                    ? { width: '100%' }
                    : index === activeIndex
                      ? isPaused
                        ? { width: 'var(--hero-progress-paused, 0%)' }
                        : { animation: `hero-progress-fill ${SLIDE_DURATION_MS}ms linear forwards` }
                      : { width: '0%' }
                }
                key={`${index}-${activeIndex === index ? 'active' : 'idle'}-${isPaused ? 'paused' : 'running'}`}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((current) => !current)}
          aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white/80 transition-colors hover:bg-black/35 hover:text-white"
        >
          {isPaused ? <Play className="h-3 w-3 fill-current" /> : <Pause className="h-3 w-3 fill-current" />}
        </button>
      </div>

      <style jsx global>{`
        @keyframes hero-progress-fill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
