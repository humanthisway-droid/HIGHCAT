'use client'

import { FormEvent, useEffect, useState } from 'react'

const captions = [
  'no thoughts, only mischief',
  'the fur is temporary, the chaos is forever',
  'loading... unlike my motivation',
]

const ticker = 'plz be patient · i am but a small business · the cats are working on it ·'

export default function Page() {
  const [captionIndex, setCaptionIndex] = useState(0)
  const [typedCaption, setTypedCaption] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [paw, setPaw] = useState({ x: -100, y: -100, visible: false })

  useEffect(() => {
    let character = 0
    let deleting = false
    const phrase = captions[captionIndex]
    const interval = window.setInterval(() => {
      if (!deleting) {
        character += 1
        setTypedCaption(phrase.slice(0, character))
        if (character === phrase.length) {
          deleting = true
          window.clearInterval(interval)
          window.setTimeout(() => setCaptionIndex((current) => (current + 1) % captions.length), 1800)
        }
      }
    }, 65)
    return () => window.clearInterval(interval)
  }, [captionIndex])

  useEffect(() => {
    const movePaw = (event: MouseEvent) => setPaw({ x: event.clientX, y: event.clientY, visible: true })
    window.addEventListener('mousemove', movePaw)
    return () => window.removeEventListener('mousemove', movePaw)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="neon-blob" />
        <div className="noise" />
        <div className="grid-lines" />
      </div>

      <div className="relative z-10 overflow-hidden border-b border-border/60 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground" aria-label="Site ticker">
        <div className="ticker flex w-max gap-12 whitespace-nowrap">
          <span>{ticker}</span><span>{ticker}</span><span>{ticker}</span>
        </div>
      </div>

      <section className="relative z-10 flex flex-1 items-center justify-center px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-primary sm:mb-10">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_14px_var(--primary)]" />
            <span>internet cat headquarters</span>
          </div>

          <h1 className="glitch-title max-w-4xl text-balance font-sans text-[clamp(3.2rem,11vw,8.8rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]" data-text="SOMETHING&apos;S COOKING 🐱">
            SOMETHING&apos;S COOKING <span className="cat-accent">🐱</span>
          </h1>

          <div className="mt-8 flex h-9 items-center justify-center font-mono text-sm text-muted-foreground sm:mt-10 sm:text-base">
            <span className="mr-2 text-primary">&gt;_</span>
            <span>{typedCaption}</span><span className="type-cursor ml-1 inline-block h-5 w-[2px] bg-primary" aria-hidden="true" />
          </div>

          <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-2" aria-label="Get notified form">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input id="email" type="email" required value={email} onChange={(event) => { setEmail(event.target.value); setSubmitted(false) }} placeholder="your@email.com" className="h-14 flex-1 rounded-full border border-border bg-card/70 px-6 font-mono text-sm text-foreground outline-none backdrop-blur-md transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20" />
            <button type="submit" className="pounce-button h-14 rounded-full bg-primary px-7 font-sans text-sm font-bold uppercase tracking-[0.08em] text-primary-foreground transition hover:shadow-[0_0_28px_color-mix(in_srgb,var(--primary)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              {submitted ? "you're on the list ✓" : 'notify me when i pounce'}
            </button>
          </form>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">no spam. just premium cat nonsense.</p>
        </div>
      </section>

      <footer className="relative z-10 flex items-end justify-between gap-4 px-5 pb-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:px-8 sm:pb-7">
        <span>© 2026 / made with 99% tuna</span>
        <span className="hidden sm:inline">a tiny project by the sleepy cat collective</span>
      </footer>

      <div className="paw-trail pointer-events-none fixed z-50" style={{ left: paw.x, top: paw.y, opacity: paw.visible ? 1 : 0 }} aria-hidden="true">🐾</div>
    </main>
  )
}
