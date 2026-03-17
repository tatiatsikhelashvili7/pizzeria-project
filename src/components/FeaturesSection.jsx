import { fallbackIcon } from '../utils/fallbackIcon'

export function FeaturesSection({ features }) {
  return (
    <section id="about" class="section">
      <div class="container sectionHead">
        <h2>Why Tatia’s?</h2>
        <p>
          Premium ingredients, precise heat, and a calm, minimal experience from
          first click to last bite.
        </p>
      </div>

      <div class="container cards3">
        {features.map((f) => (
          <article class="card" key={f.title}>
            <img
              class="featureIcon"
              src={f.imgSrc}
              alt={f.imgAlt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = fallbackIcon
              }}
            />
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <a class="cardLink" href="#visit">
              Visit us
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

