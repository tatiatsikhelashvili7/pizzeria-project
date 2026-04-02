import { BundleCard } from '@/components/BundleCard'
import { BUNDLES } from '@/data/bundlesData'

export function BundlesSection({ onAddToCart, onCustomize }) {
  const todaysSpecial = BUNDLES.find((b) => b.isToday)
  const otherBundles = BUNDLES.filter((b) => !b.isToday)

  return (
    <section style={{
      padding: '5rem 0',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #ffe8f0 50%, #fff3e0 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '300px',
        height: '300px',
        background: 'rgba(255, 107, 53, 0.1)',
        borderRadius: '50%',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-40px',
        width: '250px',
        height: '250px',
        background: 'rgba(0, 102, 255, 0.08)',
        borderRadius: '50%',
        zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.4rem',
        }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            padding: '10px 20px',
            borderRadius: '50px',
            marginBottom: '12px',
            fontSize: '0.85rem',
            fontWeight: '800',
            color: '#ff6b35',
            letterSpacing: '1px',
            border: '1.5px solid #ff6b35',
            textTransform: 'uppercase',
          }}>
            🎁 SPECIAL BUNDLES
          </div>
          <h2 style={{
            fontSize: '3.2rem',
            margin: '0 0 12px 0',
            fontWeight: '900',
            color: '#1a1a1a',
            letterSpacing: '-0.8px',
            lineHeight: '1.1',
          }}>
            Mix & Match Bundles
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#666',
            margin: '0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6',
            fontWeight: '400',
          }}>
            Handpicked combinations to save money & time. Perfect for sharing!
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '1.8rem',
        }}>
          {todaysSpecial && (
            <BundleCard
              bundle={todaysSpecial}
              onAddToCart={onAddToCart}
              onCustomize={onCustomize}
            />
          )}
          {otherBundles.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              onAddToCart={onAddToCart}
              onCustomize={onCustomize}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
