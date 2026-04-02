import { fallbackIcon } from '@/utils/fallbackIcon'

export function Footer({ brand }) {
  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div>
          <div className="brand footerBrand">
            <span className="brandMark" aria-hidden="true">
              <img
                className="brandLogoImg"
                src={brand.logoSrc}
                alt=""
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = fallbackIcon
                }}
              />
            </span>
            <span className="brandName">{brand.nameFooter}</span>
          </div>
          <p className="muted">
            When life gives you lemons, sell them and buy pizza. Pizza with
            a slice of Heaven on Every Plate.
          </p>
        </div>

        <div className="footerCols">
          <div className="footerCol">
            <div className="footerTitle">Product</div>
            <a href="#menu">Menu</a>
            <a href="#visit">Pickup</a>
            <a href="#visit">Delivery</a>
          </div>
          <div className="footerCol">
            <div className="footerTitle">Company</div>
            <a href="#about">About</a>
            <a href="#reviews">Reviews</a>
            <a href="#visit">Contact</a>
          </div>
        </div>
      </div>

      <div className="container footerBottom">
        <span className="muted">© {new Date().getFullYear()} {brand.nameTop}</span>
        <span className="muted">Baked fresh daily</span>
      </div>
    </footer>
  )
}
