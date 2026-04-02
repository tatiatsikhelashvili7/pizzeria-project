import { useState, useEffect } from 'preact/hooks'
import { ALL_PIZZAS } from '@/data/menuData'
import './PizzaCustomizer.css'

export function BundleCustomizer({ isOpen, bundle, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedPizzas, setSelectedPizzas] = useState([])
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    setQuantity(1)
    setSelectedPizzas([])
  }, [bundle])

  if (!isOpen || !bundle) return null

  const priceNum = Number(String(bundle.price).replace(/[^0-9.]/g, ''))
  const totalPrice = (priceNum * quantity).toFixed(2)
  const pizzaCount = bundle.choices?.pizzas?.count || 0
  const accentColor = bundle.isToday ? '#ff6b35' : (bundle.id === 1 ? '#0066ff' : '#e91e63')

  function togglePizza(pizza) {
    setSelectedPizzas((prev) => {
      if (prev.find((p) => p.id === pizza.id)) {
        return prev.filter((p) => p.id !== pizza.id)
      }
      if (prev.length >= pizzaCount) return prev
      return [...prev, pizza]
    })
  }

  function handleAddToCart() {
    setIsAdding(true)
    const items = [...(bundle.items || [])]
    if (bundle.choices?.pizzas && selectedPizzas.length > 0) {
      items[0] = selectedPizzas.map((p) => p.name).join(' + ')
    }

    onAddToCart({
      name: bundle.name,
      price: bundle.price,
      desc: bundle.desc,
      category: 'Bundle',
      isBundle: true,
      quantity: quantity,
      items: items,
      selectedPizzas: selectedPizzas,
    })
    setTimeout(() => {
      setIsAdding(false)
      onClose()
    }, 300)
  }

  return (
    <div className="customizerOverlay" onClick={() => onClose()}>
      <div className="customizerModal" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header with close */}
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          padding: '16px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}>
          <h2 style={{ margin: '0', fontSize: '1.3rem', fontWeight: '700', color: '#1a1a1a' }}>
            {bundle.emoji} {bundle.name}
          </h2>
          <button 
            className="customizerClose" 
            onClick={() => onClose()}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0',
              color: '#999',
            }}
          >
            ✕
          </button>
        </div>

        <div className="customizerBody" style={{ padding: '20px' }}>
          <p style={{ color: '#666', margin: '0 0 24px 0', fontWeight: '500', fontSize: '0.95rem' }}>{bundle.desc}</p>

          {/* Pizza Selection */}
          {bundle.choices?.pizzas && (
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ margin: '0 0 14px 0', color: '#1a1a1a', fontWeight: '700', fontSize: '1rem' }}>
                🍕 {bundle.choices.pizzas.label}
              </h3>
              <p style={{ margin: '0 0 12px 0', color: '#888', fontSize: '0.85rem' }}>Choose {pizzaCount}:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px', maxHeight: '320px', overflowY: 'auto' }}>
                {ALL_PIZZAS.map((pizza) => {
                  const isSelected = selectedPizzas.find((p) => p.id === pizza.id)
                  return (
                    <button
                      key={pizza.id}
                      type="button"
                      onClick={() => togglePizza(pizza)}
                      style={{
                        padding: '12px 10px',
                        backgroundColor: isSelected ? accentColor : '#f8f8f8',
                        color: isSelected ? 'white' : '#333',
                        border: `2px solid ${isSelected ? accentColor : '#e0e0e0'}`,
                        borderRadius: '8px',
                        fontWeight: isSelected ? '700' : '600',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.target.style.borderColor = accentColor
                          e.target.style.backgroundColor = 'rgba(0, 102, 255, 0.05)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.target.style.borderColor = '#e0e0e0'
                          e.target.style.backgroundColor = '#f8f8f8'
                        }
                      }}
                    >
                      {isSelected ? '✓ ' : ''}{pizza.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Bundle Items */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ margin: '0 0 14px 0', color: '#1a1a1a', fontWeight: '700', fontSize: '1rem' }}>What's Included:</h3>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {bundle.items.map((item, idx) => {
                const isCustomizable = item.includes('(Any)')
                return (
                  <li key={idx} style={{ padding: '12px', color: '#333', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500', backgroundColor: '#f9f9f9', borderRadius: '6px', marginBottom: '8px' }}>
                    <span style={{ color: accentColor, fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span>
                    <span style={{ flex: 1 }}>
                      {isCustomizable && selectedPizzas.length > 0
                        ? selectedPizzas.map((p) => p.name).join(' + ')
                        : item}
                    </span>
                    {isCustomizable && selectedPizzas.length > 0 && (
                      <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: '700', backgroundColor: accentColor, padding: '3px 8px', borderRadius: '4px' }}>CHOSEN</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Pricing & Quantity */}
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: `2px solid ${accentColor}20`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '4px' }}>Total Price:</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: accentColor }}>${totalPrice}</div>
                <div style={{ fontSize: '0.75rem', color: accentColor, fontWeight: '700', marginTop: '4px' }}>💰 You save {bundle.savings}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '8px' }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: accentColor,
                    fontWeight: '700',
                  }}
                >
                  −
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '700', color: '#333' }}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: accentColor,
                    fontWeight: '700',
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="btn"
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: accentColor,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: isAdding ? 'loading' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isAdding ? 0.8 : 1,
              transform: isAdding ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            {isAdding ? '⏳ Adding...' : `🛒 Add to Cart - $${totalPrice}`}
          </button>
        </div>
      </div>
    </div>
  )
}
