import { Card, Icon, IconChip, Starfield, StreakChip, SUBJECT_MAP, TabBar, XPBar } from '../ui.jsx';

export default function ProfileScreen({ onNav }) {
  return (
    <div data-screen-label="07 Profile" style={{ height: '100%', position: 'relative', background: 'var(--bg-deep)' }}>
      <div className="curio-scroll" style={{ paddingTop: 56, paddingBottom: 120 }}>
        {/* Top hero */}
        <div style={{ position: 'relative', padding: '8px 20px 20px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 360, height: 240,
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.3), rgba(255,59,154,0.15), transparent 70%)',
            filter: 'blur(20px)' }} />
          <Starfield density={30} seed={9} nebula={false} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 2 }}>
            <button onClick={() => onNav?.('parent')} style={{
              width: 36, height: 36, borderRadius: 18, border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <Icon name="settings" size={18} color="var(--text)" />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, position: 'relative', zIndex: 2 }}>
            <div style={{ position: 'relative' }}>
              <svg width={140} height={140} style={{ position: 'absolute', inset: 0, animation: 'curio-spin-slow 20s linear infinite' }}>
                <circle cx={70} cy={70} r={62} fill="none" stroke="rgba(255,59,154,0.3)" strokeWidth={1} strokeDasharray="3 6" />
                <circle cx={132} cy={70} r={3} fill="#FF3B9A" />
              </svg>
              <svg width={140} height={140} style={{ position: 'absolute', inset: 0, animation: 'curio-spin-slow 30s linear infinite reverse' }}>
                <circle cx={132} cy={70} r={3} fill="#FCD34D" />
              </svg>
              <div style={{
                width: 140, height: 140, borderRadius: 70,
                background: 'linear-gradient(135deg, #8B5CF6, #FF3B9A, #FCD34D)',
                padding: 4, position: 'relative',
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: 70,
                  background: 'linear-gradient(135deg, #2A1F4E, #1F1450)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 48, color: '#fff',
                }}>MJ</div>
              </div>
              <div style={{
                position: 'absolute', bottom: -2, right: -2,
                padding: '4px 10px', borderRadius: 999,
                background: 'linear-gradient(90deg, #FCD34D, #FB923C)',
                color: '#0A0A1F', fontWeight: 800, fontSize: 12,
                boxShadow: '0 2px 12px rgba(252,211,77,0.5)',
                display: 'flex', alignItems: 'center', gap: 3,
              }}>
                <Icon name="star" size={11} color="#0A0A1F" strokeWidth={2.5} />
                LVL 14
              </div>
            </div>
            <div className="curio-display" style={{ fontSize: 26, marginTop: 4 }}>Maya J.</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>@curious_maya · joined Jan 2026</div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 18, position: 'relative', zIndex: 2 }}>
            {[
              { v: '2,840', l: 'XP',         c: '#22D3EE' },
              { v: '12',    l: 'Day streak', c: '#FB923C' },
              { v: '47',    l: 'Sims done',  c: '#34D399' },
              { v: '8',     l: 'Badges',     c: '#FF3B9A' },
            ].map(s => (
              <div key={s.l} style={{
                flex: 1, padding: '10px 8px', borderRadius: 14,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                textAlign: 'center',
              }}>
                <div className="curio-mono" style={{ fontSize: 17, fontWeight: 700, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1, fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
          <Card padding={14} radius={18}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Level 14 → 15</div>
                <div className="curio-mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>340 / 500 XP</div>
              </div>
              <div style={{ fontSize: 11, color: '#FCD34D', fontWeight: 700, textAlign: 'right' }}>
                Next reward<br />
                <span style={{ color: 'var(--text)', fontSize: 13 }}>New Curio outfit ✨</span>
              </div>
            </div>
            <XPBar value={340} max={500} height={8} />
          </Card>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div className="curio-display" style={{ fontSize: 18 }}>Streak</div>
            <StreakChip days={12} />
          </div>
          <Card padding={14} radius={18}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
              {Array.from({ length: 84 }).map((_, i) => {
                const x = Math.sin(i * 13.37) * 10000;
                const r = x - Math.floor(x);
                let intensity = 0;
                if (i > 30) {
                  if (r > 0.55) intensity = 1;
                  if (r > 0.7) intensity = 2;
                  if (r > 0.85) intensity = 3;
                }
                if (i >= 72) intensity = 3;
                const colors = [
                  'rgba(255,255,255,0.06)',
                  'rgba(255,59,154,0.3)',
                  'rgba(255,59,154,0.6)',
                  '#FF3B9A',
                ];
                return (
                  <div key={i} style={{
                    aspectRatio: '1', borderRadius: 3,
                    background: colors[intensity],
                    boxShadow: intensity === 3 ? '0 0 6px rgba(255,59,154,0.5)' : 'none',
                  }} />
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 10, color: 'var(--text-muted)' }}>
              <span>12 weeks ago</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>Less</span>
                {['rgba(255,255,255,0.06)', 'rgba(255,59,154,0.3)', 'rgba(255,59,154,0.6)', '#FF3B9A'].map(c => (
                  <div key={c} style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                ))}
                <span>More</span>
              </div>
              <span>Today</span>
            </div>
          </Card>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div className="curio-display" style={{ fontSize: 18 }}>Badges</div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>8 of 42</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {[
              { icon: 'flame',   t: 'On Fire',     c: '#FB923C', got: true },
              { icon: 'bolt',    t: 'Quick Think', c: '#FCD34D', got: true },
              { icon: 'star',    t: 'Top 10',      c: '#22D3EE', got: true },
              { icon: 'trophy',  t: 'Boss Slayer', c: '#FF3B9A', got: true },
              { icon: 'sparkle', t: 'Lvl 14',      c: '#8B5CF6', got: true },
              { icon: 'heart',   t: 'Helper',      c: '#F472B6', got: true },
              { icon: 'lock',    t: '???',         c: '#6F6E94', got: false },
              { icon: 'lock',    t: '???',         c: '#6F6E94', got: false },
            ].map((b, i) => (
              <div key={i} style={{
                aspectRatio: '1',
                borderRadius: 16,
                background: b.got ? `radial-gradient(circle at 35% 30%, ${b.c}33, ${b.c}11)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${b.got ? b.c + '55' : 'var(--border)'}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                position: 'relative',
                boxShadow: b.got ? `0 0 16px ${b.c}22` : 'none',
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 17,
                  background: b.got ? b.c : 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={b.icon} size={18} color={b.got ? '#0A0A1F' : 'var(--text-muted)'} strokeWidth={2.4} />
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: b.got ? 'var(--text)' : 'var(--text-muted)', textAlign: 'center' }}>{b.t}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div className="curio-display" style={{ fontSize: 18, marginBottom: 10 }}>Mastery</div>
          <Card padding={14} radius={18}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { sub: 'space',   pct: 64 },
                { sub: 'physics', pct: 88 },
                { sub: 'coding',  pct: 28 },
                { sub: 'math',    pct: 42 },
              ].map(({ sub, pct }) => {
                const s = SUBJECT_MAP[sub];
                return (
                  <div key={sub} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <IconChip subject={s} size={28} radius={8} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>{s.name}</span>
                        <span className="curio-mono" style={{ color: s.color, fontWeight: 700 }}>{pct}%</span>
                      </div>
                      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: s.color, borderRadius: 2 }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      <TabBar active="profile" onChange={onNav} />
    </div>
  );
}
