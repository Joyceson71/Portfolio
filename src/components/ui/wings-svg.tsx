export function WingsSvg() {
  return (
    <div 
      style={{
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.15,
        pointerEvents: 'none',
        margin: '2rem 0'
      }}
    >
      <svg 
        viewBox="0 0 500 500" 
        style={{ 
          width: '200px', 
          height: '200px', 
          objectFit: 'contain',
          animation: 'spin 20s linear infinite'
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            @keyframes spin {
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <g fill="none" stroke="var(--accent-bronze)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          {/* Stylized shield */}
          <path d="M250 50 L400 100 L400 300 C400 400, 250 450, 250 450 C250 450, 100 400, 100 300 L100 100 Z" />
          
          {/* Stylized left wing */}
          <path d="M240 400 L150 250 L200 150 L240 220" />
          <path d="M220 350 L120 220 L160 160" />
          
          {/* Stylized right wing */}
          <path d="M260 400 L350 250 L300 150 L260 220" />
          <path d="M280 350 L380 220 L340 160" />
          
          {/* Center overlap */}
          <path d="M210 250 L290 250 L250 180 Z" />
        </g>
      </svg>
    </div>
  );
}
