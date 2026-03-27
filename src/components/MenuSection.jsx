import { useMemo, useState } from 'preact/hooks'
import '../cart/cart.css'

function toPriceNumber(price) {
  const parsed = Number(String(price).replace(/[^0-9.]/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

function qtyForItem(cartItems, name) {
  const line = cartItems.find((x) => x.name === name)
  return line ? line.qty : 0
}

/** Extra tag only when it adds info beyond category (e.g. Specialty + no meat). */
function vegExtraTag(item) {
  if (!item.isVeg) return null
  if (item.category === 'Vegetarian') return null
  return 'Plant-based'
}

export function MenuSection({ menu, cartItems = [], onAddToCart, onSetQty }) {
  const [menuExpanded, setMenuExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [priceBand, setPriceBand] = useState('all')
  const [showSpicyOnly, setShowSpicyOnly] = useState(false)
  const [showVegOnly, setShowVegOnly] = useState(false)
  const [showPopularOnly, setShowPopularOnly] = useState(false)

  const categories = useMemo(
    () => ['All', ...new Set(menu.map((item) => item.category).filter(Boolean))],
    [menu]
  )

  const filteredMenu = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return menu.filter((item) => {
      const itemPrice = toPriceNumber(item.price)
      const matchesSearch =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      const matchesCategory = category === 'All' || item.category === category
      const matchesSpicy = !showSpicyOnly || item.isSpicy
      const matchesVeg = !showVegOnly || item.isVeg
      const matchesPopular = !showPopularOnly || item.isPopular

      let matchesPrice = true
      if (priceBand === 'under-13') matchesPrice = itemPrice < 13
      if (priceBand === '13-15') matchesPrice = itemPrice >= 13 && itemPrice <= 15
      if (priceBand === 'over-15') matchesPrice = itemPrice > 15

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesSpicy &&
        matchesVeg &&
        matchesPopular
      )
    })
  }, [
    menu,
    searchQuery,
    category,
    priceBand,
    showSpicyOnly,
    showVegOnly,
    showPopularOnly,
  ])

  const gardenVeggieItem = useMemo(
    () => menu.find((m) => m.name === 'Garden Veggie Deluxe') ?? null,
    [menu]
  )

  const bbqChickenItem = useMemo(
    () => menu.find((m) => m.name === 'BBQ Chicken Burst') ?? null,
    [menu]
  )

  const previewLead = useMemo(() => {
    const skip = new Set(['BBQ Chicken Burst', 'Garden Veggie Deluxe'])
    return menu.filter((m) => !skip.has(m.name)).slice(0, 3)
  }, [menu])

  const displayMenu = menuExpanded ? filteredMenu : null

  const gardenQty = gardenVeggieItem
    ? qtyForItem(cartItems, gardenVeggieItem.name)
    : 0

  const bbqQty = bbqChickenItem
    ? qtyForItem(cartItems, bbqChickenItem.name)
    : 0

  function handleSeeMore() {
    setMenuExpanded(true)
    requestAnimationFrame(() => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <section id="menu" class="section">
      <div class="container sectionHead">
        <h2>House favorites</h2>
        <p>
          {menuExpanded
            ? 'Search and filter our full menu to find your perfect slice.'
            : 'Try a few favorites—then explore everything and build your order.'}
        </p>
      </div>

      <div class={`container menuFilters${menuExpanded ? '' : ' menuFiltersHidden'}`}>
        <input
          class="menuSearch"
          type="search"
          placeholder="Search by name or ingredient..."
          value={searchQuery}
          onInput={(event) => setSearchQuery(event.currentTarget.value)}
        />

        <select
          class="menuSelect"
          value={category}
          onChange={(event) => setCategory(event.currentTarget.value)}
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          class="menuSelect"
          value={priceBand}
          onChange={(event) => setPriceBand(event.currentTarget.value)}
        >
          <option value="all">All prices</option>
          <option value="under-13">Under $13</option>
          <option value="13-15">$13 - $15</option>
          <option value="over-15">Over $15</option>
        </select>

        <label class="menuCheck">
          <input
            type="checkbox"
            checked={showSpicyOnly}
            onChange={(event) => setShowSpicyOnly(event.currentTarget.checked)}
          />
          Spicy
        </label>

        <label class="menuCheck">
          <input
            type="checkbox"
            checked={showVegOnly}
            onChange={(event) => setShowVegOnly(event.currentTarget.checked)}
          />
          Vegetarian
        </label>

        <label class="menuCheck">
          <input
            type="checkbox"
            checked={showPopularOnly}
            onChange={(event) => setShowPopularOnly(event.currentTarget.checked)}
          />
          Popular
        </label>
      </div>

      {menuExpanded ? (
        <div class="container menuGrid">
          {displayMenu.map((item) => {
            const qty = qtyForItem(cartItems, item.name)
            return (
              <article class="menuItem" key={item.name}>
                <img
                  class="menuImg"
                  src={item.imgSrc}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
                <div class="menuTop">
                  <h3>{item.name}</h3>
                  <span class="price">{item.price}</span>
                </div>
                <p class="muted">{item.desc}</p>
                <div class="menuMeta">
                  <span class="menuTag">{item.category}</span>
                  {item.isPopular ? <span class="menuTag">Popular</span> : null}
                  {item.isSpicy ? <span class="menuTag">Spicy</span> : null}
                  {vegExtraTag(item) ? (
                    <span class="menuTag">{vegExtraTag(item)}</span>
                  ) : null}
                </div>
                {qty === 0 ? (
                  <button
                    class="btn btnSmall"
                    type="button"
                    onClick={() => onAddToCart(item)}
                  >
                    Add to cart
                  </button>
                ) : (
                  <div class="menuCartControls">
                    <div class="qty">
                      <button
                        class="qtyBtn"
                        type="button"
                        onClick={() => onSetQty(item.name, qty - 1)}
                        aria-label="Remove one from cart"
                      >
                        −
                      </button>
                      <div class="qtyValue" aria-label="Quantity in cart">
                        {qty}
                      </div>
                      <button
                        class="qtyBtn"
                        type="button"
                        onClick={() => onSetQty(item.name, qty + 1)}
                        aria-label="Add one more to cart"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      ) : null}

      {!menuExpanded &&
      menu.length > 5 &&
      gardenVeggieItem &&
      bbqChickenItem ? (
        <div class="container menuPreviewBundle">
          <div class="menuGrid menuGridPreviewLead">
            {previewLead.map((item) => {
              const qty = qtyForItem(cartItems, item.name)
              return (
                <article class="menuItem" key={item.name}>
                  <img
                    class="menuImg"
                    src={item.imgSrc}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <div class="menuTop">
                    <h3>{item.name}</h3>
                    <span class="price">{item.price}</span>
                  </div>
                  <p class="muted">{item.desc}</p>
                  <div class="menuMeta">
                    <span class="menuTag">{item.category}</span>
                    {item.isPopular ? <span class="menuTag">Popular</span> : null}
                    {item.isSpicy ? <span class="menuTag">Spicy</span> : null}
                    {vegExtraTag(item) ? (
                      <span class="menuTag">{vegExtraTag(item)}</span>
                    ) : null}
                  </div>
                  {qty === 0 ? (
                    <button
                      class="btn btnSmall"
                      type="button"
                      onClick={() => onAddToCart(item)}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <div class="menuCartControls">
                      <div class="qty">
                        <button
                          class="qtyBtn"
                          type="button"
                          onClick={() => onSetQty(item.name, qty - 1)}
                          aria-label="Remove one from cart"
                        >
                          −
                        </button>
                        <div class="qtyValue" aria-label="Quantity in cart">
                          {qty}
                        </div>
                        <button
                          class="qtyBtn"
                          type="button"
                          onClick={() => onSetQty(item.name, qty + 1)}
                          aria-label="Add one more to cart"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>

          <div class="menuPreviewTriple">
            <article class="menuItem menuItemPreviewCol">
              <img
                class="menuImg"
                src={bbqChickenItem.imgSrc}
                alt={bbqChickenItem.name}
                loading="lazy"
                decoding="async"
              />
              <div class="menuTop">
                <h3>{bbqChickenItem.name}</h3>
                <span class="price">{bbqChickenItem.price}</span>
              </div>
              <p class="muted">{bbqChickenItem.desc}</p>
              <div class="menuMeta">
                <span class="menuTag">{bbqChickenItem.category}</span>
                {bbqChickenItem.isPopular ? (
                  <span class="menuTag">Popular</span>
                ) : null}
                {bbqChickenItem.isSpicy ? (
                  <span class="menuTag">Spicy</span>
                ) : null}
                {vegExtraTag(bbqChickenItem) ? (
                  <span class="menuTag">{vegExtraTag(bbqChickenItem)}</span>
                ) : null}
              </div>
              {bbqQty === 0 ? (
                <button
                  class="btn btnSmall"
                  type="button"
                  onClick={() => onAddToCart(bbqChickenItem)}
                >
                  Add to cart
                </button>
              ) : (
                <div class="menuCartControls">
                  <div class="qty">
                    <button
                      class="qtyBtn"
                      type="button"
                      onClick={() =>
                        onSetQty(bbqChickenItem.name, bbqQty - 1)
                      }
                      aria-label="Remove one from cart"
                    >
                      −
                    </button>
                    <div class="qtyValue" aria-label="Quantity in cart">
                      {bbqQty}
                    </div>
                    <button
                      class="qtyBtn"
                      type="button"
                      onClick={() =>
                        onSetQty(bbqChickenItem.name, bbqQty + 1)
                      }
                      aria-label="Add one more to cart"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </article>

            <article class="menuItem menuItemPreviewCol">
              <img
                class="menuImg"
                src={gardenVeggieItem.imgSrc}
                alt={gardenVeggieItem.name}
                loading="lazy"
                decoding="async"
              />
              <div class="menuTop">
                <h3>{gardenVeggieItem.name}</h3>
                <span class="price">{gardenVeggieItem.price}</span>
              </div>
              <p class="muted">{gardenVeggieItem.desc}</p>
              <div class="menuMeta">
                <span class="menuTag">{gardenVeggieItem.category}</span>
                {gardenVeggieItem.isPopular ? (
                  <span class="menuTag">Popular</span>
                ) : null}
                {gardenVeggieItem.isSpicy ? (
                  <span class="menuTag">Spicy</span>
                ) : null}
                {vegExtraTag(gardenVeggieItem) ? (
                  <span class="menuTag">{vegExtraTag(gardenVeggieItem)}</span>
                ) : null}
              </div>
              {gardenQty === 0 ? (
                <button
                  class="btn btnSmall"
                  type="button"
                  onClick={() => onAddToCart(gardenVeggieItem)}
                >
                  Add to cart
                </button>
              ) : (
                <div class="menuCartControls">
                  <div class="qty">
                    <button
                      class="qtyBtn"
                      type="button"
                      onClick={() =>
                        onSetQty(gardenVeggieItem.name, gardenQty - 1)
                      }
                      aria-label="Remove one from cart"
                    >
                      −
                    </button>
                    <div class="qtyValue" aria-label="Quantity in cart">
                      {gardenQty}
                    </div>
                    <button
                      class="qtyBtn"
                      type="button"
                      onClick={() =>
                        onSetQty(gardenVeggieItem.name, gardenQty + 1)
                      }
                      aria-label="Add one more to cart"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </article>

            <div class="menuSeeMoreCard menuItemPreviewCol">
              <p class="menuSeeMoreEyebrow">Still deciding?</p>
              <h3 class="menuSeeMoreTitle">See the full menu</h3>
              <p class="menuSeeMoreText muted">
                See every pizza, use filters, and add what you want to your cart.
              </p>
              <button
                class="btn btnPrimary menuSeeMoreBtn"
                type="button"
                onClick={handleSeeMore}
              >
                Browse &amp; order
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {!menuExpanded &&
      menu.length > 5 &&
      (!gardenVeggieItem || !bbqChickenItem) ? (
        <div class="container menuGrid">
          {menu.slice(0, 5).map((item) => {
            const qty = qtyForItem(cartItems, item.name)
            return (
              <article class="menuItem" key={item.name}>
                <img
                  class="menuImg"
                  src={item.imgSrc}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
                <div class="menuTop">
                  <h3>{item.name}</h3>
                  <span class="price">{item.price}</span>
                </div>
                <p class="muted">{item.desc}</p>
                <div class="menuMeta">
                  <span class="menuTag">{item.category}</span>
                  {item.isPopular ? <span class="menuTag">Popular</span> : null}
                  {item.isSpicy ? <span class="menuTag">Spicy</span> : null}
                  {vegExtraTag(item) ? (
                    <span class="menuTag">{vegExtraTag(item)}</span>
                  ) : null}
                </div>
                {qty === 0 ? (
                  <button
                    class="btn btnSmall"
                    type="button"
                    onClick={() => onAddToCart(item)}
                  >
                    Add to cart
                  </button>
                ) : (
                  <div class="menuCartControls">
                    <div class="qty">
                      <button
                        class="qtyBtn"
                        type="button"
                        onClick={() => onSetQty(item.name, qty - 1)}
                        aria-label="Remove one from cart"
                      >
                        −
                      </button>
                      <div class="qtyValue" aria-label="Quantity in cart">
                        {qty}
                      </div>
                      <button
                        class="qtyBtn"
                        type="button"
                        onClick={() => onSetQty(item.name, qty + 1)}
                        aria-label="Add one more to cart"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      ) : null}

      {menuExpanded && filteredMenu.length === 0 ? (
        <div class="container menuEmpty">
          No pizzas match these filters. Try widening your search.
        </div>
      ) : null}
    </section>
  )
}

