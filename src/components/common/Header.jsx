import { fallbackIcon } from '@/utils/fallbackIcon'
import { useLocation } from 'wouter'

export function Header({ brand, cartCount, isCartOpen, onOpenCart }) {
  const [, setLocation] = useLocation()

  const handleNavClick = (path) => {
    setLocation(path)
  }

  return (
    <header className="header">
      <div className="container nav">
        <button
          className="brand"
          onClick={() => handleNavClick('/')}
          aria-label={`Visit ${brand.nameTop}`}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="brandMark" aria-hidden="true">
            <img
              className="brandLogoImg"
              src={brand.logoSrc}
              alt=""
              loading="eager"
              onError={(e) => {
                e.currentTarget.src = fallbackIcon
              }}
            />
          </span>
          <span className="brandName">{brand.nameTop}</span>
        </button>

        <nav className="links" aria-label="Primary">
          <button
            onClick={() => handleNavClick('/menu')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}
          >
            Menu
          </button>
          <button
            onClick={() => handleNavClick('/#about')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('/#reviews')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick('/#visit')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}
          >
            Visit
          </button>
        </nav>

        <button
          className="btn btnPrimary cartBtn"
          type="button"
          onClick={onOpenCart}
          aria-haspopup="dialog"
          aria-expanded={isCartOpen}
        >
          <span className="cartBtnEmoji" aria-hidden="true">
            🛒
          </span>
          <span>Cart</span>
          {cartCount > 0 ? <span className="cartBadge">{cartCount}</span> : null}
        </button>
      </div>
    </header>
  )
}
