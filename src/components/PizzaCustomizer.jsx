import { useState, useMemo, useEffect } from 'preact/hooks'
import { PIZZA_SIZES, TOPPINGS, EXTRAS } from '@/data/customization'
import './PizzaCustomizer.css'

export function PizzaCustomizer({ isOpen, pizza, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('medium')
  const [selectedToppings, setSelectedToppings] = useState([])
  const [selectedExtras, setSelectedExtras] = useState([])

  useEffect(() => {
    setSelectedSize('medium')
    setSelectedToppings([])
    setSelectedExtras([])
  }, [pizza])

  if (!isOpen || !pizza) return null

  const basePriceNum = Number(String(pizza.price).replace(/[^0-9.]/g, ''))
  const sizePrice = PIZZA_SIZES.find((s) => s.id === selectedSize)?.basePrice || 0
  const toppingsCost = selectedToppings.reduce(
    (sum, toppingId) =>
      sum + (TOPPINGS.find((t) => t.id === toppingId)?.price || 0),
    0
  )
  const extrasCost = selectedExtras.reduce(
    (sum, extraId) =>
      sum + (EXTRAS.find((e) => e.id === extraId)?.price || 0),
    0
  )
  const totalPrice = basePriceNum + sizePrice + toppingsCost + extrasCost

  function toggleTopping(toppingId) {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    )
  }

  function toggleExtra(extraId) {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    )
  }

  function handleAddToCart() {
    const customization = {
      size: selectedSize,
      toppings: selectedToppings.map(
        (id) => TOPPINGS.find((t) => t.id === id)?.label
      ),
      extras: selectedExtras.map(
        (id) => EXTRAS.find((e) => e.id === id)?.label
      ),
    }

    const cartItem = {
      ...pizza,
      price: `$${totalPrice.toFixed(2)}`,
      customization,
      qty: 1,
    }

    onAddToCart(cartItem)
    onClose()
  }

  return (
    <div className="customizerOverlay" onClick={onClose}>
      <div className="customizerModal" onClick={(e) => e.stopPropagation()}>
        <div className="customizerHeader">
          <h2>Customize Your {pizza.name}</h2>
          <button
            className="customizerClose"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="customizerBody">
          <div className="customizerSection">
            <h3>Size</h3>
            <div className="sizeOptions">
              {PIZZA_SIZES.map((size) => (
                <label key={size.id} className="sizeOption">
                  <input
                    type="radio"
                    name="size"
                    value={size.id}
                    checked={selectedSize === size.id}
                    onChange={() => setSelectedSize(size.id)}
                  />
                  <span className="sizeLabel">{size.label}</span>
                  {size.basePrice > 0 && (
                    <span className="sizePrice">+${size.basePrice}</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="customizerSection">
            <h3>Extra Toppings</h3>
            <div className="toppingGrid">
              {TOPPINGS.map((topping) => (
                <label key={topping.id} className="toppingCheckbox">
                  <input
                    type="checkbox"
                    checked={selectedToppings.includes(topping.id)}
                    onChange={() => toggleTopping(topping.id)}
                  />
                  <span className="toppingLabel">{topping.label}</span>
                  <span className="toppingPrice">+${topping.price}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="customizerSection">
            <h3>Add-ons</h3>
            <div className="extraGrid">
              {EXTRAS.map((extra) => (
                <label key={extra.id} className="extraCheckbox">
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.id)}
                    onChange={() => toggleExtra(extra.id)}
                  />
                  <span className="extraLabel">{extra.label}</span>
                  <span className="extraPrice">${extra.price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="customizerFooter">
          <div className="customizerPrice">
            Total: <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button
            className="customizerAddBtn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
