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
      'Delivery is quick, and it arrives hot. It\'s become our weekly order—especially when we want something simple but high quality.',
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
    <section id="reviews" className="section">
      <div className="container sectionHead">
        <h2>Reviews</h2>
        <p>What guests say after the first slice.</p>
      </div>

      <div className="container quotes">
        {REVIEWS.map((r) => (
          <ReviewCard
            key={r.name}
            review={r}
            isOpen={openName === r.name}
            onToggle={() => setOpenName(openName === r.name ? null : r.name)}
          />
        ))}
      </div>
    </section>
  )
}

function ReviewCard({ review, isOpen, onToggle }) {
  const preview =
    review.quote.length > 90 ? `${review.quote.slice(0, 90).trim()}…` : review.quote

  return (
    <button
      type="button"
      className={`quoteCard ${isOpen ? 'isOpen' : ''}`}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={`Toggle review by ${review.name}`}
    >
      <div className="quoteTop">
        <div className="quoteMeta">
          <div className="quoteStars" aria-label={`${review.rating} out of 5 stars`}>
            {'★★★★★'.slice(0, review.rating)}
          </div>
          <div className="quoteTitle">{review.title}</div>
        </div>
        <div className="quoteToggle">{isOpen ? 'Show less' : 'Read more'}</div>
      </div>

      <blockquote className="quoteText">
        "{isOpen ? review.quote : preview}"
      </blockquote>
      <div className="quoteFooter">— {review.name}</div>
    </button>
  )
}
