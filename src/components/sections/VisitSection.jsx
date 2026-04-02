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
    <section id="visit" className="section">
      <div className="container visitGrid">
        <div className="visitCopy">
          <h2>Visit Tatia's Pizza</h2>
          <p className="muted">
            Cozy seats, warm lighting, and a wood‑fired oven you can watch and
            smell delicious food.
          </p>

          <div className="visitCard">
            <div>
              <div className="visitLabel">Address</div>
              <div className="visitValue">Rustaveli avenue, Tbilisi</div>
            </div>
            <div>
              <div className="visitLabel">Phone</div>
              <div className="visitValue">(+995) 599 012-346</div>
            </div>
            <div className="visitActions">
              <a className="btn btnPrimary" href="#menu">
                Order for pickup
              </a>
              <a className="btn btnGhost" href="#reviews">
                Read reviews
              </a>
            </div>
          </div>
        </div>

        <GalleryGrid gallery={gallery} onPhotoSelect={setActive} />
      </div>

      {active ? (
        <div
          className="lightboxOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onClick={(e) => {
            if (e.currentTarget === e.target) setActive(null)
          }}
        >
          <div className="lightboxPanel">
            <button
              className="lightboxClose"
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <img className="lightboxImg" src={active.src} alt={active.alt} />
          </div>
        </div>
      ) : null}
    </section>
  )
}

function GalleryGrid({ gallery, onPhotoSelect }) {
  return (
    <div className="gallery" aria-label="Gallery">
      {gallery.map((g) => (
        <button
          key={g.src}
          type="button"
          className="galleryBtn"
          onClick={() => onPhotoSelect(g)}
          aria-label={`Open photo: ${g.alt}`}
        >
          <img className="galleryImg" src={g.src} alt={g.alt} loading="lazy" />
        </button>
      ))}
    </div>
  )
}
