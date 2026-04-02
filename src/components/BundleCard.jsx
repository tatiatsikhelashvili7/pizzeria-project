export function BundleCard({ bundle, onAddToCart, onCustomize }) {
  const getColorScheme = () => {
    if (bundle.isToday) return { accent: '#ff6b35' }
    if (bundle.id === 1) return { accent: '#0066ff' }
    return { accent: '#e91e63' }
  }

  const colors = getColorScheme()

  return (
    <article style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      border: '1px solid #e8e8e8',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'
    }}>
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '180px' }}>
        <img 
          src={bundle.image} 
          alt={bundle.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        
        {bundle.isToday && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: colors.accent,
            color: 'white',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: '0.65rem',
            fontWeight: '800',
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(255, 107, 53, 0.95)',
          }}>
            ⭐ TODAY'S DEAL
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{
        padding: '12px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{
            margin: '0 0 2px 0',
            fontSize: '0.95rem',
            fontWeight: '700',
            color: '#1a1a1a',
          }}>
            {bundle.emoji} {bundle.name}
          </h3>
          <p style={{
            margin: '0',
            fontSize: '0.7rem',
            color: '#888',
            fontWeight: '400',
          }}>
            {bundle.desc}
          </p>
        </div>

        {/* Items preview */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginBottom: '8px',
        }}>
          {bundle.items.slice(0, 3).map((item, i) => (
            <span key={i} style={{
              fontSize: '0.65rem',
              backgroundColor: '#f5f5f5',
              padding: '3px 7px',
              borderRadius: '4px',
              color: '#555',
              fontWeight: '500',
              whiteSpace: 'nowrap',
            }}>
              {item.replace(' (Any)', '').split('•')[0].trim()}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '8px',
          borderTop: '1px solid #f0f0f0',
        }}>
          <div>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: '900',
              color: colors.accent,
            }}>
              {bundle.price}
            </div>
            <div style={{
              fontSize: '0.65rem',
              color: '#0066ff',
              fontWeight: '600',
            }}>
              Save {bundle.savings}
            </div>
          </div>
          <button
            className="btn btnSmall"
            type="button"
            style={{ 
              backgroundColor: colors.accent, 
              color: 'white',
              width: 'auto',
              padding: '8px 16px',
              fontSize: '0.85rem',
              fontWeight: '700',
            }}
            onClick={() => onCustomize(bundle)}
          >
            Choose
          </button>
        </div>
      </div>
    </article>
  )
}
