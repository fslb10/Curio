import { Icon, IconChip, SubjectGlyph, SUBJECTS, SUBJECT_MAP, TabBar } from '../ui.jsx';

export default function LibraryScreen({ onNav }) {
  return (
    <div data-screen-label="04 Library" style={{ height: '100%', position: 'relative', background: 'var(--bg-deep)' }}>
      <div className="curio-scroll" style={{ paddingTop: 56, paddingBottom: 120 }}>
        {/* header */}
        <div style={{ padding: '12px 20px 8px' }}>
          <div className="curio-display" style={{ fontSize: 30, lineHeight: 1 }}>Explore</div>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>200+ interactive sims to play with</div>
        </div>

        {/* search */}
        <div style={{ padding: '12px 20px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '12px 14px',
          }}>
            <Icon name="search" size={18} color="var(--text-dim)" />
            <span style={{ fontSize: 14, color: 'var(--text-muted)', flex: 1 }}>Try "volcano", "code a game"…</span>
            <div style={{
              padding: '4px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.06)',
              fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
            }}>⌘K</div>
          </div>
        </div>

        {/* Featured sim */}
        <div style={{ padding: '18px 20px 0' }}>
          <div onClick={() => onNav?.('lesson')} style={{
            position: 'relative', borderRadius: 26, overflow: 'hidden', cursor: 'pointer',
            background: 'linear-gradient(135deg, #134e4a 0%, #042f2e 50%, #064e3b 100%)',
            height: 200,
            border: '1px solid rgba(52, 211, 153, 0.3)',
            boxShadow: '0 12px 40px rgba(52, 211, 153, 0.15)',
          }}>
            <svg viewBox="0 0 360 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <defs>
                <radialGradient id="cell-bg" cx="70%" cy="40%">
                  <stop offset="0%" stopColor="#34D399" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="360" height="200" fill="url(#cell-bg)" />
              <circle cx="240" cy="100" r="80" fill="#10B981" opacity="0.2" />
              <circle cx="240" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="2" opacity="0.6" />
              <circle cx="240" cy="100" r="22" fill="#0A0A1F" stroke="#34D399" strokeWidth="2" />
              <circle cx="240" cy="100" r="8" fill="#FCD34D" />
              <ellipse cx="200" cy="80" rx="14" ry="8" fill="#22D3EE" opacity="0.7" />
              <ellipse cx="280" cy="130" rx="10" ry="6" fill="#FF3B9A" opacity="0.7" />
              <circle cx="270" cy="70" r="6" fill="#8B5CF6" />
              <circle cx="210" cy="130" r="5" fill="#FCD34D" />
            </svg>

            <div style={{ position: 'absolute', left: 18, top: 18, right: 150 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 999, background: 'rgba(252,211,77,0.2)', border: '1px solid rgba(252,211,77,0.4)' }}>
                <Icon name="sparkle" size={11} color="#FCD34D" />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#FCD34D', letterSpacing: 0.4, textTransform: 'uppercase' }}>New this week</span>
              </div>
              <div className="curio-display" style={{ fontSize: 24, lineHeight: 1.05, marginTop: 8 }}>Inside a cell</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Zoom from skin to mitochondria</div>
            </div>
            <button style={{
              position: 'absolute', left: 18, bottom: 18,
              padding: '10px 18px', borderRadius: 999, border: 'none',
              background: '#34D399', color: '#0A0A1F',
              fontWeight: 700, fontSize: 13, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 4px 16px rgba(52,211,153,0.5)',
            }}>
              <Icon name="play" size={12} color="#0A0A1F" />
              Try it · 12 min
            </button>
          </div>
        </div>

        {/* All subjects grid */}
        <div style={{ padding: '20px 20px 0' }}>
          <div className="curio-display" style={{ fontSize: 18, marginBottom: 12 }}>All subjects</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {SUBJECTS.map(s => (
              <div key={s.id} onClick={() => onNav?.('map')} style={{
                position: 'relative', borderRadius: 18, padding: '14px 12px',
                background: `linear-gradient(135deg, ${s.color}1A, ${s.color}05)`,
                border: `1px solid ${s.color}33`,
                overflow: 'hidden', cursor: 'pointer',
                minHeight: 88,
              }}>
                <div style={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.25 }}>
                  <SubjectGlyph kind={s.glyph} color={s.color} size={70} stroke={2} />
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{s.tagline}</div>
                  <div style={{ marginTop: 10, fontSize: 11, fontWeight: 600, color: s.color, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span className="curio-mono">{[24, 18, 31, 22, 28, 19, 35, 14][SUBJECTS.indexOf(s)]}</span>
                    <span>sims</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div style={{ padding: '24px 20px 0' }}>
          <div className="curio-display" style={{ fontSize: 18, marginBottom: 10 }}>Trending with 10–12 yr olds</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { sub: 'coding',    t: 'Code a flappy bird',    meta: '15 min · ★ 4.9', diff: 'Medium' },
              { sub: 'chemistry', t: 'Mix the unmixable',     meta: '8 min · ★ 4.8',  diff: 'Easy' },
              { sub: 'math',      t: 'Cracking secret codes', meta: '12 min · ★ 4.7', diff: 'Hard' },
              { sub: 'sound',     t: 'Build a synthesizer',   meta: '20 min · ★ 4.9', diff: 'Medium' },
            ].map((it, i) => {
              const s = SUBJECT_MAP[it.sub];
              return (
                <div key={i} onClick={() => onNav?.('lesson')} style={{
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: 12,
                }}>
                  <div style={{ width: 22, textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: 'var(--text-muted)' }}>{i + 1}</div>
                  <IconChip subject={s} size={40} radius={11} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{it.t}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{it.meta}</div>
                  </div>
                  <div style={{
                    padding: '3px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.06)',
                    fontSize: 10, fontWeight: 600, color: 'var(--text-dim)',
                  }}>{it.diff}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <TabBar active="library" onChange={onNav} />
    </div>
  );
}
