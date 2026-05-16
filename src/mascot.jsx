// Curio — the mascot character.
// A small floating cosmic blob with glowing eyes and a star antenna.

export function Curio({ size = 80, mood = 'happy', glow = true, style = {} }) {
  const eye = (cx, cy, r = 4) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#FCD34D" />
      <circle cx={cx + r * 0.3} cy={cy - r * 0.3} r={r * 0.35} fill="#FFF7B0" />
    </g>
  );
  const moodEyes = () => {
    if (mood === 'thinking') return (
      <g>
        {eye(38, 56, 3.5)}
        <path d="M58 56 Q63 53 68 56" stroke="#FCD34D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    );
    if (mood === 'wow') return (
      <g>
        <circle cx={38} cy={56} r={5} fill="#FCD34D" />
        <circle cx={63} cy={56} r={5} fill="#FCD34D" />
        <circle cx={39} cy={55} r={1.5} fill="#FFF7B0" />
        <circle cx={64} cy={55} r={1.5} fill="#FFF7B0" />
      </g>
    );
    if (mood === 'sleep') return (
      <g>
        <path d="M33 56 Q38 53 43 56" stroke="#FCD34D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M58 56 Q63 53 68 56" stroke="#FCD34D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    );
    return (
      <g>
        {eye(38, 56)}
        {eye(63, 56)}
      </g>
    );
  };

  const smile = () => {
    if (mood === 'wow') return <ellipse cx={50} cy={72} rx={4} ry={5} fill="#0A0A1F" />;
    if (mood === 'sleep') return <line x1={45} y1={72} x2={55} y2={72} stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />;
    return <path d="M42 70 Q50 76 58 70" stroke="#FCD34D" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  };

  return (
    <div style={{ width: size, height: size, position: 'relative', ...style }}>
      {glow && (
        <div style={{
          position: 'absolute', inset: '10%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 65%)',
          filter: 'blur(8px)',
        }} />
      )}
      <svg viewBox="0 0 100 110" width={size} height={size * 1.1} style={{ position: 'absolute', top: 0, left: 0, animation: 'curio-bob 3s ease-in-out infinite' }}>
        <defs>
          <radialGradient id="curio-body" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#3D2D7A" />
            <stop offset="60%" stopColor="#1F1450" />
            <stop offset="100%" stopColor="#0F0830" />
          </radialGradient>
          <radialGradient id="curio-star" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFF7B0" />
            <stop offset="50%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
        </defs>
        <line x1={50} y1={28} x2={50} y2={12} stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(50 8)">
          <path d="M0 -6 L1.7 -1.7 L6 0 L1.7 1.7 L0 6 L-1.7 1.7 L-6 0 L-1.7 -1.7 Z" fill="url(#curio-star)" />
        </g>
        <path d="M20 55 Q20 28 50 28 Q80 28 80 55 Q80 88 50 88 Q20 88 20 55 Z" fill="url(#curio-body)" />
        <path d="M44 30 Q48 22 50 30 Q52 22 56 30 Z" fill="#7C3AED" />
        <circle cx={28} cy={66} r={3} fill="#FF3B9A" opacity={0.4} />
        <circle cx={72} cy={66} r={3} fill="#FF3B9A" opacity={0.4} />
        {moodEyes()}
        {smile()}
        <ellipse cx={38} cy={88} rx={6} ry={3} fill="#0F0830" />
        <ellipse cx={62} cy={88} rx={6} ry={3} fill="#0F0830" />
      </svg>
    </div>
  );
}

export function CurioMini({ size = 28, color = '#FF3B9A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx={20} cy={20} r={16} fill={color} />
      <circle cx={15} cy={18} r={2.5} fill="#0A0A1F" />
      <circle cx={25} cy={18} r={2.5} fill="#0A0A1F" />
      <path d="M14 25 Q20 30 26 25" stroke="#0A0A1F" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
