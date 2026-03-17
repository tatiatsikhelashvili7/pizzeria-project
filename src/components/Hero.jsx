export function Hero() {
  return (
    <section class="hero" aria-label="Hero">
      <div class="container heroGrid">
        <div class="heroCopy">
          <p class="eyebrow">Modern • minimal • wood‑fired</p>
          <h1 class="heroTitle">Wood‑fired pizza, beautifully simple.</h1>
          <p class="heroSub">
            A premium take on the classics—slow-fermented dough, bright sauces,
            and clean finishes.
          </p>

          <div class="heroCtas">
            <a class="btn btnPrimary" href="#menu">
              Explore the menu
            </a>
            <a class="btn btnGhost" href="#visit">
              Reserve a table
            </a>
          </div>

          <div class="heroMeta" role="list" aria-label="Quick info">
            <div class="metaCard" role="listitem">
              <div class="metaLabel">Open</div>
              <div class="metaValue">11:00–23:00</div>
            </div>
            <div class="metaCard" role="listitem">
              <div class="metaLabel">Pickup</div>
              <div class="metaValue">15–25 min</div>
            </div>
            <div class="metaCard" role="listitem">
              <div class="metaLabel">Delivery</div>
              <div class="metaValue">25–35 min</div>
            </div>
          </div>
        </div>

        <div class="heroMedia" aria-label="Featured pizza photo">
          <div class="heroPhoto" />
          <div class="floatingCard cardSpecial">
            <div class="cardTitle">Today’s special</div>
            <div class="cardBody">pesto • burrata • basil</div>
          </div>
          <div class="floatingCard cardDeal">
            <div class="cardTitle">Family night</div>
            <div class="cardBody">Two large + one side • $29</div>
          </div>
        </div>
      </div>
    </section>
  )
}

