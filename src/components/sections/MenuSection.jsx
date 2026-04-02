import { useMemo, useState } from 'preact/hooks'
import { PizzaCustomizer } from '@/components/PizzaCustomizer'

function toPriceNumber(price) {
  const parsed = Number(String(price).replace(/[^0-9.]/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

function qtyForItem(cartItems, name) {
  const line = cartItems.find((x) => x.name === name)
  return line ? line.qty : 0
}

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
  const [customizingPizza, setCustomizingPizza] = useState(null)

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
    <section id="menu" className="section">
      <PizzaCustomizer
        isOpen={!!customizingPizza}
        pizza={customizingPizza}
        onClose={() => setCustomizingPizza(null)}
        onAddToCart={onAddToCart}
      />

      <div className="container sectionHead">
        <h2>House favorites</h2>
        <p>
          {menuExpanded
            ? 'Search and filter our full menu to find your perfect slice.'
            : 'Try a few favorites—then explore everything and build your order.'}
        </p>
      </div>

      <div className={`container menuFilters${menuExpanded ? '' : ' menuFiltersHidden'}`}>
        <input
          className="menuSearch"
          type="search"
          placeholder="Search by name or ingredient..."
          value={searchQuery}
          onInput={(event) => setSearchQuery(event.currentTarget.value)}
        />

        <select
          className="menuSelect"
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
          className="menuSelect"
          value={priceBand}
          onChange={(event) => setPriceBand(event.currentTarget.value)}
        >
          <option value="all">All prices</option>
          <option value="under-13">Under $13</option>
          <option value="13-15">$13 - $15</option>
          <option value="over-15">Over $15</option>
        </select>

        <label className="menuCheck">
          <input
            type="checkbox"
            checked={showSpicyOnly}
            onChange={(event) => setShowSpicyOnly(event.currentTarget.checked)}
          />
          Spicy
        </label>

        <label className="menuCheck">
          <input
            type="checkbox"
            checked={showVegOnly}
            onChange={(event) => setShowVegOnly(event.currentTarget.checked)}
          />
          Vegetarian
        </label>

        <label className="menuCheck">
          <input
            type="checkbox"
            checked={showPopularOnly}
            onChange={(event) => setShowPopularOnly(event.currentTarget.checked)}
          />
          Popular
        </label>
      </div>

      {menuExpanded ? (
        <div className="container menuGrid">
          {displayMenu.map((item) => {
            const qty = qtyForItem(cartItems, item.name)
            return <MenuItem key={item.name} item={item} qty={qty} cartItems={cartItems} onAddToCart={onAddToCart} onSetQty={onSetQty} onCustomize={setCustomizingPizza} />
          })}
        </div>
      ) : null}

      {menu.length > 5 &&
      gardenVeggieItem &&
      bbqChickenItem ? (
        <div className="container menuPreviewBundle">
          <div className="menuGrid menuGridPreviewLead">
            {previewLead.map((item) => {
              const qty = qtyForItem(cartItems, item.name)
              return <MenuItem key={item.name} item={item} qty={qty} cartItems={cartItems} onAddToCart={onAddToCart} onSetQty={onSetQty} onCustomize={setCustomizingPizza} />
            })}
          </div>

          <div className="menuPreviewTriple">
            <MenuItem item={bbqChickenItem} qty={bbqQty} cartItems={cartItems} onAddToCart={onAddToCart} onSetQty={onSetQty} onCustomize={setCustomizingPizza} />
            <MenuItem item={gardenVeggieItem} qty={gardenQty} cartItems={cartItems} onAddToCart={onAddToCart} onSetQty={onSetQty} onCustomize={setCustomizingPizza} />

            <div className="menuSeeMoreCard menuItemPreviewCol">
              <p className="menuSeeMoreEyebrow">Still deciding?</p>
              <h3 className="menuSeeMoreTitle">See the full menu</h3>
              <p className="menuSeeMoreText muted">
                See every pizza, use filters, and add what you want to your cart.
              </p>
              <button
                className="btn btnPrimary menuSeeMoreBtn"
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
        <div className="container menuGrid">
          {menu.slice(0, 5).map((item) => {
            const qty = qtyForItem(cartItems, item.name)
            return <MenuItem key={item.name} item={item} qty={qty} cartItems={cartItems} onAddToCart={onAddToCart} onSetQty={onSetQty} onCustomize={setCustomizingPizza} />
          })}
        </div>
      ) : null}

      {menuExpanded && filteredMenu.length === 0 ? (
        <div className="container menuEmpty">
          No pizzas match these filters. Try widening your search.
        </div>
      ) : null}
    </section>
  )
}

function MenuItem({ item, qty, onAddToCart, onSetQty, onCustomize }) {
  return (
    <article className="menuItem">
      <img
        className="menuImg"
        src={item.imgSrc}
        alt={item.name}
        loading="lazy"
        decoding="async"
      />
      <div className="menuTop">
        <h3>{item.name}</h3>
        <span className="price">{item.price}</span>
      </div>
      <p className="muted">{item.desc}</p>
      <div className="menuMeta">
        <span className="menuTag">{item.category}</span>
        {item.isPopular ? <span className="menuTag">Popular</span> : null}
        {item.isSpicy ? <span className="menuTag">Spicy</span> : null}
        {vegExtraTag(item) ? (
          <span className="menuTag">{vegExtraTag(item)}</span>
        ) : null}
      </div>
      {qty === 0 ? (
        <button
          className="btn btnSmall"
          type="button"
          onClick={() => onCustomize(item)}
        >
          Customize & Add
        </button>
      ) : (
        <div className="menuCartControls">
          <div className="qty">
            <button
              className="qtyBtn"
              type="button"
              onClick={() => onSetQty(item.name, qty - 1)}
              aria-label="Remove one from cart"
            >
              −
            </button>
            <div className="qtyValue" aria-label="Quantity in cart">
              {qty}
            </div>
            <button
              className="qtyBtn"
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
}
