export function MenuCard({ item, qty, onAddToCart, onSetQty, onCustomize }) {
  function vegExtraTag(pizza) {
    if (!pizza.isVeg) return null
    if (pizza.category === 'Vegetarian') return null
    return 'Plant-based'
  }

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
              aria-label="Add one to cart"
            >
              +
            </button>
          </div>
          <button
            className="btn btnSmall btnDanger"
            type="button"
            onClick={() => onSetQty(item.name, 0)}
            aria-label="Remove from cart"
          >
            ✕
          </button>
        </div>
      )}
    </article>
  )
}
