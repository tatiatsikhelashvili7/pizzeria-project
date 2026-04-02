import { CATEGORIES } from '@/data/menuData'

export function MenuFilter({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  showSpicy,
  onSpicyChange,
  showVeg,
  onVegChange,
  showPopular,
  onPopularChange,
}) {
  return (
    <div className="container menuFilters">
      <input
        className="menuSearch"
        type="search"
        placeholder="Search by name or ingredient..."
        value={searchQuery}
        onInput={(e) => onSearchChange(e.currentTarget.value)}
      />

      <select
        className="menuSelect"
        value={category}
        onChange={(e) => onCategoryChange(e.currentTarget.value)}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <label className="menuCheck">
        <input
          type="checkbox"
          checked={showSpicy}
          onChange={(e) => onSpicyChange(e.currentTarget.checked)}
        />
        Spicy
      </label>

      <label className="menuCheck">
        <input
          type="checkbox"
          checked={showVeg}
          onChange={(e) => onVegChange(e.currentTarget.checked)}
        />
        Vegetarian
      </label>

      <label className="menuCheck">
        <input
          type="checkbox"
          checked={showPopular}
          onChange={(e) => onPopularChange(e.currentTarget.checked)}
        />
        Popular
      </label>
    </div>
  )
}
