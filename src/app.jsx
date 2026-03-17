import './App.css'
import { useMemo, useState } from 'preact/hooks'

const menu = [
  {
    name: 'Pesto Margherita',
    desc: 'basil pesto, fresh mozzarella, slow-roasted tomatoes.',
    price: '$12',
  },
  {
    name: 'Creamy Truffle Mushroom',
    desc: 'Garlic cream, roasted mushrooms, parsley, aged parmesan.',
    price: '$15',
  },
  {
    name: 'Spicy Pepperoni Classic',
    desc: 'House tomato sauce, mozzarella, pepperoni, chili honey.',
    price: '$14',
  },
]

function priceToNumber(price) {
  const n = Number(String(price).replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

const features = [
  {
    title: 'Hand-stretched dough',
    desc: 'Slow-fermented for a crisp edge and airy bite.',
    imgAlt: 'Fresh pizza dough being stretched',
    imgSrc:
      'https://images.unsplash.com/photo-1716237388087-4e47595a6615?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    title: 'Wood-fired finish',
    desc: 'High heat for a gentle char and perfect melt.',
    imgAlt: 'Pizza baking in a wood-fired oven',
    imgSrc:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    title: 'Fast pickup & delivery',
    desc: 'Hot, on time, and packed to stay crisp.',
    imgAlt: 'Fresh pizza in a delivery box',
    imgSrc:
      'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=200&h=200&q=80',
  },
]

const fallbackIcon =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#B8AD86"/>
          <stop offset="1" stop-color="#F7F3E9"/>
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="62" height="62" rx="18" fill="url(#g)" stroke="rgba(31,31,31,.12)"/>
      <path d="M32 14c-9.5 0-18.1 2.7-24 6.6C11.5 40.4 22.6 53 32 58c9.4-5 20.5-17.6 24-37.4C50.1 16.7 41.5 14 32 14z" fill="rgba(31,31,31,.16)"/>
      <circle cx="24" cy="30" r="3" fill="rgba(31,31,31,.22)"/>
      <circle cx="40" cy="32" r="3" fill="rgba(31,31,31,.22)"/>
      <circle cx="32" cy="42" r="3" fill="rgba(31,31,31,.22)"/>
    </svg>`
  )

const gallery = [
  {
    alt: 'Wood-fired pizza on a wooden board',
    src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  },
  {
    alt: 'Fresh pizza sliced and ready to serve',
    src: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    alt: 'Close-up of a pizza with melted cheese and basil',
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
  },
  {
    alt: 'Wood-fired pepperoni pizza with a crisp edge',
    src: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=80',
  },
]

export function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState(() => [])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  )

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.qty * priceToNumber(item.price), 0),
    [cart]
  )

  function addToCart(menuItem) {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.name === menuItem.name)
      if (idx === -1) return [...prev, { ...menuItem, qty: 1 }]
      return prev.map((x, i) => (i === idx ? { ...x, qty: x.qty + 1 } : x))
    })
    setIsCartOpen(true)
  }

  function setQty(name, nextQty) {
    const qty = Math.max(0, Math.min(99, nextQty))
    setCart((prev) =>
      qty === 0 ? prev.filter((x) => x.name !== name) : prev.map((x) => (x.name === name ? { ...x, qty } : x))
    )
  }

  function clearCart() {
    setCart([])
  }

  return (
    <div class="page">
      <header class="header">
        <div class="container nav">
          <div class="brand">
            <span class="brandMark" aria-hidden="true">
              <img
                class="brandLogoImg"
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=96&h=96&q=80"
                alt=""
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = fallbackIcon
                }}
              />
            </span>
            <span class="brandName">Tatia’s Pizza</span>
          </div>

          <nav class="links" aria-label="Primary">
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href="#reviews">Reviews</a>
            <a href="#visit">Visit</a>
          </nav>

          <button
            class="btn btnPrimary cartBtn"
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isCartOpen}
          >
            Cart
            {cartCount > 0 ? <span class="cartBadge">{cartCount}</span> : null}
          </button>
        </div>
      </header>

      <main>
        <section class="hero" aria-label="Hero">
          <div class="container heroGrid">
            <div class="heroCopy">
              <p class="eyebrow">Modern • minimal • wood‑fired</p>
              <h1 class="heroTitle">Wood‑fired pizza, beautifully simple.</h1>
              <p class="heroSub">
                A premium take on the classics—slow-fermented dough, bright sauces, and clean finishes.
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

        <section id="about" class="section">
          <div class="container sectionHead">
            <h2>Why Tatia’s?</h2>
            <p>
              Premium ingredients, precise heat, and a calm, minimal experience from first click to last bite.
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

        <section id="menu" class="section">
          <div class="container sectionHead">
            <h2>House favorites</h2>
            <p>Start here—three signatures our guests come back for.</p>
          </div>

          <div class="container menuGrid">
            {menu.map((item) => (
              <article class="menuItem" key={item.name}>
                <div class="menuTop">
                  <h3>{item.name}</h3>
                  <span class="price">{item.price}</span>
                </div>
                <p class="muted">{item.desc}</p>
                <button
                  class="btn btnSmall"
                  type="button"
                  onClick={() => addToCart(item)}
                >
                  Add to cart
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="visit" class="section">
          <div class="container visitGrid">
            <div class="visitCopy">
              <h2>Visit Tatia’s Pizza</h2>
              <p class="muted">
                Cozy seats, warm lighting, and a wood‑fired oven you can watch and smell delicious food.
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
                <img key={g.src} class="galleryImg" src={g.src} alt={g.alt} />
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" class="section">
          <div class="container sectionHead">
            <h2>Reviews</h2>
            <p>What guests say after the first slice.</p>
          </div>

          <div class="container quotes">
            <figure class="quote">
              <blockquote>
                “The crust has that perfect char—clean, balanced, and seriously good.”
              </blockquote>
              <figcaption>— Sam</figcaption>
            </figure>
            <figure class="quote">
              <blockquote>“Delivery is quick, and it arrives hot. It’s become our weekly order.”</blockquote>
              <figcaption>— Lina</figcaption>
            </figure>
            <figure class="quote">
              <blockquote>“Minimal menu, maximum quality. Exactly what we look for.”</blockquote>
              <figcaption>— Omar</figcaption>
            </figure>
          </div>
        </section>
      </main>

      {isCartOpen ? (
        <div
          class="cartOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          onClick={(e) => {
            if (e.currentTarget === e.target) setIsCartOpen(false)
          }}
        >
          <aside class="cartPanel">
            <div class="cartHeader">
              <div>
                <div class="cartTitle">Your cart</div>
                <div class="cartSub muted">
                  {cartCount === 0 ? 'No items yet.' : `${cartCount} item${cartCount === 1 ? '' : 's'} in cart`}
                </div>
              </div>
              <button class="iconBtn" type="button" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
                ✕
              </button>
            </div>

            <div class="cartBody">
              {cart.length === 0 ? (
                <div class="cartEmpty">
                  <div class="cartEmptyTitle">Add a pizza to get started.</div>
                  <a class="btn btnPrimary" href="#menu" onClick={() => setIsCartOpen(false)}>
                    Browse menu
                  </a>
                </div>
              ) : (
                <ul class="cartList">
                  {cart.map((item) => (
                    <li class="cartItem" key={item.name}>
                      <div class="cartItemTop">
                        <div class="cartItemName">{item.name}</div>
                        <div class="cartItemPrice">{item.price}</div>
                      </div>
                      <div class="cartItemDesc muted">{item.desc}</div>
                      <div class="cartItemControls">
                        <div class="qty">
                          <button class="qtyBtn" type="button" onClick={() => setQty(item.name, item.qty - 1)} aria-label="Decrease quantity">
                            −
                          </button>
                          <div class="qtyValue" aria-label="Quantity">
                            {item.qty}
                          </div>
                          <button class="qtyBtn" type="button" onClick={() => setQty(item.name, item.qty + 1)} aria-label="Increase quantity">
                            +
                          </button>
                        </div>
                        <button class="linkBtn" type="button" onClick={() => setQty(item.name, 0)}>
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div class="cartFooter">
              <div class="cartTotalRow">
                <span class="muted">Total</span>
                <span class="cartTotal">${cartTotal.toFixed(2)}</span>
              </div>
              <div class="cartActions">
                <button class="btn btnGhost" type="button" onClick={clearCart} disabled={cart.length === 0}>
                  Clear
                </button>
                <button class="btn btnPrimary" type="button" disabled={cart.length === 0}>
                  Checkout
                </button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      <footer class="footer">
        <div class="container footerGrid">
          <div>
            <div class="brand footerBrand">
              <span class="brandMark" aria-hidden="true">
                <img
                  class="brandLogoImg"
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=96&h=96&q=80"
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = fallbackIcon
                  }}
                />
              </span>
              <span class="brandName">Tatia’s Pizzeria</span>
            </div>
            <p class="muted">
              When life gives you lemons, sell them and buy pizza. pizza with slice of Heaven on Every Plate.
            </p>
          </div>

          <div class="footerCols">
            <div class="footerCol">
              <div class="footerTitle">Product</div>
              <a href="#menu">Menu</a>
              <a href="#visit">Pickup</a>
              <a href="#visit">Delivery</a>
            </div>
            <div class="footerCol">
              <div class="footerTitle">Company</div>
              <a href="#about">About</a>
              <a href="#reviews">Reviews</a>
              <a href="#visit">Contact</a>
            </div>
          </div>
        </div>

        <div class="container footerBottom">
          <span class="muted">© {new Date().getFullYear()} Tatia’s Pizza</span>
          <span class="muted">Baked fresh daily</span>
        </div>
      </footer>
    </div>
  )
}
