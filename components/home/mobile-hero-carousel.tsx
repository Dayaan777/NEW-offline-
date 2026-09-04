'use client'

import { useEffect, useState } from 'react'

type Slide = { type: 'image'; src: string; alt: string } | { type: 'video'; src: string }

const SLIDES: Slide[] = [
  {
    type: 'image',
    src: '/images/mobile-hero-fitted-elegance.jpg',
    alt: "A man and woman in navy tailored suits facing each other, with the text 'A New Era of Fitted Elegance'",
  },
  { type: 'video', src: '/videos/mobile-hero-clip-1.mp4' },
  { type: 'video', src: '/videos/mobile-hero-clip-2.mp4' },
]

const SLIDE_DURATION_MS = 3000

export function MobileHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_DURATION_MS)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0" role="group" aria-label="Campaign hero slideshow">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-500 ease-in-out"
          style={{ opacity: index === activeIndex ? 1 : 0 }}
          aria-hidden={index !== activeIndex}
        >
          {slide.type === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.src || '/placeholder.svg'}
              alt={slide.alt}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <video
              className="h-full w-full object-cover object-center"
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          )}
        </div>
      ))}

      <div
        className="absolute inset-x-4 bottom-4 z-10 flex gap-1.5"
        role="progressbar"
        aria-valuenow={activeIndex + 1}
        aria-valuemin={1}
        aria-valuemax={SLIDES.length}
        aria-label={`Slide ${activeIndex + 1} of ${SLIDES.length}`}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35"
          >
            <div
              className="h-full rounded-full bg-white"
              style={
                index < activeIndex
                  ? { width: '100%' }
                  : index === activeIndex
                    ? { animation: `hero-progress-fill ${SLIDE_DURATION_MS}ms linear forwards` }
                    : { width: '0%' }
              }
              key={`${slide.src}-${activeIndex === index ? 'active' : 'idle'}`}
            />
          </div>
        ))}
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
