import { brand } from '@/data/constants'
import { useCart } from '@/hooks/useCart'
import { CartPanel } from '@/components/cart/CartPanel'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { MenuCard } from '@/components/MenuCard'
import { MenuFilter } from '@/components/MenuFilter'
import { PizzaCustomizer } from '@/components/PizzaCustomizer'
import { ALL_PIZZAS } from '@/data/menuData'
import { useState, useMemo, useEffect } from 'preact/hooks'

function toPriceNumber(price) {
  const parsed = Number(String(price).replace(/[^0-9.]/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

function qtyForItem(cartItems, name) {
  const line = cartItems.find((x) => x.name === name)
  return line ? line.qty : 0
}

export function Menu() {
  const cart = useCart()
  const [customizingPizza, setCustomizingPizza] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [showSpicy, setShowSpicy] = useState(false)
  const [showVeg, setShowVeg] = useState(false)
  const [showPopular, setShowPopular] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const filteredMenu = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return ALL_PIZZAS.filter((item) => {
      const matchesSearch =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      const matchesCategory = category === 'All' || item.category === category
      const matchesSpicy = !showSpicy || item.isSpicy
      const matchesVeg = !showVeg || item.isVeg
      const matchesPopular = !showPopular || item.isPopular

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSpicy &&
        matchesVeg &&
        matchesPopular
      )
    })
  }, [searchQuery, category, showSpicy, showVeg, showPopular])

  return (
    <div className="page" id="menu-page">
      <Header
        brand={brand}
        cartCount={cart.count}
        isCartOpen={cart.isOpen}
        onOpenCart={cart.open}
      />

      <main>
        <section className="section">
          <PizzaCustomizer
            isOpen={!!customizingPizza}
            pizza={customizingPizza}
            onClose={() => setCustomizingPizza(null)}
            onAddToCart={cart.add}
          />

          <div className="container sectionHead">
            <h2>Our Menu</h2>
            <p>Explore all our delicious pizzas, customize and order.</p>
          </div>

          <MenuFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            category={category}
            onCategoryChange={setCategory}
            showSpicy={showSpicy}
            onSpicyChange={setShowSpicy}
            showVeg={showVeg}
            onVegChange={setShowVeg}
            showPopular={showPopular}
            onPopularChange={setShowPopular}
          />

          {filteredMenu.length > 0 ? (
            <div className="container menuGrid">
              {filteredMenu.map((item) => {
                const qty = qtyForItem(cart.items, item.name)
                return (
                  <MenuCard
                    key={item.id}
                    item={item}
                    qty={qty}
                    onAddToCart={cart.add}
                    onSetQty={cart.setQty}
                    onCustomize={setCustomizingPizza}
                  />
                )
              })}
            </div>
          ) : (
            <div
              className="container"
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#666',
              }}
            >
              <p>No pizzas match these filters. Try adjusting your search.</p>
            </div>
          )}
        </section>
      </main>

      <CartPanel
        isOpen={cart.isOpen}
        onClose={cart.close}
        items={cart.items}
        count={cart.count}
        total={cart.total}
        onClear={cart.clear}
        onSetQty={cart.setQty}
        onCheckout={() => cart.clear()}
      />

      <Footer brand={brand} />
    </div>
  )
}
