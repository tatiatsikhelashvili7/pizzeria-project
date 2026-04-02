import { useEffect, useState } from 'preact/hooks'

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
    return <SuccessPhase lastOrderId={lastOrderId} onClose={onClose} />
  }

  if (phase === 'checkout') {
    return (
      <CheckoutPhase
        items={items}
        total={total}
        orderType={orderType}
        onOrderTypeChange={setOrderType}
        onSubmit={handleSubmitOrder}
        onBack={() => setPhase('cart')}
        onClose={onClose}
      />
    )
  }

  return (
    <CartPhase
      items={items}
      count={count}
      total={total}
      onSetQty={onSetQty}
      onClear={onClear}
      onCheckout={handleCheckoutClick}
      onClose={onClose}
    />
  )
}

function CartPhase({ items, count, total, onSetQty, onClear, onCheckout, onClose }) {
  return (
    <div
      className="cartOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose()
      }}
    >
      <aside className="cartPanel">
        <div className="cartHeader">
          <div>
            <div className="cartTitle">Your cart</div>
            <div className="cartSub muted">
              {count === 0
                ? 'No items yet.'
                : `${count} item${count === 1 ? '' : 's'} in cart`}
            </div>
          </div>
          <button className="iconBtn" type="button" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="cartBody">
          {items.length === 0 ? (
            <div className="cartEmpty">
              <div className="cartEmptyTitle">Add a pizza to get started.</div>
              <a className="btn btnPrimary" href="#menu" onClick={onClose}>
                Browse menu
              </a>
            </div>
          ) : (
            <ul className="cartList">
              {items.map((item) => (
                <CartItem
                  key={item.name}
                  item={item}
                  onSetQty={onSetQty}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="cartFooter">
          <div className="cartTotalRow">
            <span className="muted">Total</span>
            <span className="cartTotal">${total.toFixed(2)}</span>
          </div>
          <div className="cartActions">
            <button
              className="btn btnGhost"
              type="button"
              onClick={onClear}
              disabled={items.length === 0}
            >
              Clear
            </button>
            <button
              className="btn btnPrimary"
              type="button"
              disabled={items.length === 0}
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

function CartItem({ item, onSetQty }) {
  const hasCustomization = item.customization && (
    item.customization.toppings?.length > 0 ||
    item.customization.extras?.length > 0
  )

  return (
    <li className="cartItem">
      <div className="cartItemTop">
        <div className="cartItemName">{item.name}</div>
        <div className="cartItemPrice">{item.price}</div>
      </div>
      <div className="cartItemDesc muted">{item.desc}</div>
      
      {hasCustomization && (
        <div className="cartItemCustomization">
          {item.customization.toppings && item.customization.toppings.length > 0 && (
            <div className="customizationRow">
              <span className="customizationLabel">Toppings:</span>
              <span className="customizationValue">{item.customization.toppings.join(', ')}</span>
            </div>
          )}
          {item.customization.extras && item.customization.extras.length > 0 && (
            <div className="customizationRow">
              <span className="customizationLabel">Extras:</span>
              <span className="customizationValue">{item.customization.extras.join(', ')}</span>
            </div>
          )}
        </div>
      )}
      
      <div className="cartItemControls">
        <div className="qty">
          <button
            className="qtyBtn"
            type="button"
            onClick={() => onSetQty(item.name, item.qty - 1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <div className="qtyValue" aria-label="Quantity">
            {item.qty}
          </div>
          <button
            className="qtyBtn"
            type="button"
            onClick={() => onSetQty(item.name, item.qty + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          className="linkBtn"
          type="button"
          onClick={() => onSetQty(item.name, 0)}
        >
          Remove
        </button>
      </div>
    </li>
  )
}

function CheckoutPhase({
  items,
  total,
  orderType,
  onOrderTypeChange,
  onSubmit,
  onBack,
  onClose,
}) {
  return (
    <div
      className="cartOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkoutTitle"
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose()
      }}
    >
      <aside className="cartPanel cartPanelCheckout">
        <div className="cartHeader">
          <div>
            <div className="cartTitle" id="checkoutTitle">
              Checkout
            </div>
            <div className="cartSub muted">Review and place your order</div>
          </div>
          <button className="iconBtn" type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="cartBody checkoutBody">
          <div className="checkoutSummary">
            <div className="checkoutSummaryTitle">Your order</div>
            <ul className="checkoutSummaryList">
              {items.map((item) => (
                <li className="checkoutSummaryRow" key={item.name}>
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>
                    ${(priceToNumber(item.price) * item.qty).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="checkoutSummaryTotal">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <CheckoutForm
            orderType={orderType}
            onOrderTypeChange={onOrderTypeChange}
            onSubmit={onSubmit}
            onBack={onBack}
          />
        </div>
      </aside>
    </div>
  )
}

function CheckoutForm({ orderType, onOrderTypeChange, onSubmit, onBack }) {
  return (
    <form className="checkoutForm" onSubmit={onSubmit}>
      <label className="checkoutField">
        <span className="checkoutLabel">Full name</span>
        <input
          className="checkoutInput"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
        />
      </label>
      <label className="checkoutField">
        <span className="checkoutLabel">Email</span>
        <input
          className="checkoutInput"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>
      <label className="checkoutField">
        <span className="checkoutLabel">Phone</span>
        <input
          className="checkoutInput"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="Your phone number"
        />
      </label>
      <fieldset className="checkoutFieldset">
        <legend className="checkoutLabel">Order type</legend>
        <label className="checkoutRadio">
          <input
            type="radio"
            name="orderType"
            value="pickup"
            checked={orderType === 'pickup'}
            onChange={() => onOrderTypeChange('pickup')}
          />
          Pickup
        </label>
        <label className="checkoutRadio">
          <input
            type="radio"
            name="orderType"
            value="delivery"
            checked={orderType === 'delivery'}
            onChange={() => onOrderTypeChange('delivery')}
          />
          Delivery
        </label>
      </fieldset>
      {orderType === 'delivery' ? (
        <p className="checkoutHint muted">
          Delivery orders require a complete address.
        </p>
      ) : null}
      {orderType === 'delivery' ? (
        <label className="checkoutField">
          <span className="checkoutLabel">Delivery address</span>
          <textarea
            className="checkoutTextarea"
            name="address"
            required
            rows="3"
            placeholder="Street, building, apartment, city"
            autoComplete="street-address"
          />
        </label>
      ) : null}
      <label className="checkoutField">
        <span className="checkoutLabel">Notes</span>
        <textarea
          className="checkoutTextarea"
          name="notes"
          rows="2"
          placeholder="Allergies, gate code, etc."
        />
      </label>
      <div className="checkoutFormActions">
        <button className="btn btnGhost" type="button" onClick={onBack}>
          Back
        </button>
        <button className="btn btnPrimary" type="submit">
          Place order
        </button>
      </div>
    </form>
  )
}

function SuccessPhase({ lastOrderId, onClose }) {
  return (
    <div
      className="cartOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkoutSuccessTitle"
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose()
      }}
    >
      <aside className="cartPanel cartPanelCheckout cartPanelSuccess">
        <div className="cartHeader">
          <div>
            <div className="cartTitle" id="checkoutSuccessTitle">
              Order confirmed
            </div>
            <div className="cartSub muted">
              Thank you — we'll start preparing your pizzas.
            </div>
          </div>
          <button className="iconBtn" type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="cartBody checkoutSuccessBody">
          <p className="checkoutOrderId">
            Order <strong>#{lastOrderId}</strong>
          </p>
          <p className="muted checkoutSuccessHint">
            This is a demo checkout. No payment was processed. In a real app, you'd get an
            email or SMS with pickup time.
          </p>
          <button className="btn btnPrimary checkoutDoneBtn" type="button" onClick={onClose}>
            Done
          </button>
        </div>
      </aside>
    </div>
  )
}
