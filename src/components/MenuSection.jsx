export function MenuSection({ menu, onAddToCart }) {
  return (
    <section id="menu" class="section">
      <div class="container sectionHead">
        <h2>House favorites</h2>
        <p>Start here—three signatures our guests come back for.</p>
      </div>

      <div class="container menuGrid">
        {menu.map((item) => (
          <article class="menuItem" key={item.name}>
            <div class="menuTop">
              <h3>{item.name}</h3>
              <span class="price">{item.price}</span>
            </div>
            <p class="muted">{item.desc}</p>
            <button
              class="btn btnSmall"
              type="button"
              onClick={() => onAddToCart(item)}
            >
              Add to cart
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

