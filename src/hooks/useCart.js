import { useMemo, useState } from 'preact/hooks'

function priceToNumber(price) {
  const n = Number(String(price).replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

export function useCart() {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState(() => [])

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  )

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.qty * priceToNumber(item.price),
        0
      ),
    [items]
  )

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function clear() {
    setItems([])
  }

  function add(menuItem) {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.name === menuItem.name)
      if (idx === -1) return [...prev, { ...menuItem, qty: 1 }]
      return prev.map((x, i) => (i === idx ? { ...x, qty: x.qty + 1 } : x))
    })
    open()
  }

  function setQty(name, nextQty) {
    const qty = Math.max(0, Math.min(99, nextQty))
    setItems((prev) =>
      qty === 0
        ? prev.filter((x) => x.name !== name)
        : prev.map((x) => (x.name === name ? { ...x, qty } : x))
    )
  }

  return {
    isOpen,
    items,
    count,
    total,
    open,
    close,
    clear,
    add,
    setQty,
  }
}

