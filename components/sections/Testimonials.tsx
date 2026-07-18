"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  id: string
  clientName: string
  company: string
  review: string
  rating: number
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0)

  if (!testimonials.length) return null

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <section id="testimonials" className="relative py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-5",
                    i < t.rating ? "fill-primary text-primary" : "text-muted-foreground"
                  )}
                />
              ))}
            </div>

            <blockquote className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              &ldquo;{t.review}&rdquo;
            </blockquote>

            <div>
              <p className="font-semibold">{t.clientName}</p>
              {t.company && (
                <p className="text-sm text-muted-foreground">{t.company}</p>
              )}
            </div>
          </div>

          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="glass p-3 rounded-full hover:bg-accent transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "size-2.5 rounded-full transition-all",
                      i === current ? "bg-primary scale-125" : "bg-border"
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="glass p-3 rounded-full hover:bg-accent transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
