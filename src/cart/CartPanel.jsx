import { useEffect, useState } from 'preact/hooks'
import './cart.css'

function priceToNumber(price) {
  const n = Number(String(price).replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

export function CartPanel({
  isOpen,
  onClose,
  items,
  count,
  total,
  onClear,
  onSetQty,
  onCheckout,
}) {
  const [phase, setPhase] = useState('cart')
  const [lastOrderId, setLastOrderId] = useState('')
  const [orderType, setOrderType] = useState('pickup')

  useEffect(() => {
    if (isOpen) {
      setPhase('cart')
      setOrderType('pickup')
    }
  }, [isOpen])

  if (!isOpen) return null

  function handleCheckoutClick() {
    setOrderType('pickup')
    setPhase('checkout')
  }

  function handleSubmitOrder(event) {
    event.preventDefault()
    const form = event.currentTarget
    const fd = new FormData(form)
    const orderId = Math.random().toString(36).slice(2, 10).toUpperCase()
    const address =
      orderType === 'delivery'
        ? String(fd.get('address') || '').trim()
        : ''
    const payload = {
      orderId,
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      orderType,
      address,
      notes: String(fd.get('notes') || '').trim(),
      items: items.map((i) => ({ ...i })),
      total,
    }
    if (onCheckout) {
      onCheckout(payload)
    }
    setLastOrderId(orderId)
    setPhase('success')
  }

  if (phase === 'success') {
    return (
      <div
        class="cartOverlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkoutSuccessTitle"
        onClick={(e) => {
          if (e.currentTarget === e.target) onClose()
        }}
      >
        <aside class="cartPanel cartPanelCheckout cartPanelSuccess">
          <div class="cartHeader">
            <div>
              <div class="cartTitle" id="checkoutSuccessTitle">
                Order confirmed
              </div>
              <div class="cartSub muted">
                Thank you — we’ll start preparing your pizzas.
              </div>
            </div>
            <button class="iconBtn" type="button" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
          <div class="cartBody checkoutSuccessBody">
            <p class="checkoutOrderId">
              Order <strong>#{lastOrderId}</strong>
            </p>
            <p class="muted checkoutSuccessHint">
              This is a demo checkout. No payment was processed. In a real app, you’d get an
              email or SMS with pickup time.
            </p>
            <button class="btn btnPrimary checkoutDoneBtn" type="button" onClick={onClose}>
              Done
            </button>
          </div>
        </aside>
      </div>
    )
  }

  if (phase === 'checkout') {
    return (
      <div
        class="cartOverlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkoutTitle"
        onClick={(e) => {
          if (e.currentTarget === e.target) onClose()
        }}
      >
        <aside class="cartPanel cartPanelCheckout">
          <div class="cartHeader">
            <div>
              <div class="cartTitle" id="checkoutTitle">
                Checkout
              </div>
              <div class="cartSub muted">Review and place your order</div>
            </div>
            <button class="iconBtn" type="button" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>

          <div class="cartBody checkoutBody">
            <div class="checkoutSummary">
              <div class="checkoutSummaryTitle">Your order</div>
              <ul class="checkoutSummaryList">
                {items.map((item) => (
                  <li class="checkoutSummaryRow" key={item.name}>
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>
                      ${(priceToNumber(item.price) * item.qty).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div class="checkoutSummaryTotal">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <form class="checkoutForm" onSubmit={handleSubmitOrder}>
              <label class="checkoutField">
                <span class="checkoutLabel">Full name</span>
                <input
                  class="checkoutInput"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                />
              </label>
              <label class="checkoutField">
                <span class="checkoutLabel">Email</span>
                <input
                  class="checkoutInput"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
              <label class="checkoutField">
                <span class="checkoutLabel">Phone</span>
                <input
                  class="checkoutInput"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="Your phone number"
                />
              </label>
              <fieldset class="checkoutFieldset">
                <legend class="checkoutLabel">Order type</legend>
                <label class="checkoutRadio">
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={orderType === 'pickup'}
                    onChange={() => setOrderType('pickup')}
                  />
                  Pickup
                </label>
                <label class="checkoutRadio">
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={orderType === 'delivery'}
                    onChange={() => setOrderType('delivery')}
                  />
                  Delivery
                </label>
              </fieldset>
              {orderType === 'delivery' ? (
                <p class="checkoutHint muted">
                  Delivery orders require a complete address.
                </p>
              ) : null}
              {orderType === 'delivery' ? (
                <label class="checkoutField">
                  <span class="checkoutLabel">Delivery address</span>
                  <textarea
                    class="checkoutTextarea"
                    name="address"
                    required
                    rows="3"
                    placeholder="Street, building, apartment, city"
                    autoComplete="street-address"
                  />
                </label>
              ) : null}
              <label class="checkoutField">
                <span class="checkoutLabel">Notes</span>
                <textarea
                  class="checkoutTextarea"
                  name="notes"
                  rows="2"
                  placeholder="Allergies, gate code, etc."
                />
              </label>
              <div class="checkoutFormActions">
                <button
                  class="btn btnGhost"
                  type="button"
                  onClick={() => setPhase('cart')}
                >
                  Back
                </button>
                <button class="btn btnPrimary" type="submit">
                  Place order
                </button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    )
  }

  return (
    <div
      class="cartOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose()
      }}
    >
      <aside class="cartPanel">
        <div class="cartHeader">
          <div>
            <div class="cartTitle">Your cart</div>
            <div class="cartSub muted">
              {count === 0
                ? 'No items yet.'
                : `${count} item${count === 1 ? '' : 's'} in cart`}
            </div>
          </div>
          <button class="iconBtn" type="button" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div class="cartBody">
          {items.length === 0 ? (
            <div class="cartEmpty">
              <div class="cartEmptyTitle">Add a pizza to get started.</div>
              <a class="btn btnPrimary" href="#menu" onClick={onClose}>
                Browse menu
              </a>
            </div>
          ) : (
            <ul class="cartList">
              {items.map((item) => (
                <li class="cartItem" key={item.name}>
                  <div class="cartItemTop">
                    <div class="cartItemName">{item.name}</div>
                    <div class="cartItemPrice">{item.price}</div>
                  </div>
                  <div class="cartItemDesc muted">{item.desc}</div>
                  <div class="cartItemControls">
                    <div class="qty">
                      <button
                        class="qtyBtn"
                        type="button"
                        onClick={() => onSetQty(item.name, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <div class="qtyValue" aria-label="Quantity">
                        {item.qty}
                      </div>
                      <button
                        class="qtyBtn"
                        type="button"
                        onClick={() => onSetQty(item.name, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button class="linkBtn" type="button" onClick={() => onSetQty(item.name, 0)}>
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
            <span class="cartTotal">${total.toFixed(2)}</span>
          </div>
          <div class="cartActions">
            <button class="btn btnGhost" type="button" onClick={onClear} disabled={items.length === 0}>
              Clear
            </button>
            <button
              class="btn btnPrimary"
              type="button"
              disabled={items.length === 0}
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
