import { useState } from 'react';
import { Curio } from '../mascot.jsx';
import { Icon, Starfield } from '../ui.jsx';

export default function QuizScreen({ onNav }) {
  const [picked, setPicked] = useState('B');
  const options = [
    { id: 'A', text: 'The Moon makes its own light', sub: 'like a star' },
    { id: 'B', text: 'The Moon reflects the Sun',    sub: 'like a mirror' },
    { id: 'C', text: 'The Moon glows from heat',     sub: "because it's hot" },
    { id: 'D', text: 'Earth lights the Moon',        sub: 'from below' },
  ];

  return (
    <div data-screen-label="06 Quiz" style={{ height: '100%', position: 'relative', background: 'linear-gradient(180deg, #14132E 0%, #2A1F4E 100%)', overflow: 'hidden' }}>
      <Starfield density={28} seed={11} />

      <div style={{ position: 'absolute', top: 56, left: 0, right: 0, zIndex: 10, padding: '8px 16px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => onNav?.('map')} style={{ width: 36, height: 36, borderRadius: 18, border: 'none', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name="close" size={18} color="var(--text)" />
        </button>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {[1, 1, 0].map((on, i) => (
            <Icon key={i} name="heart" size={20} color={on ? '#FF3B9A' : 'rgba(255,255,255,0.2)'} strokeWidth={2.2} />
          ))}
        </div>

        <div style={{ position: 'relative', width: 44, height: 44 }}>
          <svg width={44} height={44}>
            <circle cx={22} cy={22} r={18} stroke="rgba(255,255,255,0.1)" strokeWidth={3} fill="none" />
            <circle cx={22} cy={22} r={18} stroke="#22D3EE" strokeWidth={3} fill="none"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={2 * Math.PI * 18 * 0.32}
              strokeLinecap="round"
              transform="rotate(-90 22 22)"
              style={{ filter: 'drop-shadow(0 0 4px #22D3EE)' }} />
          </svg>
          <div className="curio-mono" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>18</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center', zIndex: 2 }}>
        <span style={{ fontSize: 11, color: '#FF3B9A', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>Question 4 / 7 · Space</span>
      </div>

      <div style={{ position: 'absolute', top: 152, left: 24, right: 24, zIndex: 2 }}>
        <div className="curio-display" style={{ fontSize: 26, lineHeight: 1.1, textAlign: 'center' }}>
          Why does the Moon glow at night?
        </div>
        <div style={{ marginTop: 18, height: 90, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg width={180} height={90} viewBox="0 0 180 90">
            <defs>
              <radialGradient id="quiz-sun" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#F59E0B" />
              </radialGradient>
              <radialGradient id="quiz-moon" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#F4F4FF" />
                <stop offset="100%" stopColor="#A5A4C9" />
              </radialGradient>
            </defs>
            <circle cx={25} cy={45} r={20} fill="url(#quiz-sun)" />
            <circle cx={25} cy={45} r={30} fill="#FCD34D" opacity={0.2} />
            {[0, 1, 2, 3, 4].map(i => (
              <line key={i} x1={50} y1={45} x2={130} y2={45 - 18 + i * 9} stroke="#FCD34D" strokeWidth={1.5} opacity={0.4} strokeDasharray="2 4" />
            ))}
            <circle cx={150} cy={45} r={18} fill="url(#quiz-moon)" />
            <circle cx={156} cy={40} r={3} fill="#A5A4C9" opacity={0.5} />
            <circle cx={147} cy={50} r={2} fill="#A5A4C9" opacity={0.5} />
          </svg>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 16, right: 16, zIndex: 5, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map(o => {
          const isPicked = o.id === picked;
          return (
            <button key={o.id} onClick={() => setPicked(o.id)} style={{
              all: 'unset', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
              background: isPicked ? 'linear-gradient(135deg, rgba(255,59,154,0.18), rgba(139,92,246,0.1))' : 'rgba(255,255,255,0.05)',
              border: `1.5px solid ${isPicked ? '#FF3B9A' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 16, padding: '12px 14px',
              boxShadow: isPicked ? '0 0 24px rgba(255,59,154,0.3)' : 'none',
              transition: 'all .15s',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: isPicked ? '#FF3B9A' : 'rgba(255,255,255,0.08)',
                color: isPicked ? '#0A0A1F' : 'var(--text-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 14, fontFamily: 'var(--font-mono)',
                flexShrink: 0,
              }}>{o.id}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{o.text}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{o.sub}</div>
              </div>
              {isPicked && (
                <div style={{ width: 18, height: 18, borderRadius: 9, background: '#FF3B9A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={12} color="#0A0A1F" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 20, left: 16, right: 16, zIndex: 10, display: 'flex', alignItems: 'flex-end', gap: 10 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Curio size={64} mood="thinking" />
        </div>
        <button onClick={() => onNav?.('map')} style={{
          flex: 1, padding: '14px 20px', borderRadius: 18, border: 'none',
          background: 'linear-gradient(90deg, #22D3EE, #8B5CF6)',
          color: '#0A0A1F', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 4px 20px rgba(34,211,238,0.4)',
        }}>
          Lock it in
          <Icon name="check" size={20} color="#0A0A1F" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
