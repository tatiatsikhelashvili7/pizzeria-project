import './App.css'
import menu from './data/menu.json'
import { features, gallery, brand } from './constants/data'
import { useCart } from './hooks/useCart'
import { CartPanel } from './cart/CartPanel'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FeaturesSection } from './components/FeaturesSection'
import { MenuSection } from './components/MenuSection'
import { VisitSection } from './components/VisitSection'
import { ReviewsSection } from './components/ReviewsSection'
import { Footer } from './components/Footer'

export function App() {
  const cart = useCart()

  return (
    <div class="page">
      <Header
        brand={brand}
        cartCount={cart.count}
        isCartOpen={cart.isOpen}
        onOpenCart={cart.open}
      />

      <main>
        <Hero />
        <FeaturesSection features={features} />
        <MenuSection
          menu={menu}
          cartItems={cart.items}
          onAddToCart={cart.add}
          onSetQty={cart.setQty}
        />
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
      />

      <Footer brand={brand} />
    </div>
  )
}
