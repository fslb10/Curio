import { useEffect, useRef, useState } from 'react';
import { Curio } from '../mascot.jsx';
import { Icon, Starfield } from '../ui.jsx';

// Slider position t ∈ [0, 1] maps logarithmically to mass ∈ [0.1×, 100×].
const tToMass = (t) => Math.pow(10, t * 3 - 1);
const massToT = (m) => (Math.log10(m) + 1) / 3;

function Readout({ label, value, color }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      padding: '6px 10px', background: 'rgba(10,10,31,0.6)',
      border: `1px solid ${color}44`, borderRadius: 10,
      backdropFilter: 'blur(10px)',
      minWidth: 88,
    }}>
      <span style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</span>
      <span className="curio-mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{value}</span>
    </div>
  );
}

export default function LessonPlayerScreen({ onNav }) {
  const [t, setT] = useState(massToT(1));
  const [playing, setPlaying] = useState(true);
  const [angle, setAngle] = useState(0);
  const [done, setDone] = useState(false);
  const trackRef = useRef(null);
  const draggingRef = useRef(false);

  const mass = tToMass(t);

  // Orbit visuals — rx fixed, ry tapers at high mass so the orbit reads as more elliptical.
  const rx = 150;
  const ry = Math.max(34, 80 - Math.max(0, mass - 4) * 0.55);

  // Animation period (seconds for one revolution) — faster at higher mass for visible feedback.
  const periodSec = Math.max(0.7, 8 / Math.sqrt(Math.max(0.1, mass)));

  // Readouts.
  const speedKms = (29.8 * Math.sqrt(mass)).toFixed(1);
  const periodDays = Math.max(4, Math.round(365 / Math.sqrt(mass)));
  const shape = mass < 3 ? 'Circle' : mass < 30 ? 'Oval' : 'Ellipse';
  const massLabel = mass < 1 ? mass.toFixed(2) : mass < 10 ? mass.toFixed(2) : Math.round(mass);

  // rAF loop — advance orbit angle while playing.
  useEffect(() => {
    if (!playing) return;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setAngle((a) => (a + (2 * Math.PI * dt) / periodSec) % (2 * Math.PI));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, periodSec]);

  const planetX = rx * Math.cos(angle);
  const planetY = ry * Math.sin(angle);

  const updateFromClientX = (cx) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return;
    const next = Math.max(0, Math.min(1, (cx - r.left) / r.width));
    setT(next);
  };
  const onPointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (draggingRef.current) updateFromClientX(e.clientX);
  };
  const endDrag = () => { draggingRef.current = false; };

  const stepProgress = [1, 1, 1, 0.4, 0, 0, 0, 0];

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
          {stepProgress.map((v, i) => (
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

      {/* Simulation */}
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
            </defs>
            <circle cx="0" cy="0" r="90" fill="url(#sun-glow)" />
            <ellipse cx="0" cy="0" rx={rx} ry={ry} stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
            <circle cx="0" cy="0" r="34" fill="url(#sun-grad)" />
            <circle cx="-8" cy="-8" r="8" fill="#FFF7B0" opacity="0.6" />
          </svg>

          <svg viewBox="-200 -150 400 300" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <g transform={`translate(${planetX} ${planetY})`}>
              <circle r="14" fill="url(#planet-grad)" filter="drop-shadow(0 0 8px rgba(96,165,250,0.6))" />
              <text x="18" y="-6" fontSize="11" fontWeight="700" fill="#60A5FA">Earth</text>
            </g>
          </svg>

          <div style={{ position: 'absolute', top: 8, left: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Readout label="Mass"  value={`${massLabel}× Earth`} color="#60A5FA" />
            <Readout label="Orbit" value={`${periodDays} days`}  color="#22D3EE" />
          </div>
          <div style={{ position: 'absolute', top: 8, right: 16, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
            <Readout label="Speed" value={`${speedKms} km/s`} color="#FCD34D" />
            <Readout label="Shape" value={shape}             color="#34D399" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: 16,
        background: 'linear-gradient(180deg, rgba(10,10,31,0) 0%, rgba(10,10,31,0.95) 30%)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14,
          padding: '12px 14px 12px 10px',
          background: 'rgba(139,92,246,0.12)',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: 18,
          position: 'relative',
        }}>
          <Curio size={48} mood={mass > 4 ? 'wow' : 'thinking'} />
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6', letterSpacing: 0.4, textTransform: 'uppercase' }}>Curio's hint</div>
            <div style={{ fontSize: 13, color: 'var(--text)', marginTop: 2, lineHeight: 1.35 }}>
              {mass < 0.5 && 'Lighter Earth — it drifts slowly. Try sliding the other way.'}
              {mass >= 0.5 && mass <= 4 && 'Try sliding the mass higher. Watch what the orbit shape does — does Earth fall faster?'}
              {mass > 4 && mass <= 20 && 'Whoa — moving faster! Does the orbit still look like a circle?'}
              {mass > 20 && 'At super-high mass, the orbit stretches into an ellipse. The Sun still wins though!'}
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 18, padding: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600 }}>Earth's mass</span>
            <span className="curio-mono" style={{ fontSize: 16, fontWeight: 700, color: '#60A5FA' }}>{massLabel}×</span>
          </div>
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ position: 'relative', height: 28, display: 'flex', alignItems: 'center', touchAction: 'none', cursor: 'pointer' }}
          >
            <div style={{
              width: '100%', height: 6, borderRadius: 3,
              background: 'linear-gradient(90deg, rgba(96,165,250,0.3), rgba(255,59,154,0.6))',
              pointerEvents: 'none',
            }} />
            {[0, 25, 50, 75, 100].map(p => (
              <div key={p} style={{ position: 'absolute', left: `${p}%`, transform: 'translateX(-50%)', width: 2, height: 10, background: 'rgba(255,255,255,0.2)', borderRadius: 1, pointerEvents: 'none' }} />
            ))}
            <div style={{
              position: 'absolute', left: `${t * 100}%`, transform: 'translateX(-50%)',
              width: 28, height: 28, borderRadius: 14,
              background: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4), 0 0 0 4px rgba(96,165,250,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}>
              <div style={{ width: 4, height: 14, borderRadius: 2, background: '#60A5FA' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: 'var(--text-muted)' }}>
            <span>0.1×</span><span>1×</span><span>10×</span><span>100×</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button onClick={() => setPlaying(p => !p)} style={{
            flex: '0 0 auto', width: 52, height: 52, borderRadius: 16, border: '1px solid var(--border)',
            background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Icon name={playing ? 'pause' : 'play'} size={20} color="var(--text)" />
          </button>
          <button onClick={() => setDone(true)} style={{
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

      {/* Aha overlay */}
      {done && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 50,
          background: 'rgba(5,5,24,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 24, gap: 16, textAlign: 'center',
        }}>
          <Curio size={120} mood="wow" />
          <div className="curio-display" style={{ fontSize: 26, lineHeight: 1.1, color: '#fff' }}>
            Aha!
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-dim)', maxWidth: 320, lineHeight: 1.4 }}>
            Earth's mass barely changes its orbit — the <b style={{ color: '#FCD34D' }}>Sun's</b> gravity does almost all the work.
            The Sun is ~333,000× heavier than Earth!
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 999, background: 'rgba(252,211,77,0.15)', border: '1px solid rgba(252,211,77,0.3)' }}>
            <Icon name="bolt" size={14} color="#FCD34D" />
            <span className="curio-mono" style={{ fontSize: 14, fontWeight: 700, color: '#FCD34D' }}>+60 XP</span>
          </div>
          <button onClick={() => onNav?.('quiz')} style={{
            marginTop: 8, padding: '14px 22px', borderRadius: 16, border: 'none',
            background: 'linear-gradient(90deg, #22D3EE, #8B5CF6)',
            color: '#0A0A1F', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 4px 20px rgba(34,211,238,0.4)',
          }}>
            Next: quick check
            <Icon name="arrowright" size={18} color="#0A0A1F" />
          </button>
          <button onClick={() => setDone(false)} style={{
            padding: '8px 14px', borderRadius: 999, border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer',
          }}>
            Keep playing
          </button>
        </div>
      )}
    </div>
  );
}
