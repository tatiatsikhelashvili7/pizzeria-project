import './cart.css'

export function CartPanel({
  isOpen,
  onClose,
  items,
  count,
  total,
  onClear,
  onSetQty,
}) {
  if (!isOpen) return null

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
            <button class="btn btnPrimary" type="button" disabled={items.length === 0}>
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

