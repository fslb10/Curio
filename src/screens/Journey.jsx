import { Icon, Starfield, TabBar } from '../ui.jsx';

export default function JourneyScreen({ onNav }) {
  const nodes = [
    { id: 1, x: 50, y: 8,  state: 'done',    title: 'What is gravity?' },
    { id: 2, x: 26, y: 18, state: 'done',    title: 'Mass vs weight' },
    { id: 3, x: 70, y: 26, state: 'done',    title: 'Free fall' },
    { id: 4, x: 38, y: 38, state: 'current', title: 'Orbits',           kind: 'sim' },
    { id: 5, x: 65, y: 50, state: 'locked',  title: 'Tides',            kind: 'quiz' },
    { id: 6, x: 28, y: 60, state: 'locked',  title: 'Mini-boss',        kind: 'boss' },
    { id: 7, x: 58, y: 72, state: 'locked',  title: 'Escape velocity' },
    { id: 8, x: 78, y: 88, state: 'locked',  title: 'Black holes',      kind: 'reward' },
  ];

  return (
    <div data-screen-label="03 Journey" style={{ height: '100%', position: 'relative', background: 'linear-gradient(180deg, #050518 0%, #14132E 50%, #1F1450 100%)', overflow: 'hidden' }}>
      <Starfield density={70} seed={5} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 56, left: 0, right: 0, zIndex: 10,
        padding: '8px 20px 12px',
        background: 'linear-gradient(180deg, rgba(5,5,24,0.9), rgba(5,5,24,0))',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => onNav?.('home')} style={{ width: 36, height: 36, borderRadius: 18, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="chevleft" size={18} color="var(--text)" />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#22D3EE', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>Space · Constellation 2</div>
            <div className="curio-display" style={{ fontSize: 19, lineHeight: 1.1 }}>Gravity & Motion</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#FCD34D', fontWeight: 700, fontSize: 13 }}>
            <Icon name="star" size={16} color="#FCD34D" />
            <span className="curio-mono">3/8</span>
          </div>
        </div>
      </div>

      {/* Constellation path */}
      <div style={{ position: 'absolute', inset: 0, paddingTop: 130, paddingBottom: 100 }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="path-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {nodes.slice(0, -1).map((n, i) => {
              const m = nodes[i + 1];
              const done = n.state === 'done' && (m.state === 'done' || m.state === 'current');
              return (
                <line key={i} x1={`${n.x}%`} y1={`${n.y}%`} x2={`${m.x}%`} y2={`${m.y}%`}
                  stroke={done ? 'url(#path-line)' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={done ? 2.5 : 1.5}
                  strokeDasharray={done ? '0' : '4 5'}
                  strokeLinecap="round" />
              );
            })}
          </svg>

          {nodes.map(n => {
            const c = n.state === 'done' ? '#22D3EE' : n.state === 'current' ? '#FF3B9A' : 'rgba(255,255,255,0.2)';
            const isCurrent = n.state === 'current';
            const isBoss = n.kind === 'boss';
            const isReward = n.kind === 'reward';
            const size = isBoss || isReward ? 68 : 56;
            return (
              <div key={n.id}
                onClick={() => { if (n.state !== 'locked') onNav?.(n.kind === 'quiz' ? 'quiz' : 'lesson'); }}
                style={{
                  position: 'absolute', left: `${n.x}%`, top: `${n.y}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  cursor: n.state === 'locked' ? 'default' : 'pointer',
                }}>
                {isCurrent && (
                  <>
                    <div style={{ position: 'absolute', width: size + 16, height: size + 16, borderRadius: '50%', border: '2px solid #FF3B9A', animation: 'curio-pulse-ring 2s ease-out infinite' }} />
                    <div style={{ position: 'absolute', width: size + 16, height: size + 16, borderRadius: '50%', border: '2px solid #FF3B9A', animation: 'curio-pulse-ring 2s ease-out 1s infinite' }} />
                  </>
                )}
                <div style={{
                  width: size, height: size, borderRadius: '50%',
                  background: n.state === 'locked' ? 'rgba(255,255,255,0.04)' :
                    `radial-gradient(circle at 35% 30%, ${c}, ${c}77 60%, ${c}33)`,
                  border: `2px solid ${c}`,
                  boxShadow: n.state !== 'locked' ? `0 0 24px ${c}80, inset 0 2px 0 rgba(255,255,255,0.3)` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: 1,
                }}>
                  {n.state === 'done' && <Icon name="check" size={24} color="#0A0A1F" strokeWidth={3} />}
                  {n.state === 'current' && (
                    isBoss ? <Icon name="trophy" size={24} color="#fff" /> : <Icon name="play" size={22} color="#fff" />
                  )}
                  {n.state === 'locked' && (
                    isBoss ? <Icon name="trophy" size={22} color="var(--text-muted)" /> :
                    isReward ? <Icon name="star" size={22} color="var(--text-muted)" /> :
                    <Icon name="lock" size={18} color="var(--text-muted)" />
                  )}
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 600,
                  color: n.state === 'locked' ? 'var(--text-muted)' : 'var(--text)',
                  background: 'rgba(10,10,31,0.7)',
                  padding: '2px 8px', borderRadius: 8, whiteSpace: 'nowrap',
                  maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{n.title}</div>
                {isCurrent && (
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#FF3B9A', letterSpacing: 0.6, textTransform: 'uppercase' }}>You are here</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* current lesson floating peek card */}
      <div style={{
        position: 'absolute', bottom: 90, left: 14, right: 14, zIndex: 20,
        background: 'rgba(20,19,46,0.85)', backdropFilter: 'blur(24px)',
        borderRadius: 22, border: '1px solid rgba(255,59,154,0.4)',
        padding: 14, display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 12px 40px rgba(255,59,154,0.25)',
      }}>
        <div style={{
          width: 50, height: 50, borderRadius: 14,
          background: 'linear-gradient(135deg, #FF3B9A, #8B5CF6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name="play" size={22} color="#fff" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: '#FF3B9A', fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>Next up · Interactive sim</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginTop: 1 }}>Orbits — Gravity Lab</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>~8 min · +60 XP</div>
        </div>
        <button onClick={() => onNav?.('lesson')} style={{
          padding: '10px 16px', borderRadius: 999, border: 'none',
          background: 'linear-gradient(90deg, #FF3B9A, #8B5CF6)',
          color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(255,59,154,0.4)',
        }}>Start</button>
      </div>

      <TabBar active="map" onChange={onNav} />
    </div>
  );
}
