import { Curio } from '../mascot.jsx';
import { Icon, Starfield } from '../ui.jsx';

function Readout({ label, value, color }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      padding: '6px 10px', background: 'rgba(10,10,31,0.6)',
      border: `1px solid ${color}44`, borderRadius: 10,
      backdropFilter: 'blur(10px)',
    }}>
      <span style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</span>
      <span className="curio-mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{value}</span>
    </div>
  );
}

export default function LessonPlayerScreen({ onNav }) {
  return (
    <div data-screen-label="05 Lesson Player" style={{ height: '100%', position: 'relative', background: 'radial-gradient(ellipse at 50% 30%, #1F1450 0%, #0A0A1F 70%)', overflow: 'hidden' }}>
      <Starfield density={60} seed={7} />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 56, left: 0, right: 0, zIndex: 20,
        padding: '8px 16px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button onClick={() => onNav?.('map')} style={{
          width: 36, height: 36, borderRadius: 18, border: 'none',
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon name="close" size={18} color="var(--text)" />
        </button>

        <div style={{ flex: 1, display: 'flex', gap: 4, padding: '0 6px' }}>
          {[1, 1, 1, 0.4, 0, 0, 0, 0].map((v, i) => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              {v > 0 && <div style={{ width: `${v * 100}%`, height: '100%', background: v === 1 ? '#22D3EE' : '#FF3B9A', boxShadow: v === 1 ? '0 0 6px #22D3EE' : '0 0 6px #FF3B9A' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', background: 'rgba(252,211,77,0.15)', borderRadius: 999, border: '1px solid rgba(252,211,77,0.3)' }}>
          <Icon name="bolt" size={12} color="#FCD34D" />
          <span className="curio-mono" style={{ fontSize: 12, fontWeight: 700, color: '#FCD34D' }}>+24</span>
        </div>
      </div>

      {/* Step title */}
      <div style={{ position: 'absolute', top: 116, left: 20, right: 20, zIndex: 5, textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#22D3EE', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>Step 4 · Try it</div>
        <div className="curio-display" style={{ fontSize: 22, marginTop: 4, lineHeight: 1.1 }}>What happens if Earth got heavier?</div>
      </div>

      {/* Simulation area */}
      <div style={{ position: 'absolute', top: 180, bottom: 280, left: 0, right: 0, zIndex: 3 }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <svg viewBox="-200 -150 400 300" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <radialGradient id="sun-grad" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="60%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#DC2626" />
              </radialGradient>
              <radialGradient id="planet-grad" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="60%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </radialGradient>
              <radialGradient id="sun-glow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="trail-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <circle cx="0" cy="0" r="90" fill="url(#sun-glow)" />
            <ellipse cx="0" cy="0" rx="150" ry="80" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
            <ellipse cx="0" cy="0" rx="150" ry="80" stroke="url(#trail-grad)" strokeWidth="2" fill="none" pathLength="100" strokeDasharray="40 100" strokeDashoffset="0" opacity="0.5" />
            <circle cx="0" cy="0" r="34" fill="url(#sun-grad)" />
            <circle cx="-8" cy="-8" r="8" fill="#FFF7B0" opacity="0.6" />
          </svg>

          <svg viewBox="-200 -150 400 300" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <path id="orbit-path" d="M 150 0 A 150 80 0 1 1 -150 0 A 150 80 0 1 1 150 0" fill="none" />
            <g>
              <circle r="14" fill="url(#planet-grad)" filter="drop-shadow(0 0 8px rgba(96,165,250,0.6))" />
              <text x="18" y="-6" fontSize="11" fontWeight="700" fill="#60A5FA">Earth</text>
              <animateMotion dur="8s" repeatCount="indefinite">
                <mpath href="#orbit-path" />
              </animateMotion>
            </g>
          </svg>

          <div style={{ position: 'absolute', top: 8, left: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Readout label="Mass" value="1.0× Earth" color="#60A5FA" />
            <Readout label="Orbit" value="365 days" color="#22D3EE" />
          </div>
          <div style={{ position: 'absolute', top: 8, right: 16, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
            <Readout label="Speed" value="29.8 km/s" color="#FCD34D" />
            <Readout label="Shape" value="Circle" color="#34D399" />
          </div>
        </div>
      </div>

      {/* Controls panel */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: 16,
        background: 'linear-gradient(180deg, rgba(10,10,31,0) 0%, rgba(10,10,31,0.95) 30%)',
      }}>
        {/* Curio hint */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14,
          padding: '12px 14px 12px 10px',
          background: 'rgba(139,92,246,0.12)',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: 18,
          position: 'relative',
        }}>
          <Curio size={48} mood="thinking" />
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6', letterSpacing: 0.4, textTransform: 'uppercase' }}>Curio's hint</div>
            <div style={{ fontSize: 13, color: 'var(--text)', marginTop: 2, lineHeight: 1.35 }}>
              Try sliding the mass higher. Watch what the orbit shape does — does Earth fall faster?
            </div>
          </div>
        </div>

        {/* Mass slider */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 18, padding: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600 }}>Earth's mass</span>
            <span className="curio-mono" style={{ fontSize: 16, fontWeight: 700, color: '#60A5FA' }}>1.0×</span>
          </div>
          <div style={{ position: 'relative', height: 28, display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '100%', height: 6, borderRadius: 3,
              background: 'linear-gradient(90deg, rgba(96,165,250,0.3), rgba(255,59,154,0.6))',
            }} />
            {[0, 25, 50, 75, 100].map(p => (
              <div key={p} style={{ position: 'absolute', left: `${p}%`, transform: 'translateX(-50%)', width: 2, height: 10, background: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
            ))}
            <div style={{
              position: 'absolute', left: '20%', transform: 'translateX(-50%)',
              width: 28, height: 28, borderRadius: 14,
              background: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4), 0 0 0 4px rgba(96,165,250,0.3)',
              cursor: 'grab',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 4, height: 14, borderRadius: 2, background: '#60A5FA' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: 'var(--text-muted)' }}>
            <span>0.1×</span><span>1×</span><span>10×</span><span>100×</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button style={{
            flex: '0 0 auto', width: 52, height: 52, borderRadius: 16, border: '1px solid var(--border)',
            background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon name="pause" size={20} color="var(--text)" />
          </button>
          <button onClick={() => onNav?.('quiz')} style={{
            flex: 1, padding: '0 18px', borderRadius: 16, border: 'none',
            background: 'linear-gradient(90deg, #FF3B9A, #8B5CF6)',
            color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 16px rgba(255,59,154,0.3)',
          }}>
            I see it — next
            <Icon name="arrowright" size={18} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
