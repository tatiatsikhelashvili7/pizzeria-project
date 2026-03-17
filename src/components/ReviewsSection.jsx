import { useState } from 'preact/hooks'

const REVIEWS = [
  {
    name: 'Sam',
    title: 'Perfect char, clean finish',
    rating: 5,
    quote:
      'The crust has that perfect char—clean, balanced, and seriously good. The pesto burrata special is a must.',
  },
  {
    name: 'Lina',
    title: 'Hot on arrival',
    rating: 5,
    quote:
      'Delivery is quick, and it arrives hot. It’s become our weekly order—especially when we want something simple but high quality.',
  },
  {
    name: 'Omar',
    title: 'Minimal menu, maximum quality',
    rating: 5,
    quote:
      'Minimal menu, maximum quality. Exactly what we look for. Everything tastes intentional and the crust texture is excellent.',
  },
]

export function ReviewsSection() {
  const [openName, setOpenName] = useState(null)

  return (
    <section id="reviews" class="section">
      <div class="container sectionHead">
        <h2>Reviews</h2>
        <p>What guests say after the first slice.</p>
      </div>

      <div class="container quotes">
        {REVIEWS.map((r) => {
          const isOpen = openName === r.name
          const preview =
            r.quote.length > 90 ? `${r.quote.slice(0, 90).trim()}…` : r.quote

          return (
            <button
              key={r.name}
              type="button"
              class={`quoteCard ${isOpen ? 'isOpen' : ''}`}
              onClick={() => setOpenName(isOpen ? null : r.name)}
              aria-expanded={isOpen}
              aria-label={`Toggle review by ${r.name}`}
            >
              <div class="quoteTop">
                <div class="quoteMeta">
                  <div class="quoteStars" aria-label={`${r.rating} out of 5 stars`}>
                    {'★★★★★'.slice(0, r.rating)}
                  </div>
                  <div class="quoteTitle">{r.title}</div>
                </div>
                <div class="quoteToggle">{isOpen ? 'Show less' : 'Read more'}</div>
              </div>

              <blockquote class="quoteText">“{isOpen ? r.quote : preview}”</blockquote>
              <div class="quoteFooter">— {r.name}</div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

