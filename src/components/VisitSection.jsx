import { useEffect, useState } from 'preact/hooks'

export function VisitSection({ gallery }) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!active) return
    function onKeyDown(e) {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  return (
    <section id="visit" class="section">
      <div class="container visitGrid">
        <div class="visitCopy">
          <h2>Visit Tatia’s Pizza</h2>
          <p class="muted">
            Cozy seats, warm lighting, and a wood‑fired oven you can watch and
            smell delicious food.
          </p>

          <div class="visitCard">
            <div>
              <div class="visitLabel">Address</div>
              <div class="visitValue">Rustaveli avenue,Tbilisi</div>
            </div>
            <div>
              <div class="visitLabel">Phone</div>
              <div class="visitValue">(+995) 599 012-346</div>
            </div>
            <div class="visitActions">
              <a class="btn btnPrimary" href="#menu">
                Order for pickup
              </a>
              <a class="btn btnGhost" href="#reviews">
                Read reviews
              </a>
            </div>
          </div>
        </div>

        <div class="gallery" aria-label="Gallery">
          {gallery.map((g) => (
            <button
              key={g.src}
              type="button"
              class="galleryBtn"
              onClick={() => setActive(g)}
              aria-label={`Open photo: ${g.alt}`}
            >
              <img class="galleryImg" src={g.src} alt={g.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <div
          class="lightboxOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onClick={(e) => {
            if (e.currentTarget === e.target) setActive(null)
          }}
        >
          <div class="lightboxPanel">
            <button
              class="lightboxClose"
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <img class="lightboxImg" src={active.src} alt={active.alt} />
          </div>
        </div>
      ) : null}
    </section>
  )
}

