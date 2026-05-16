import { useState } from 'react';
import { Curio } from '../mascot.jsx';
import { Icon, IconChip, Starfield, SUBJECTS } from '../ui.jsx';

export default function OnboardingScreen({ onNav }) {
  const [picked, setPicked] = useState(new Set(['space', 'coding']));
  const toggle = (id) => {
    const n = new Set(picked);
    n.has(id) ? n.delete(id) : n.add(id);
    setPicked(n);
  };
  return (
    <div data-screen-label="01 Onboarding" style={{ height: '100%', position: 'relative', background: 'linear-gradient(180deg, #14132E 0%, #0A0A1F 100%)', overflow: 'hidden' }}>
      <Starfield density={50} />

      {/* progress dots top */}
      <div style={{ position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6, zIndex: 5 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: i === 1 ? 24 : 8, height: 8, borderRadius: 4,
            background: i <= 1 ? '#FF3B9A' : 'rgba(255,255,255,0.18)',
            boxShadow: i === 1 ? '0 0 12px #FF3B9A' : 'none',
            transition: 'all .3s',
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: '100px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Curio size={120} mood="happy" />
        <div className="curio-display" style={{ fontSize: 30, marginTop: 16, textAlign: 'center', lineHeight: 1.1 }}>
          Hi! I'm <span style={{ color: '#FCD34D' }}>Curio</span>.<br />
          What sparks you?
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-dim)', marginTop: 8, textAlign: 'center' }}>
          Pick 2 or more — we'll start there.
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: '24px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {SUBJECTS.slice(0, 6).map(s => {
          const on = picked.has(s.id);
          return (
            <button key={s.id} onClick={() => toggle(s.id)} style={{
              all: 'unset', cursor: 'pointer',
              background: on ? `linear-gradient(135deg, ${s.color}22, ${s.color}08)` : 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${on ? s.color : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 18, padding: '14px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: on ? `0 0 20px ${s.color}33` : 'none',
              transition: 'all .15s',
            }}>
              <IconChip subject={s} size={40} radius={11} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{s.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.tagline}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: 11,
                border: `1.5px solid ${on ? s.color : 'rgba(255,255,255,0.2)'}`,
                background: on ? s.color : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {on && <Icon name="check" size={14} color="#0A0A1F" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 60, left: 24, right: 24, zIndex: 3 }}>
        <button onClick={() => onNav?.('home')} style={{
          width: '100%', padding: '16px', borderRadius: 20, border: 'none',
          background: 'linear-gradient(90deg, #FF3B9A, #8B5CF6)',
          color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17,
          letterSpacing: 0.2, cursor: 'pointer',
          boxShadow: '0 8px 28px rgba(255,59,154,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          Let's go
          <Icon name="arrowright" size={20} color="#fff" strokeWidth={2.5} />
        </button>
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
          {picked.size} picked · you can change these later
        </div>
      </div>
    </div>
  );
}
