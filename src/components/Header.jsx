import { fallbackIcon } from '../utils/fallbackIcon'

export function Header({ brand, cartCount, isCartOpen, onOpenCart }) {
  return (
    <header class="header">
      <div class="container nav">
        <div class="brand">
          <span class="brandMark" aria-hidden="true">
            <img
              class="brandLogoImg"
              src={brand.logoSrc}
              alt=""
              loading="eager"
              onError={(e) => {
                e.currentTarget.src = fallbackIcon
              }}
            />
          </span>
          <span class="brandName">{brand.nameTop}</span>
        </div>

        <nav class="links" aria-label="Primary">
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
          <a href="#visit">Visit</a>
        </nav>

        <button
          class="btn btnPrimary cartBtn"
          type="button"
          onClick={onOpenCart}
          aria-haspopup="dialog"
          aria-expanded={isCartOpen}
        >
          Cart
          {cartCount > 0 ? <span class="cartBadge">{cartCount}</span> : null}
        </button>
      </div>
    </header>
  )
}

