export function HeroSection() {
  return (
    <section className="hero" aria-label="Hero">
      <div className="container heroGrid">
        <div className="heroCopy">
          <p className="eyebrow">Modern • minimal • wood‑fired</p>
          <h1 className="heroTitle">Wood‑fired pizza, beautifully simple.</h1>
          <p className="heroSub">
            A premium take on the classics—slow-fermented dough, bright sauces,
            and clean finishes.
          </p>

          <div className="heroCtas">
            <a className="btn btnPrimary" href="#menu">
              Explore the menu
            </a>
            <a className="btn btnGhost" href="#visit">
              Reserve a table
            </a>
          </div>

          <div className="heroMeta" role="list" aria-label="Quick info">
            <div className="metaCard" role="listitem">
              <div className="metaLabel">Open</div>
              <div className="metaValue">11:00–23:00</div>
            </div>
            <div className="metaCard" role="listitem">
              <div className="metaLabel">Pickup</div>
              <div className="metaValue">15–25 min</div>
            </div>
            <div className="metaCard" role="listitem">
              <div className="metaLabel">Delivery</div>
              <div className="metaValue">25–35 min</div>
            </div>
          </div>
        </div>

        <div className="heroMedia" aria-label="Featured pizza photo">
          <div className="heroPhoto" />
          <div className="floatingCard cardSpecial">
            <div className="cardTitle">Today's special</div>
            <div className="cardBody">pesto • burrata • basil</div>
          </div>
          <div className="floatingCard cardDeal">
            <div className="cardTitle">Family night</div>
            <div className="cardBody">Two large + one side • $29</div>
          </div>
        </div>
      </div>
    </section>
  )
}
