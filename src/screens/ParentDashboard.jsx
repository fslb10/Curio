import { Card, Icon, SUBJECT_MAP } from '../ui.jsx';

export default function ParentDashboardScreen({ onNav }) {
  const weekData = [25, 12, 38, 18, 45, 30, 22];
  const max = Math.max(...weekData);

  return (
    <div data-screen-label="08 Parent Dashboard" style={{ height: '100%', position: 'relative', background: 'var(--bg-deep)' }}>
      <div className="curio-scroll" style={{ paddingTop: 56, paddingBottom: 30 }}>
        <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => onNav?.('profile')} style={{ width: 36, height: 36, borderRadius: 18, border: 'none', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="chevleft" size={18} color="var(--text)" />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Parent view</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>Maya's progress</div>
          </div>
          <button style={{ padding: '7px 12px', borderRadius: 999, background: 'var(--bg-card)', border: '1px solid var(--border)', fontSize: 12, color: 'var(--text)', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            This week <Icon name="chevdown" size={12} color="var(--text-dim)" />
          </button>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          <div style={{
            borderRadius: 22, padding: 18,
            background: 'linear-gradient(135deg, #1F1450 0%, #14132E 100%)',
            border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 50, height: 50, borderRadius: 25,
                background: 'linear-gradient(135deg, #8B5CF6, #FF3B9A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 18, color: '#fff',
              }}>MJ</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Maya, 11</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Doing great — 12-day streak 🔥</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              {[
                { v: '3h 10m', l: 'This week',     c: '#22D3EE' },
                { v: '47',     l: 'Sims tried',    c: '#34D399' },
                { v: '92%',    l: 'Quiz accuracy', c: '#FCD34D' },
              ].map(s => (
                <div key={s.l} style={{ flex: 1, textAlign: 'center', padding: '10px 4px', borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
                  <div className="curio-mono" style={{ fontSize: 16, fontWeight: 700, color: s.c }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Time learning</div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Last 7 days</span>
          </div>
          <Card padding={16} radius={18}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, height: 120 }}>
              {weekData.map((m, i) => {
                const isToday = i === 1;
                const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div className="curio-mono" style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)' }}>{m}m</div>
                    <div style={{
                      width: '100%', height: `${(m / max) * 80}px`, minHeight: 4,
                      borderRadius: 5,
                      background: isToday ? 'linear-gradient(180deg, #FF3B9A, #8B5CF6)' : 'linear-gradient(180deg, #22D3EE 0%, #8B5CF6 100%)',
                      opacity: isToday ? 1 : 0.7,
                      boxShadow: isToday ? '0 0 12px rgba(255,59,154,0.4)' : 'none',
                    }} />
                    <div style={{ fontSize: 11, fontWeight: 600, color: isToday ? '#FF3B9A' : 'var(--text-dim)' }}>{days[i]}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 14, padding: 10, borderRadius: 12, background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="sparkle" size={16} color="#22D3EE" />
              <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                <b style={{ color: '#22D3EE' }}>27 min/day</b> avg — that's 18% more than last week.
              </span>
            </div>
          </Card>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Where she's spending time</div>
          <Card padding={14} radius={18}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { sub: 'space',   mins: 78, pct: 41 },
                { sub: 'physics', mins: 52, pct: 27 },
                { sub: 'coding',  mins: 36, pct: 19 },
                { sub: 'math',    mins: 24, pct: 13 },
              ].map(({ sub, mins, pct }) => {
                const s = SUBJECT_MAP[sub];
                return (
                  <div key={sub} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', width: 70 }}>{s.name}</span>
                    <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: s.color, borderRadius: 3 }} />
                    </div>
                    <span className="curio-mono" style={{ fontSize: 12, color: 'var(--text-dim)', width: 38, textAlign: 'right' }}>{mins}m</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Recent wins</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: 'trophy', c: '#FCD34D', t: 'Finished Constellation 1', m: 'Space · 2 days ago' },
              { icon: 'star',   c: '#22D3EE', t: 'Top 10% in class',         m: 'Math quiz · 3 days ago' },
              { icon: 'flame',  c: '#FB923C', t: 'New streak record',        m: '12 days · today' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: `${a.c}22`, border: `1px solid ${a.c}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={a.icon} size={18} color={a.c} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{a.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.m}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Controls</div>
          <Card padding={0} radius={18} style={{ overflow: 'hidden' }}>
            {[
              { icon: 'clock', t: 'Daily time limit',       d: '45 min' },
              { icon: 'bell',  t: 'Weekly summary email',   d: 'Sundays' },
              { icon: 'lock',  t: 'Content filters',        d: 'Age 10+' },
            ].map((r, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={r.icon} size={16} color="var(--text-dim)" />
                </div>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{r.t}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.d}</span>
                <Icon name="chevright" size={14} color="var(--text-muted)" />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
