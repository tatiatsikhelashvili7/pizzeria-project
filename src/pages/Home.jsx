import { features, gallery, brand } from '@/data/constants'
import { useCart } from '@/hooks/useCart'
import { CartPanel } from '@/components/cart/CartPanel'
import { Header } from '@/components/common/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { VisitSection } from '@/components/sections/VisitSection'
import { ReviewsSection } from '@/components/sections/ReviewsSection'
import { Footer } from '@/components/common/Footer'
import { MenuCard } from '@/components/MenuCard'
import { PizzaCustomizer } from '@/components/PizzaCustomizer'
import { BundleCustomizer } from '@/components/BundleCustomizer'
import { BundlesSection } from '@/components/BundlesSection'
import { FEATURED_PIZZAS } from '@/data/menuData'
import { useState, useEffect } from 'preact/hooks'
import { useLocation } from 'wouter'

function qtyForItem(cartItems, name) {
  const line = cartItems.find((x) => x.name === name)
  return line ? line.qty : 0
}

export function Home() {
  const [, setLocation] = useLocation()
  const cart = useCart()
  const [customizingPizza, setCustomizingPizza] = useState(null)
  const [customizingBundle, setCustomizingBundle] = useState(null)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && hash !== '') {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  return (
    <div className="page" id="home">
      <Header
        brand={brand}
        cartCount={cart.count}
        isCartOpen={cart.isOpen}
        onOpenCart={cart.open}
      />

      <main>
        <HeroSection />
        <FeaturesSection features={features} />
        <BundleCustomizer
          isOpen={!!customizingBundle}
          bundle={customizingBundle}
          onClose={() => setCustomizingBundle(null)}
          onAddToCart={cart.add}
        />
        <BundlesSection 
          onAddToCart={cart.add}
          onCustomize={setCustomizingBundle}
        />

        <section id="menu" className="section">
          <PizzaCustomizer
            isOpen={!!customizingPizza}
            pizza={customizingPizza}
            onClose={() => setCustomizingPizza(null)}
            onAddToCart={cart.add}
          />

          <div className="container sectionHead">
            <h2>House favorites</h2>
            <p>Search and filter our full menu to find your perfect slice.</p>
          </div>

          <div className="container menuGrid">
            {FEATURED_PIZZAS.map((item) => {
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

          <div className="container" style={{ textAlign: 'center', paddingTop: '2rem' }}>
            <button
              className="btn btnPrimary"
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
              onClick={() => setLocation('/menu')}
            >
              Browse & order
            </button>
          </div>
        </section>

        <VisitSection gallery={gallery} />
        <ReviewsSection />
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
