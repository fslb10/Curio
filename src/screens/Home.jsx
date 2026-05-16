import {
  Card, Icon, IconChip, Pill, Starfield, StreakChip, SUBJECT_MAP, TabBar, XPBar,
} from '../ui.jsx';

export default function HomeScreen({ onNav }) {
  return (
    <div data-screen-label="02 Home" style={{ height: '100%', position: 'relative', background: 'var(--bg-deep)' }}>
      <Starfield density={28} seed={3} />

      <div className="curio-scroll" style={{ position: 'relative', zIndex: 1, paddingTop: 56, paddingBottom: 120 }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => onNav?.('profile')} style={{
            all: 'unset', cursor: 'pointer',
            width: 44, height: 44, borderRadius: 22,
            background: 'linear-gradient(135deg, #8B5CF6, #FF3B9A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 16, color: '#fff', flexShrink: 0,
            boxShadow: '0 2px 12px rgba(139,92,246,0.4)',
          }}>MJ</button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Tuesday morning</div>
            <div className="curio-display" style={{ fontSize: 22, lineHeight: 1.1 }}>Hey Maya 👋</div>
          </div>
          <StreakChip days={12} />
          <div style={{ position: 'relative', marginLeft: 4 }}>
            <Icon name="bell" size={22} color="var(--text-dim)" />
            <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: '#FF3B9A', boxShadow: '0 0 6px #FF3B9A' }} />
          </div>
        </div>

        {/* Continue learning card */}
        <div style={{ padding: '0 20px' }}>
          <div style={{
            position: 'relative', borderRadius: 28, padding: 18,
            background: 'linear-gradient(135deg, #1F1450 0%, #3D1A6E 60%, #5A1D7E 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(139,92,246,0.3)',
          }}>
            <div style={{ position: 'absolute', right: -30, top: -30, width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(139,92,246,0.4)' }} />
            <div style={{ position: 'absolute', right: 10, top: 10, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(34,211,238,0.3)' }} />
            <div style={{ position: 'absolute', right: 26, top: 26, width: 88, height: 88, borderRadius: '50%', background: 'radial-gradient(circle, #22D3EE, #8B5CF6)', boxShadow: '0 0 40px rgba(34,211,238,0.6)' }} />
            <div style={{ position: 'absolute', right: 45, top: 5, width: 12, height: 12, borderRadius: 6, background: '#FCD34D', boxShadow: '0 0 12px #FCD34D' }} />

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Icon name="play" size={12} color="#22D3EE" />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#22D3EE', letterSpacing: 0.6, textTransform: 'uppercase' }}>Pick up where you left off</span>
              </div>
              <div className="curio-display" style={{ fontSize: 24, lineHeight: 1.1, maxWidth: '70%' }}>Why does the Moon glow?</div>
              <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 6 }}>Space · 3 of 8 steps</div>
              <div style={{ marginTop: 14, maxWidth: '60%' }}>
                <XPBar value={37} max={100} height={6} />
              </div>
              <button onClick={() => onNav?.('lesson')} style={{
                marginTop: 14, padding: '10px 16px', borderRadius: 999,
                background: '#22D3EE', color: '#0A0A1F', border: 'none',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                boxShadow: '0 4px 16px rgba(34,211,238,0.4)',
              }}>
                <Icon name="play" size={14} color="#0A0A1F" />
                Continue · 6 min
              </button>
            </div>
          </div>
        </div>

        {/* Today's spark */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div className="curio-display" style={{ fontSize: 18 }}>Today's spark</div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Resets in 8h</span>
          </div>
          <Card padding={14} radius={22} onClick={() => onNav?.('quiz')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'linear-gradient(135deg, rgba(252,211,77,0.15), rgba(251,146,60,0.05))', border: '1px solid rgba(252,211,77,0.3)' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, flexShrink: 0,
              background: 'linear-gradient(135deg, #FCD34D, #FB923C)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(252,211,77,0.5)',
            }}>
              <Icon name="bolt" size={28} color="#0A0A1F" strokeWidth={2.5} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#FCD34D', letterSpacing: 0.4, textTransform: 'uppercase' }}>Daily Challenge</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginTop: 2 }}>Crack the code: pattern #142</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>+50 XP · 4 min</div>
            </div>
            <Icon name="chevright" size={20} color="var(--text-dim)" />
          </Card>
        </div>

        {/* Subject quick tiles */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <div className="curio-display" style={{ fontSize: 18 }}>Your subjects</div>
            <span onClick={() => onNav?.('library')} style={{ fontSize: 12, color: '#FF3B9A', fontWeight: 600, cursor: 'pointer' }}>See all</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { sub: 'space',   progress: 64, lessons: 12, status: 'Orbits & gravity' },
              { sub: 'coding',  progress: 28, lessons: 6,  status: 'Loops' },
              { sub: 'physics', progress: 88, lessons: 19, status: 'Almost there!' },
              { sub: 'biology', progress: 12, lessons: 3,  status: 'Just started' },
            ].map(({ sub, progress, lessons, status }) => {
              const s = SUBJECT_MAP[sub];
              return (
                <div key={sub} onClick={() => onNav?.('map')} style={{
                  position: 'relative', borderRadius: 20, padding: 14,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  overflow: 'hidden', cursor: 'pointer',
                }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: s.color, opacity: 0.12, filter: 'blur(20px)' }} />
                  <div style={{ position: 'relative' }}>
                    <IconChip subject={s} size={36} radius={10} />
                    <div style={{ fontWeight: 700, fontSize: 14, marginTop: 10, color: 'var(--text)' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{status}</div>
                    <div style={{ marginTop: 10 }}>
                      <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: s.color, borderRadius: 3, boxShadow: `0 0 8px ${s.color}99` }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 10, color: 'var(--text-muted)' }}>
                        <span className="curio-mono" style={{ fontWeight: 700 }}>{progress}%</span>
                        <span>{lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Friend activity teaser */}
        <div style={{ padding: '24px 20px 0' }}>
          <Card padding={14} radius={20} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex' }}>
              {['#FF3B9A', '#22D3EE', '#FCD34D'].map((c, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: 16,
                  background: `linear-gradient(135deg, ${c}, ${c}aa)`,
                  border: '2px solid var(--bg-deep)',
                  marginLeft: i ? -10 : 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: '#0A0A1F',
                }}>{['L', 'J', 'A'][i]}</div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: 'var(--text)' }}>
                <b>Liam</b> finished Photosynthesis
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>2 friends learning right now · join?</div>
            </div>
            <Pill size="sm" color="#FF3B9A" textColor="#fff">Wave</Pill>
          </Card>
        </div>
      </div>

      <TabBar active="home" onChange={onNav} />
    </div>
  );
}
