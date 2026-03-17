import { fallbackIcon } from '../utils/fallbackIcon'

export function Footer({ brand }) {
  return (
    <footer class="footer">
      <div class="container footerGrid">
        <div>
          <div class="brand footerBrand">
            <span class="brandMark" aria-hidden="true">
              <img
                class="brandLogoImg"
                src={brand.logoSrc}
                alt=""
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = fallbackIcon
                }}
              />
            </span>
            <span class="brandName">{brand.nameFooter}</span>
          </div>
          <p class="muted">
            When life gives you lemons, sell them and buy pizza. pizza with
            slice of Heaven on Every Plate.
          </p>
        </div>

        <div class="footerCols">
          <div class="footerCol">
            <div class="footerTitle">Product</div>
            <a href="#menu">Menu</a>
            <a href="#visit">Pickup</a>
            <a href="#visit">Delivery</a>
          </div>
          <div class="footerCol">
            <div class="footerTitle">Company</div>
            <a href="#about">About</a>
            <a href="#reviews">Reviews</a>
            <a href="#visit">Contact</a>
          </div>
        </div>
      </div>

      <div class="container footerBottom">
        <span class="muted">© {new Date().getFullYear()} {brand.nameTop}</span>
        <span class="muted">Baked fresh daily</span>
      </div>
    </footer>
  )
}

