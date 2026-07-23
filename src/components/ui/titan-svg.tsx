export function TitanSvg() {
  return (
    <div 
      style={{
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.08,
        pointerEvents: 'none'
      }}
    >
      <svg 
        viewBox="0 0 800 600" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="var(--text-primary)">
          {/* Stylized Colossal Titan Silhouette */}
          <path d="M400 50 C250 50, 150 200, 200 400 L250 550 L550 550 L600 400 C650 200, 550 50, 400 50 Z" />
          <path d="M280 250 Q320 230, 350 260 Q320 280, 280 250 Z" fill="var(--bg-primary)" />
          <path d="M520 250 Q480 230, 450 260 Q480 280, 520 250 Z" fill="var(--bg-primary)" />
          {/* Muscle striations */}
          <path d="M300 150 Q400 100, 500 150" stroke="var(--bg-primary)" strokeWidth="8" fill="none" />
          <path d="M250 350 Q400 450, 550 350" stroke="var(--bg-primary)" strokeWidth="12" fill="none" />
          <path d="M350 450 L350 550 M450 450 L450 550 M400 480 L400 550" stroke="var(--bg-primary)" strokeWidth="6" fill="none" />
          {/* Teeth */}
          <path d="M300 420 L500 420 M320 400 L320 440 M360 400 L360 440 M400 400 L400 440 M440 400 L440 440 M480 400 L480 440" stroke="var(--bg-primary)" strokeWidth="6" fill="none" />
        </g>
      </svg>
    </div>
  );
}
