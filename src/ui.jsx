// Curio — shared UI primitives and subject definitions.

export const SUBJECTS = [
  { id: 'space',     name: 'Space',     color: '#22D3EE', emoji: '🛰', glyph: 'planet',  tagline: 'Stars, planets, gravity' },
  { id: 'biology',   name: 'Life',      color: '#34D399',              glyph: 'leaf',    tagline: 'Cells, animals, plants' },
  { id: 'chemistry', name: 'Chemistry', color: '#FF3B9A',              glyph: 'flask',   tagline: 'Atoms, reactions, matter' },
  { id: 'physics',   name: 'Physics',   color: '#8B5CF6',              glyph: 'atom',    tagline: 'Forces, energy, motion' },
  { id: 'math',      name: 'Math',      color: '#FCD34D',              glyph: 'sigma',   tagline: 'Logic, numbers, patterns' },
  { id: 'earth',     name: 'Earth',     color: '#60A5FA',              glyph: 'globe',   tagline: 'Climate, oceans, rocks' },
  { id: 'coding',    name: 'Coding',    color: '#FB923C',              glyph: 'bracket', tagline: 'Build games & websites' },
  { id: 'sound',     name: 'Sound',     color: '#F472B6',              glyph: 'wave',    tagline: 'Music, waves, hearing' },
];
export const SUBJECT_MAP = Object.fromEntries(SUBJECTS.map(s => [s.id, s]));

export function SubjectGlyph({ kind, color = '#fff', size = 28, stroke = 2.2 }) {
  const props = { stroke: color, strokeWidth: stroke, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (kind) {
    case 'planet':
      return <svg width={size} height={size} viewBox="0 0 32 32"><circle cx={16} cy={16} r={7} {...props} /><ellipse cx={16} cy={16} rx={13} ry={4} transform="rotate(-20 16 16)" {...props} /></svg>;
    case 'leaf':
      return <svg width={size} height={size} viewBox="0 0 32 32"><path d="M6 26 C10 10 22 6 26 6 C26 18 22 26 6 26 Z" {...props} /><path d="M6 26 L20 12" {...props} /></svg>;
    case 'flask':
      return <svg width={size} height={size} viewBox="0 0 32 32"><path d="M13 5v8L6 26a2 2 0 002 2h16a2 2 0 002-2L19 13V5" {...props} /><path d="M11 5h10" {...props} /><circle cx={14} cy={22} r={1.2} fill={color} /></svg>;
    case 'atom':
      return <svg width={size} height={size} viewBox="0 0 32 32"><circle cx={16} cy={16} r={2} fill={color} /><ellipse cx={16} cy={16} rx={11} ry={4} {...props} /><ellipse cx={16} cy={16} rx={11} ry={4} transform="rotate(60 16 16)" {...props} /><ellipse cx={16} cy={16} rx={11} ry={4} transform="rotate(-60 16 16)" {...props} /></svg>;
    case 'sigma':
      return <svg width={size} height={size} viewBox="0 0 32 32"><path d="M22 6H8l8 10-8 10h14" {...props} /></svg>;
    case 'globe':
      return <svg width={size} height={size} viewBox="0 0 32 32"><circle cx={16} cy={16} r={11} {...props} /><ellipse cx={16} cy={16} rx={5} ry={11} {...props} /><path d="M5 16h22" {...props} /></svg>;
    case 'bracket':
      return <svg width={size} height={size} viewBox="0 0 32 32"><path d="M11 8L4 16l7 8M21 8l7 8-7 8M18 6l-4 20" {...props} /></svg>;
    case 'wave':
      return <svg width={size} height={size} viewBox="0 0 32 32"><path d="M3 16q3-8 6 0t6 0t6 0t6 0t6 0" {...props} /></svg>;
    default:
      return null;
  }
}

export function IconChip({ subject, size = 44, radius = 12 }) {
  const s = typeof subject === 'string' ? SUBJECT_MAP[subject] : subject;
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 4px 16px ${s.color}40, inset 0 1px 0 rgba(255,255,255,0.25)`,
      flexShrink: 0,
    }}>
      <SubjectGlyph kind={s.glyph} color="#0A0A1F" size={size * 0.55} stroke={2.4} />
    </div>
  );
}

export function Icon({ name, size = 22, color = 'currentColor', strokeWidth = 2 }) {
  const p = { stroke: color, strokeWidth, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <><path d="M3 12L12 3l9 9" {...p}/><path d="M5 10v10h14V10" {...p}/></>,
    map: <><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" {...p}/><path d="M9 4v16M15 6v16" {...p}/></>,
    book: <><path d="M4 5a2 2 0 012-2h13v18H6a2 2 0 01-2-2V5z" {...p}/><path d="M4 19a2 2 0 012-2h13" {...p}/></>,
    user: <><circle cx={12} cy={8} r={4} {...p}/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" {...p}/></>,
    flame: <><path d="M12 3c0 4 5 5 5 11a5 5 0 11-10 0c0-3 2-4 2-7 0 0 3 1 3 4" {...p} fill="none"/></>,
    bolt: <><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round"/></>,
    star: <><path d="M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9l3-7z" {...p}/></>,
    check: <><path d="M5 12l4 4 10-10" {...p}/></>,
    chevright: <><path d="M9 6l6 6-6 6" {...p}/></>,
    chevleft: <><path d="M15 6l-6 6 6 6" {...p}/></>,
    chevdown: <><path d="M6 9l6 6 6-6" {...p}/></>,
    close: <><path d="M6 6l12 12M18 6L6 18" {...p}/></>,
    play: <><path d="M6 4l14 8-14 8V4z" stroke={color} strokeWidth={strokeWidth} fill={color} strokeLinejoin="round"/></>,
    pause: <><rect x={6} y={4} width={4} height={16} fill={color}/><rect x={14} y={4} width={4} height={16} fill={color}/></>,
    plus: <><path d="M12 5v14M5 12h14" {...p}/></>,
    search: <><circle cx={11} cy={11} r={6} {...p}/><path d="M16 16l4 4" {...p}/></>,
    settings: <><circle cx={12} cy={12} r={3} {...p}/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" {...p}/></>,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" {...p}/><path d="M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" {...p}/></>,
    lock: <><rect x={5} y={11} width={14} height={10} rx={2} {...p}/><path d="M8 11V8a4 4 0 018 0v3" {...p}/></>,
    clock: <><circle cx={12} cy={12} r={9} {...p}/><path d="M12 7v5l3 3" {...p}/></>,
    trophy: <><path d="M7 4h10v6a5 5 0 01-10 0V4z" {...p}/><path d="M5 4H3v3a3 3 0 003 3M19 4h2v3a3 3 0 01-3 3M9 19h6M12 15v4" {...p}/></>,
    heart: <><path d="M12 21s-8-5-8-11a4 4 0 018-2 4 4 0 018 2c0 6-8 11-8 11z" {...p}/></>,
    bell: <><path d="M6 16V11a6 6 0 0112 0v5l2 2H4l2-2zM10 20a2 2 0 004 0" {...p}/></>,
    arrowright: <><path d="M5 12h14M13 6l6 6-6 6" {...p}/></>,
    arrowleft: <><path d="M19 12H5M11 6l-6 6 6 6" {...p}/></>,
    grid: <><rect x={4} y={4} width={7} height={7} rx={1.5} {...p}/><rect x={13} y={4} width={7} height={7} rx={1.5} {...p}/><rect x={4} y={13} width={7} height={7} rx={1.5} {...p}/><rect x={13} y={13} width={7} height={7} rx={1.5} {...p}/></>,
    drag: <><circle cx={9} cy={6} r={1.5} fill={color}/><circle cx={15} cy={6} r={1.5} fill={color}/><circle cx={9} cy={12} r={1.5} fill={color}/><circle cx={15} cy={12} r={1.5} fill={color}/><circle cx={9} cy={18} r={1.5} fill={color}/><circle cx={15} cy={18} r={1.5} fill={color}/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24">{paths[name]}</svg>;
}

export function XPBar({ value = 0, max = 100, height = 10, label }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>
          <span>{label}</span>
          <span className="curio-mono">{value}/{max}</span>
        </div>
      )}
      <div style={{ height, background: 'var(--bg-card)', borderRadius: height, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: 'linear-gradient(90deg, #22D3EE, #8B5CF6, #FF3B9A)',
          borderRadius: height,
          boxShadow: '0 0 12px rgba(139,92,246,0.6)',
        }} />
      </div>
    </div>
  );
}

export function StreakChip({ days }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '6px 10px 6px 8px', borderRadius: 999,
      background: 'linear-gradient(135deg, #FB923C, #F472B6)',
      color: '#0A0A1F', fontWeight: 700, fontSize: 13,
      boxShadow: '0 2px 12px rgba(251,146,60,0.4)',
    }}>
      <Icon name="flame" size={16} color="#0A0A1F" strokeWidth={2.5} />
      <span className="curio-mono">{days}</span>
    </div>
  );
}

export function Pill({ children, color = 'var(--bg-card)', textColor = 'var(--text)', size = 'md', icon, onClick, style = {} }) {
  const pad = size === 'sm' ? '6px 10px' : '10px 14px';
  const fs = size === 'sm' ? 12 : 14;
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: pad, borderRadius: 999,
      background: color, color: textColor, border: 'none',
      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: fs,
      cursor: 'pointer', ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

export function Card({ children, style = {}, glow, onClick, padding = 16, radius = 20 }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--bg-card)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--border)',
      borderRadius: radius,
      padding,
      position: 'relative',
      boxShadow: glow,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>
      {children}
    </div>
  );
}

export function Starfield({ density = 40, seed = 1, nebula = true }) {
  const rand = (i) => {
    const x = Math.sin((i + 1) * seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };
  const stars = Array.from({ length: density }, (_, i) => ({
    x: rand(i) * 100,
    y: rand(i + 100) * 100,
    r: rand(i + 200) * 1.4 + 0.3,
    delay: rand(i + 300) * 3,
    color: rand(i + 400) > 0.85 ? '#FCD34D' : rand(i + 400) > 0.7 ? '#22D3EE' : '#fff',
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {nebula && (
        <>
          <div style={{ position: 'absolute', top: '-10%', left: '-20%', width: '70%', height: '60%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.35), transparent 65%)', filter: 'blur(20px)' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-15%', width: '60%', height: '50%',
            background: 'radial-gradient(circle, rgba(255,59,154,0.25), transparent 65%)', filter: 'blur(20px)' }} />
        </>
      )}
      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.x + '%', top: s.y + '%',
          width: s.r * 2, height: s.r * 2, borderRadius: '50%',
          background: s.color, opacity: 0.8,
          boxShadow: `0 0 ${s.r * 4}px ${s.color}`,
          animation: `curio-twinkle ${2 + s.delay}s ease-in-out ${s.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

export function TabBar({ active = 'home', onChange = () => {} }) {
  const tabs = [
    { id: 'home',    icon: 'home', label: 'Home' },
    { id: 'map',     icon: 'map',  label: 'Journey' },
    { id: 'library', icon: 'grid', label: 'Explore' },
    { id: 'profile', icon: 'user', label: 'You' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 14, left: 14, right: 14,
      background: 'rgba(20,19,46,0.7)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      border: '1px solid var(--border)',
      borderRadius: 28,
      padding: '8px 6px',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      zIndex: 30,
    }}>
      {tabs.map(t => {
        const a = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            background: 'transparent', border: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '6px 14px', borderRadius: 18, cursor: 'pointer',
            color: a ? '#FF3B9A' : 'var(--text-dim)',
            position: 'relative',
          }}>
            <Icon name={t.icon} size={22} strokeWidth={a ? 2.4 : 2} />
            <span style={{ fontSize: 10, fontWeight: a ? 700 : 500 }}>{t.label}</span>
            {a && <div style={{ position: 'absolute', bottom: 2, width: 4, height: 4, borderRadius: 2, background: '#FF3B9A', boxShadow: '0 0 8px #FF3B9A' }} />}
          </button>
        );
      })}
    </div>
  );
}
