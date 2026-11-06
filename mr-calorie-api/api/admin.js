function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.status(200).send(getHtml())
}

function getHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"/>
<meta name="theme-color" content="#0A0C11"/>
<title>Admin - Mr. Calorie</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet"/>
<style>
:root {
  color-scheme: dark;
  --bg: #0A0C11;
  --bg-soft: #0E1118;
  --surface: #12151E;
  --surface-2: #171B26;
  --surface-3: #1E2330;
  --ink: #EEF1F8;
  --ink-soft: #C6CCDB;
  --muted: #8B92A7;
  --faint: #5C6377;
  --line: rgba(255, 255, 255, 0.07);
  --line-strong: rgba(255, 255, 255, 0.13);
  --gold: #F5C842;
  --gold-bright: #FFD95E;
  --gold-deep: #D9A62B;
  --gold-ink: #241700;
  --gold-soft: rgba(245, 200, 66, 0.12);
  --gold-glow: rgba(245, 200, 66, 0.32);
  --green: #34D399;
  --green-soft: rgba(52, 211, 153, 0.13);
  --blue: #7CB4F5;
  --blue-soft: rgba(124, 180, 245, 0.13);
  --amber: #FBBF24;
  --amber-soft: rgba(251, 191, 36, 0.13);
  --red: #F87171;
  --red-soft: rgba(248, 113, 113, 0.10);
  --radius: 16px;
  --radius-sm: 12px;
  --shadow: 0 12px 40px rgba(0, 0, 0, 0.42);
  --shadow-sm: 0 4px 16px rgba(0, 0, 0, 0.30);
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; }
::selection { background: rgba(245, 200, 66, 0.30); color: #FFF7DD; }
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.12); border-radius: 99px; border: 3px solid transparent; background-clip: padding-box; }
::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.22); border: 3px solid transparent; background-clip: padding-box; }
button, input, select { font: inherit; -webkit-tap-highlight-color: transparent; }
button { transition: background-color 0.2s var(--ease), color 0.2s var(--ease), border-color 0.2s var(--ease), box-shadow 0.25s var(--ease), transform 0.18s var(--ease), opacity 0.2s var(--ease); }
button:active { transform: translateY(1px) scale(0.99); }
:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; border-radius: 6px; }
body {
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--ink);
  min-height: 100vh;
  min-height: 100dvh;
  background:
    radial-gradient(900px 480px at 85% -10%, rgba(245, 200, 66, 0.09), transparent 60%),
    radial-gradient(760px 420px at -10% 30%, rgba(124, 180, 245, 0.05), transparent 55%),
    radial-gradient(680px 400px at 50% 110%, rgba(52, 211, 153, 0.04), transparent 60%),
    var(--bg);
  background-attachment: fixed;
  padding: calc(20px + var(--safe-top)) 16px calc(56px + var(--safe-bottom));
  font-feature-settings: 'cv02', 'cv11';
}
h1, h2 { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }

/* ---------- Login ---------- */
#login-screen {
  max-width: 400px; margin: 10vh auto 0; position: relative;
  background: linear-gradient(180deg, var(--surface-2), var(--surface));
  border-radius: 24px; padding: 40px 30px;
  border: 1px solid var(--line-strong);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), var(--shadow), 0 0 90px rgba(245, 200, 66, 0.06);
  text-align: center;
  animation: fadeUp 0.45s var(--ease);
}
.login-mark {
  width: 62px; height: 62px; margin: 0 auto 20px; border-radius: 18px;
  background: linear-gradient(135deg, var(--gold-bright), var(--gold-deep));
  display: grid; place-items: center;
  font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 19px; color: var(--gold-ink);
  box-shadow: 0 10px 30px rgba(245, 200, 66, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.4);
}
#login-screen h2 { font-size: 23px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 6px; }
#login-screen p { font-size: 13.5px; color: var(--muted); margin-bottom: 26px; }
#password-input {
  width: 100%; padding: 14px 16px; border-radius: var(--radius-sm);
  border: 1px solid var(--line-strong); font-size: 15px; outline: none;
  margin-bottom: 12px; background: var(--bg-soft); color: var(--ink);
  transition: border-color 0.2s var(--ease), box-shadow 0.25s var(--ease), background-color 0.2s var(--ease);
}
#password-input::placeholder { color: var(--faint); }
#password-input:focus { border-color: var(--gold); box-shadow: 0 0 0 4px rgba(245, 200, 66, 0.16); background: var(--surface); }
#login-btn {
  width: 100%; min-height: 48px; padding: 14px; border: none; border-radius: var(--radius-sm);
  font-size: 15px; font-weight: 700; cursor: pointer; color: var(--gold-ink);
  background: linear-gradient(180deg, var(--gold-bright), var(--gold-deep));
  box-shadow: 0 6px 20px rgba(245, 200, 66, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.35);
}
#login-btn:hover { box-shadow: 0 10px 30px rgba(245, 200, 66, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.45); transform: translateY(-1px); filter: brightness(1.05); }
#login-error { font-size: 13px; color: var(--red); margin-top: 12px; min-height: 18px; font-weight: 600; }

/* ---------- Shell ---------- */
#dashboard { display: none; max-width: 1160px; margin: 0 auto; }
.topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 18px; }
.brand-wrap { display: flex; align-items: center; gap: 13px; min-width: 0; }
.brand-mark {
  width: 44px; height: 44px; border-radius: 13px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--gold-bright), var(--gold-deep));
  display: grid; place-items: center;
  font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 14px; color: var(--gold-ink);
  box-shadow: 0 6px 20px rgba(245, 200, 66, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.4);
}
.brand-wrap h1 { font-size: 21px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; }
.subtitle { font-size: 13px; color: var(--muted); margin-top: 2px; }
.top-actions { display: flex; gap: 8px; align-items: center; }
.refresh-btn {
  background: var(--surface-2); border: 1px solid var(--line-strong); border-radius: 999px;
  min-height: 40px; padding: 8px 18px; font-size: 13px; font-weight: 600; cursor: pointer; color: var(--ink-soft);
}
.refresh-btn:hover { border-color: var(--gold); color: var(--gold); background: var(--gold-soft); box-shadow: 0 0 0 4px rgba(245, 200, 66, 0.08); }
.logout-btn { background: none; border: none; min-height: 40px; font-size: 13px; font-weight: 600; color: var(--muted); cursor: pointer; padding: 8px 12px; border-radius: 999px; }
.logout-btn:hover { color: var(--red); background: var(--red-soft); }
.install-btn {
  background: var(--gold-soft); border: 1px solid rgba(245, 200, 66, 0.35); border-radius: 999px;
  min-height: 40px; padding: 8px 16px; font-size: 13px; font-weight: 700; cursor: pointer; color: var(--gold);
}
.install-btn:hover { border-color: var(--gold); background: rgba(245, 200, 66, 0.18); box-shadow: 0 0 0 4px rgba(245, 200, 66, 0.08); }
#install-hint { display: block; margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--line); text-align: left; }
#install-hint p { margin: 8px 0 0; font-size: 13px; color: var(--muted); line-height: 1.55; }
.install-steps { margin: 0; padding: 0 0 0 20px; color: var(--ink-soft); font-size: 13.5px; line-height: 1.55; }
.install-steps li { margin: 0 0 8px; }
.install-steps strong { color: var(--ink); }
.install-cta {
  width: 100%; min-height: 44px; border: none; border-radius: var(--radius-sm); cursor: pointer;
  font-size: 14px; font-weight: 700; color: var(--gold-ink);
  background: linear-gradient(180deg, var(--gold-bright), var(--gold-deep));
  box-shadow: 0 4px 14px rgba(245, 200, 66, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.35);
}
.install-cta:hover { box-shadow: 0 8px 24px rgba(245, 200, 66, 0.36); transform: translateY(-1px); }
@media (display-mode: standalone), (display-mode: minimal-ui) {
  .install-btn, #install-hint { display: none !important; }
}

/* ---------- Tabs ---------- */
.tabs-wrap {
  position: sticky; top: 0; z-index: 40; margin: 0 -4px 20px; padding: 10px 4px 12px;
  background: linear-gradient(180deg, rgba(10, 12, 17, 0.92) 70%, rgba(10, 12, 17, 0));
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
}
.tabs {
  display: flex; gap: 4px; flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch;
  scrollbar-width: none; padding: 5px; background: var(--surface); border: 1px solid var(--line-strong);
  border-radius: 16px; box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
.tabs::-webkit-scrollbar { display: none; }
.tab-btn {
  display: inline-flex; align-items: center; gap: 8px;
  border: none; background: transparent; border-radius: 11px; min-height: 40px; padding: 9px 15px;
  font-size: 13px; font-weight: 600; color: var(--muted); cursor: pointer; white-space: nowrap; flex: 0 0 auto;
}
.tab-btn .tab-ic { width: 16px; height: 16px; flex: 0 0 auto; opacity: 0.75; transition: opacity 0.2s var(--ease), transform 0.25s var(--ease); }
.tab-btn .tab-short { display: none; }
.tab-btn:hover { color: var(--ink); background: rgba(255, 255, 255, 0.05); }
.tab-btn:hover .tab-ic { opacity: 1; transform: translateY(-1px); }
.tab-btn.active {
  color: var(--gold-ink);
  background: linear-gradient(180deg, var(--gold-bright), var(--gold-deep));
  box-shadow: 0 4px 16px rgba(245, 200, 66, 0.30), inset 0 1px 0 rgba(255, 255, 255, 0.35);
}
.tab-btn.active .tab-ic { opacity: 1; }

/* ---------- Panels / cards ---------- */
.panel { display: none; animation: fadeUp 0.32s var(--ease); }
.panel.active { display: block; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.section-card {
  background: var(--surface); border-radius: 20px; padding: 26px 24px;
  border: 1px solid var(--line);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), var(--shadow);
}
.section-header { margin-bottom: 20px; }
.section-header h2 { font-size: 19px; font-weight: 700; letter-spacing: -0.01em; margin-bottom: 6px; }
.section-header .subtitle { margin: 0; line-height: 1.5; }

/* ---------- Stat cards ---------- */
.stat-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 22px; }
.stat-card {
  --accent: var(--gold);
  position: relative; overflow: hidden; min-width: 0;
  border-radius: 16px; padding: 16px 18px 15px;
  background: linear-gradient(180deg, var(--surface-3), var(--surface-2));
  border: 1px solid var(--line);
  transition: transform 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.3s var(--ease);
}
.stat-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent 75%);
}
.stat-card::after {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.55;
  background: radial-gradient(140px 70px at 88% -18%, color-mix(in srgb, var(--accent) 22%, transparent), transparent);
  transition: opacity 0.3s var(--ease);
}
.stat-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45), 0 0 24px color-mix(in srgb, var(--accent) 14%, transparent);
}
.stat-card:hover::after { opacity: 1; }
.stat-card.green { --accent: var(--green); }
.stat-card.blue { --accent: var(--blue); }
.stat-card.gold { --accent: var(--gold); }
.stat-number {
  font-family: 'Space Grotesk', sans-serif; font-size: 29px; font-weight: 700; color: var(--ink);
  line-height: 1.1; letter-spacing: -0.02em; word-break: break-word; font-variant-numeric: tabular-nums;
}
.stat-number.money { font-size: 23px; }
.stat-label { font-size: 11.5px; font-weight: 600; color: var(--muted); margin-top: 7px; text-transform: uppercase; letter-spacing: 0.05em; }
.earnings-sub { font-size: 11px; font-weight: 500; color: var(--faint); margin-top: 4px; }

/* ---------- Chart ---------- */
.chart-panel { margin-bottom: 24px; padding: 20px 18px; border-radius: 18px; border: 1px solid var(--line); background: var(--surface-2); }
.chart-toolbar { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.chart-title-wrap { min-width: 0; }
.chart-title { font-family: 'Space Grotesk', sans-serif; font-size: 15.5px; font-weight: 600; }
.chart-sub { font-size: 12px; color: var(--muted); margin-top: 3px; }
.chart-controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.seg { display: inline-flex; padding: 3px; border-radius: 999px; background: var(--bg-soft); border: 1px solid var(--line); }
.seg-btn {
  border: none; background: transparent; border-radius: 999px; min-height: 33px; padding: 6px 13px;
  font-size: 12px; font-weight: 600; color: var(--muted); cursor: pointer; white-space: nowrap;
}
.seg-btn:hover { color: var(--ink); }
.seg-btn.active { background: var(--gold); color: var(--gold-ink); font-weight: 700; box-shadow: 0 2px 10px rgba(245, 200, 66, 0.28); }
.chart-legend { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 12px; }
.legend-item { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 500; color: var(--muted); }
.legend-swatch { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
.legend-swatch.line { height: 3px; border-radius: 99px; width: 15px; }
.chart-canvas-wrap { position: relative; width: 100%; height: 300px; }
.chart-empty { display: none; text-align: center; padding: 48px 12px; color: var(--faint); font-size: 14px; font-weight: 500; }
.chart-meta {
  display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 14px; padding-top: 13px;
  border-top: 1px solid var(--line); font-size: 12px; color: var(--muted);
}
.chart-meta strong { color: var(--ink); font-weight: 600; font-variant-numeric: tabular-nums; }

/* ---------- Tables ---------- */
.block-title { font-size: 11.5px; font-weight: 700; margin-bottom: 12px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.08em; }
.month-table-wrap, #payments-table-wrap, #pending-table-wrap, #twa-table-wrap, #table-wrap { margin-bottom: 22px; }
.desktop-only { display: block; }
.mobile-list { display: none; }
.table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 14px; border: 1px solid var(--line); background: var(--surface-2); }
table { width: 100%; border-collapse: separate; border-spacing: 0; min-width: 640px; }
thead th {
  background: var(--surface-3); padding: 11px 14px; text-align: left; font-size: 10.5px; font-weight: 700;
  color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid var(--line-strong); white-space: nowrap;
  position: sticky; top: 0;
}
tbody td { padding: 12px 14px; font-size: 13px; border-bottom: 1px solid var(--line); vertical-align: middle; background: transparent; color: var(--ink-soft); transition: background-color 0.15s var(--ease); }
tbody td strong { color: var(--ink); font-weight: 600; }
tbody tr:last-child td { border-bottom: none; }
tbody tr:hover td { background: rgba(245, 200, 66, 0.045); }
.block-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
.block-head .block-title { margin-bottom: 0; }
.filter-chip {
  display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--gold);
  background: var(--gold-soft); border: 1px solid rgba(245, 200, 66, 0.30); border-radius: 999px;
  min-height: 40px; padding: 8px 15px; cursor: pointer; user-select: none;
  transition: border-color 0.2s var(--ease), box-shadow 0.25s var(--ease), background-color 0.2s var(--ease);
}
.filter-chip:hover { border-color: var(--gold); box-shadow: 0 0 0 4px rgba(245, 200, 66, 0.08); }
.filter-chip input { accent-color: var(--gold); width: 15px; height: 15px; }

/* ---------- Badges ---------- */
.badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 999px; font-size: 11px; font-weight: 600; letter-spacing: 0.01em; }
.badge-active { background: var(--green-soft); color: var(--green); }
.badge-extended { background: var(--blue-soft); color: var(--blue); }
.badge-pending { background: var(--amber-soft); color: var(--amber); }
.badge-ready { background: var(--green-soft); color: var(--green); }
.badge-optedin { background: rgba(255, 255, 255, 0.08); color: var(--ink-soft); }
.badge-granted { background: var(--green-soft); color: var(--green); }
.badge-no { background: rgba(255, 255, 255, 0.04); color: var(--faint); border: 1px solid var(--line); }
.badge-rejected { background: var(--red-soft); color: var(--red); }
.stat-card.red { --accent: var(--red); }
.panel .section-card + .section-card { margin-top: 16px; }
.uid { font-size: 11px; color: var(--faint); font-family: 'JetBrains Mono', ui-monospace, monospace; }
.loading-row, .loading-state, .empty-state { text-align: center; padding: 32px 14px; font-size: 14px; color: var(--faint); font-weight: 500; }
.error-box {
  background: var(--red-soft); border: 1px solid rgba(248, 113, 113, 0.35); border-radius: var(--radius-sm);
  padding: 12px 14px; color: #FCA5A5; font-size: 13px; font-weight: 600; margin-bottom: 16px; display: none;
}

/* ---------- Action buttons ---------- */
.toggle-btn {
  border: 1px solid var(--line-strong); border-radius: 999px; min-height: 38px; padding: 8px 14px;
  font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; background: var(--surface-3); color: var(--ink-soft);
}
.toggle-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35); }
.toggle-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
.toggle-btn.on { background: var(--green-soft); color: var(--green); border-color: rgba(52, 211, 153, 0.35); }
.toggle-btn.on:hover { border-color: var(--green); box-shadow: 0 4px 14px rgba(52, 211, 153, 0.15); }
.toggle-btn.off { background: var(--surface-3); color: var(--muted); }
.toggle-btn.off:hover { color: var(--ink); border-color: var(--gold); }
.toggle-btn.danger-on { background: rgba(255, 255, 255, 0.05); color: var(--muted); border-color: var(--line-strong); }
.toggle-btn.danger-on:hover { color: var(--red); border-color: rgba(248, 113, 113, 0.45); background: var(--red-soft); }
.toggle-btn.danger-off {
  background: linear-gradient(180deg, var(--gold-bright), var(--gold-deep)); color: var(--gold-ink);
  border-color: transparent; font-weight: 700; box-shadow: 0 3px 12px rgba(245, 200, 66, 0.22);
}
.toggle-btn.danger-off:hover { box-shadow: 0 6px 20px rgba(245, 200, 66, 0.38); filter: brightness(1.05); }
.actions-cell { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
.hint { font-size: 13px; color: var(--muted); line-height: 1.55; }
.hint strong { color: var(--ink); font-weight: 600; }

/* ---------- Mobile cards ---------- */
.m-card {
  background: var(--surface-2); border: 1px solid var(--line); border-radius: 16px; padding: 15px;
  transition: border-color 0.2s var(--ease), transform 0.2s var(--ease), box-shadow 0.25s var(--ease);
}
.m-card:hover { border-color: var(--line-strong); transform: translateY(-2px); box-shadow: var(--shadow-sm); }
.m-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
.m-card-title { font-size: 14px; font-weight: 600; line-height: 1.35; word-break: break-word; color: var(--ink); }
.m-card-sub { font-size: 12px; color: var(--muted); margin-top: 3px; word-break: break-word; }
.m-card-value { font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink); white-space: nowrap; }
.m-meta { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0 10px; }
.m-row { display: flex; justify-content: space-between; gap: 10px; font-size: 12px; padding: 4px 0; color: var(--muted); }
.m-row strong { color: var(--ink); font-weight: 600; text-align: right; }
.m-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 4px; }
.m-actions .toggle-btn { width: 100%; min-height: 44px; font-size: 13px; border-radius: 12px; }
.m-actions .toggle-btn.span2 { grid-column: 1 / -1; }

/* ---------- Search / lookup ---------- */
.search-row { display: flex; gap: 8px; align-items: stretch; margin-bottom: 16px; }
.search-input {
  flex: 1; min-width: 0; padding: 12px 15px; border-radius: var(--radius-sm);
  border: 1px solid var(--line-strong); font-size: 15px; outline: none; background: var(--bg-soft); color: var(--ink);
  transition: border-color 0.2s var(--ease), box-shadow 0.25s var(--ease), background-color 0.2s var(--ease);
}
.search-input::placeholder { color: var(--faint); }
.search-input:focus { border-color: var(--gold); box-shadow: 0 0 0 4px rgba(245, 200, 66, 0.16); background: var(--surface); }
.search-btn {
  border: none; border-radius: var(--radius-sm); min-height: 46px; padding: 10px 20px;
  font-size: 14px; font-weight: 700; cursor: pointer; color: var(--gold-ink);
  background: linear-gradient(180deg, var(--gold-bright), var(--gold-deep)); white-space: nowrap;
  box-shadow: 0 4px 14px rgba(245, 200, 66, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.35);
}
.search-btn:hover { box-shadow: 0 8px 24px rgba(245, 200, 66, 0.36); transform: translateY(-1px); filter: brightness(1.05); }
.search-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.match-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.match-card {
  display: flex; align-items: center; gap: 12px; width: 100%; text-align: left;
  background: var(--surface-2); border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px;
  cursor: pointer; color: var(--ink);
  transition: border-color 0.2s var(--ease), background-color 0.2s var(--ease), transform 0.2s var(--ease), box-shadow 0.25s var(--ease);
}
.match-card:hover { border-color: rgba(245, 200, 66, 0.45); background: var(--surface-3); transform: translateY(-2px); box-shadow: var(--shadow-sm); }
.match-card.active { border-color: var(--gold); background: var(--surface-3); box-shadow: 0 0 0 4px rgba(245, 200, 66, 0.10); }
.match-avatar {
  width: 42px; height: 42px; border-radius: 50%; background: var(--gold-soft); color: var(--gold);
  display: grid; place-items: center; font-weight: 700; font-size: 14px; overflow: hidden; flex-shrink: 0;
  border: 1px solid rgba(245, 200, 66, 0.25);
}
.match-avatar img { width: 100%; height: 100%; object-fit: cover; }
.match-meta { min-width: 0; flex: 1; }
.user-hero {
  display: flex; align-items: flex-start; gap: 16px; margin-bottom: 18px; padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}
.user-hero-photo {
  width: 72px; height: 72px; border-radius: 50%; background: var(--gold-soft); color: var(--gold);
  display: grid; place-items: center; font-weight: 700; font-size: 22px; overflow: hidden; flex-shrink: 0;
  border: 3px solid var(--gold); box-shadow: 0 0 26px rgba(245, 200, 66, 0.22);
}
.user-hero-photo img { width: 100%; height: 100%; object-fit: cover; }
.grant-box {
  background: var(--surface-2); border: 1px solid rgba(245, 200, 66, 0.28);
  border-radius: 16px; padding: 14px; margin-bottom: 18px;
}
.grant-box .hint { margin-top: 4px; }
.grant-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: stretch; margin-top: 10px; }
.grant-row .search-input { width: 110px; flex: 0 0 auto; }
.grant-row select.search-input { width: 140px; }
.grant-row .search-btn, .grant-row .toggle-btn { flex: 1 1 140px; }
.grant-status { margin-top: 10px; font-size: 13px; font-weight: 600; color: var(--green); display: none; }
.grant-status.err { color: #FCA5A5; }
.kv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(155px, 1fr)); gap: 9px; margin-bottom: 18px; }
.kv-card {
  background: var(--surface-2); border: 1px solid var(--line); border-radius: 12px; padding: 11px 13px; min-width: 0;
  transition: border-color 0.2s var(--ease), background-color 0.2s var(--ease);
}
.kv-card:hover { border-color: var(--line-strong); background: var(--surface-3); }
.kv-label { font-size: 10.5px; font-weight: 700; color: var(--faint); text-transform: uppercase; letter-spacing: 0.06em; }
.kv-value { font-size: 14px; font-weight: 600; margin-top: 4px; word-break: break-word; color: var(--ink); }
.copy-btn {
  border: 1px solid var(--line-strong); background: var(--surface-3); border-radius: 999px; min-height: 32px;
  padding: 4px 12px; font-size: 11px; font-weight: 600; cursor: pointer; color: var(--muted);
}
.copy-btn:hover { color: var(--gold); border-color: var(--gold); background: var(--gold-soft); }
.acc { border: 1px solid var(--line); border-radius: 14px; background: var(--surface-2); margin-bottom: 10px; overflow: hidden; }
.acc > summary {
  cursor: pointer; padding: 13px 15px; font-weight: 600; font-size: 13px; list-style: none; color: var(--ink-soft);
  display: flex; justify-content: space-between; gap: 8px; align-items: center;
  transition: background-color 0.2s var(--ease), color 0.2s var(--ease);
}
.acc > summary:hover { background: rgba(255, 255, 255, 0.03); color: var(--ink); }
.acc > summary::-webkit-details-marker { display: none; }
.acc[open] > summary { border-bottom: 1px solid var(--line); background: var(--surface-3); color: var(--ink); }
.acc-body { padding: 13px 15px 15px; }
.raw-json {
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; line-height: 1.5;
  background: #07080C; color: #EBD98F; padding: 15px; border-radius: 12px; border: 1px solid var(--line);
  overflow: auto; max-height: 420px; white-space: pre-wrap; word-break: break-word;
}
.survey-stars { color: var(--gold); letter-spacing: 0.08em; font-size: 16px; font-weight: 700; white-space: nowrap; }
.survey-msg { white-space: pre-wrap; word-break: break-word; max-width: 460px; line-height: 1.5; }
.star-dist { display: flex; flex-direction: column; gap: 7px; margin-bottom: 20px; }
.star-dist-row { display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 600; color: var(--muted); }
.star-dist-bar { flex: 1; height: 8px; background: var(--bg-soft); border-radius: 99px; overflow: hidden; border: 1px solid var(--line); }
.star-dist-fill { height: 100%; background: linear-gradient(90deg, var(--gold-deep), var(--gold-bright)); border-radius: 99px; box-shadow: 0 0 10px rgba(245, 200, 66, 0.35); transition: width 0.6s var(--ease); }

/* ---------- Responsive ---------- */
@media (max-width: 720px) {
  body { padding: calc(12px + var(--safe-top)) 12px calc(40px + var(--safe-bottom)); }
  #login-screen { margin-top: 6vh; padding: 30px 22px; border-radius: 20px; }
  .topbar { margin-bottom: 12px; }
  .brand-wrap h1 { font-size: 17px; }
  .brand-wrap .subtitle { display: none; }
  .brand-mark { width: 38px; height: 38px; border-radius: 11px; font-size: 12px; }
  .section-card { padding: 18px 14px; border-radius: 18px; }
  .section-header h2 { font-size: 16px; }
  .hint br { display: none; }
  .tab-btn .tab-full { display: none; }
  .tab-btn .tab-short { display: inline; }
  .tab-btn { padding: 8px 12px; font-size: 12px; gap: 6px; }
  .stat-row { grid-template-columns: 1fr 1fr; gap: 9px; }
  .stat-number { font-size: 22px; }
  .stat-number.money { font-size: 18px; }
  .stat-label { font-size: 10.5px; }
  .desktop-only { display: none !important; }
  .mobile-list { display: flex; flex-direction: column; gap: 10px; }
  .filter-chip { width: 100%; justify-content: center; }
  .chart-panel { padding: 14px 12px; }
  .chart-canvas-wrap { height: 250px; }
  .chart-controls { width: 100%; }
  .seg { flex: 1; }
  .seg-btn { flex: 1; text-align: center; }
  .search-row { flex-direction: column; }
  .search-btn { width: 100%; }
  .grant-row { flex-direction: column; }
  .grant-row .search-input, .grant-row select.search-input, .grant-row .search-btn, .grant-row .toggle-btn { width: 100%; }
  .user-hero { flex-direction: column; align-items: center; text-align: center; }
}
@media (max-width: 380px) {
  .stat-row { grid-template-columns: 1fr; }
  .m-actions { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
</style>
<link rel="manifest" href="/admin-manifest.json"/>
<link rel="icon" type="image/png" sizes="192x192" href="/admin-icons/icon-192.png"/>
<link rel="apple-touch-icon" href="/admin-icons/apple-touch-icon.png"/>
<meta name="mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="apple-mobile-web-app-title" content="MC Admin"/>
<meta name="application-name" content="MC Admin"/>
</head>
<body>

<div id="loading-screen" style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: var(--bg); z-index: 9999;">
  <div style="text-align: center;">
    <div style="width: 50px; height: 50px; border: 4px solid rgba(245, 200, 66, 0.2); border-top-color: var(--gold); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 24px;"></div>
    <p style="color: var(--muted); font-size: 15px; font-weight: 500;">Loading admin panel...</p>
  </div>
  <style>
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  </style>
</div>

<div id="login-screen">
  <div class="login-mark">MC</div>
  <h2>Admin Access</h2>
  <p>Mr. Calorie &mdash; Testers, payments &amp; user lookup</p>
  <input id="password-input" type="password" placeholder="Enter admin password"
    autocomplete="current-password" onkeydown="if(event.key==='Enter')login()"/>
  <button id="login-btn" onclick="login()">Unlock dashboard</button>
  <div id="login-error"></div>
  <div id="install-hint"></div>
</div>

<div id="dashboard">
  <div class="topbar">
    <div class="brand-wrap">
      <div class="brand-mark">MC</div>
      <div>
        <h1>Mr. Calorie Admin</h1>
        <p class="subtitle">Payments, testers, installs &amp; user lookup</p>
      </div>
    </div>
    <div class="top-actions">
      <button class="install-btn" id="install-btn" onclick="installApp()">Install app</button>
      <button class="refresh-btn" onclick="loadAll()">Refresh</button>
      <button class="logout-btn" onclick="logout()">Logout</button>
    </div>
  </div>

  <div class="tabs-wrap">
    <nav class="tabs" role="tablist">
      <button class="tab-btn active" data-tab="payments" onclick="switchTab('payments')">
        <svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></svg>
        <span class="tab-full">Payments</span><span class="tab-short">Pay</span>
      </button>
      <button class="tab-btn" data-tab="testers" onclick="switchTab('testers')">
        <svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span class="tab-full">Play Store Testers</span><span class="tab-short">Testers</span>
      </button>
      <button class="tab-btn" data-tab="twa" onclick="switchTab('twa')">
        <svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/></svg>
        <span class="tab-full">App Installs</span><span class="tab-short">Installs</span>
      </button>
      <button class="tab-btn" data-tab="premium" onclick="switchTab('premium')">
        <svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8Z"/></svg>
        <span class="tab-full">Premium Granted</span><span class="tab-short">Premium</span>
      </button>
      <button class="tab-btn" data-tab="survey" onclick="switchTab('survey')">
        <svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="tab-full">Survey</span><span class="tab-short">Survey</span>
      </button>
      <button class="tab-btn" data-tab="users" onclick="switchTab('users')">
        <svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        <span class="tab-full">User Lookup</span><span class="tab-short">Lookup</span>
      </button>
      <button class="tab-btn" data-tab="barcodes" onclick="switchTab('barcodes')">
        <svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5v14"/><path d="M9 5v14"/><path d="M13 5v14"/><path d="M17 5v14"/><path d="M20 5v14"/></svg>
        <span class="tab-full">Barcode Review</span><span class="tab-short">Barcodes</span>
      </button>
      <button class="tab-btn" data-tab="reports" onclick="switchTab('reports')">
        <svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <span class="tab-full">Payment Reports</span><span class="tab-short">Reports</span>
      </button>
    </nav>
  </div>

  <div class="panel active" id="panel-payments">
    <div class="section-card section">
      <div class="section-header">
        <h2>Paid 2-Month Promo Subscriptions</h2>
        <p class="subtitle">GCash only (&#x20B1;99 / 60 days). Beta premium grants not listed.</p>
      </div>
      <div id="payments-error" class="error-box"></div>
      <div id="payments-stat" class="stat-row" style="display:none">
        <div class="stat-card green">
          <div class="stat-number money" id="payments-total-earn">&#x20B1;0</div>
          <div class="stat-label">Total Earnings</div>
        </div>
        <div class="stat-card green">
          <div class="stat-number money" id="payments-month-earn">&#x20B1;0</div>
          <div class="stat-label">This Month</div>
          <div class="earnings-sub" id="payments-month-label">&mdash;</div>
        </div>
        <div class="stat-card green">
          <div class="stat-number" id="payments-count">0</div>
          <div class="stat-label">Total Payments</div>
        </div>
        <div class="stat-card green">
          <div class="stat-number" id="payments-unique">0</div>
          <div class="stat-label">Unique Payers</div>
        </div>
        <div class="stat-card green">
          <div class="stat-number" id="payments-repeat">0</div>
          <div class="stat-label">Paid More Than Once</div>
        </div>
      </div>

      <div id="payments-chart-wrap" class="chart-panel" style="display:none">
        <div class="chart-toolbar">
          <div class="chart-title-wrap">
            <div class="chart-title">Earnings &amp; Payments</div>
            <div class="chart-sub" id="chart-range-label">Asia/Manila timezone</div>
          </div>
          <div class="chart-controls">
            <div class="seg" role="group" aria-label="Chart period">
              <button type="button" class="seg-btn active" id="chart-mode-month" onclick="setChartMode('month')">Monthly</button>
              <button type="button" class="seg-btn" id="chart-mode-day" onclick="setChartMode('day')">Daily</button>
            </div>
            <div class="seg" role="group" aria-label="Daily range" id="chart-day-range" style="display:none">
              <button type="button" class="seg-btn" data-range="30" onclick="setDayRange(30)">30d</button>
              <button type="button" class="seg-btn active" data-range="90" onclick="setDayRange(90)">90d</button>
              <button type="button" class="seg-btn" data-range="all" onclick="setDayRange('all')">All</button>
            </div>
          </div>
        </div>
        <div class="chart-legend">
          <span class="legend-item"><span class="legend-swatch" style="background:#F5C842"></span> Payments</span>
          <span class="legend-item"><span class="legend-swatch line" style="background:#34D399"></span> Earnings (&#x20B1;)</span>
        </div>
        <div class="chart-canvas-wrap">
          <canvas id="payments-chart" aria-label="Payments chart"></canvas>
        </div>
        <div class="chart-empty" id="chart-empty">No payment data yet to chart.</div>
        <div class="chart-meta" id="chart-meta"></div>
      </div>

      <div id="payments-months-wrap" class="month-table-wrap" style="display:none">
        <div class="block-title">Earnings by Month</div>
        <div class="desktop-only table-scroll">
          <table>
            <thead><tr><th>Month</th><th>Payments</th><th>Unique Payers</th><th>Earnings</th></tr></thead>
            <tbody id="payments-months-body"><tr><td colspan="4" class="loading-row">Loading&hellip;</td></tr></tbody>
          </table>
        </div>
        <div class="mobile-list" id="payments-months-cards"></div>
      </div>

      <div id="payments-payers-wrap" class="month-table-wrap" style="display:none">
        <div class="block-head">
          <div class="block-title">Payers</div>
          <label class="filter-chip">
            <input type="checkbox" id="payments-repeat-only" onchange="renderPayersTable()"/>
            Repeat payers only
          </label>
        </div>
        <div class="desktop-only table-scroll">
          <table>
            <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Times Paid</th><th>Total Paid</th><th>First Payment</th><th>Last Payment</th><th>UID</th></tr></thead>
            <tbody id="payments-payers-body"><tr><td colspan="8" class="loading-row">Loading&hellip;</td></tr></tbody>
          </table>
        </div>
        <div class="mobile-list" id="payments-payers-cards"></div>
      </div>

      <div id="payments-table-wrap" style="display:none">
        <div class="block-title">All Payments</div>
        <div class="desktop-only table-scroll">
          <table>
            <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Paid At</th><th>Amount</th><th>Ref</th><th>UID</th></tr></thead>
            <tbody id="payments-body"><tr><td colspan="7" class="loading-row">Loading&hellip;</td></tr></tbody>
          </table>
        </div>
        <div class="mobile-list" id="payments-cards"></div>
      </div>
      <div id="payments-loading" class="loading-state">Loading payments&hellip;</div>
    </div>
  </div>

  <div class="panel" id="panel-testers">
    <div class="section-card section">
      <div class="section-header">
        <h2>Play Store Testers</h2>
        <p class="hint">
          <strong>Approve Download</strong> unlocks Play Store.
          <strong>Grant Premium</strong> gives 2 months premium.
        </p>
      </div>
      <div id="pending-error" class="error-box"></div>
      <div id="pending-stat" class="stat-row" style="display:none">
        <div class="stat-card blue">
          <div class="stat-number" id="pending-count">0</div>
          <div class="stat-label">Play Store Signups</div>
        </div>
      </div>
      <div id="pending-table-wrap" style="display:none">
        <div class="desktop-only table-scroll">
          <table>
            <thead><tr><th>#</th><th>Email</th><th>Registered</th><th>Download</th><th>Opted In</th><th>Premium</th><th>Actions</th><th>UID</th></tr></thead>
            <tbody id="pending-body"><tr><td colspan="8" class="loading-row">Loading&hellip;</td></tr></tbody>
          </table>
        </div>
        <div class="mobile-list" id="pending-cards"></div>
      </div>
      <div id="pending-loading" class="loading-state">Loading testers&hellip;</div>
    </div>
  </div>

  <div class="panel" id="panel-twa">
    <div class="section-card section">
      <div class="section-header">
        <h2>Play Store App Installs</h2>
        <p class="subtitle">Users detected running the TWA app.</p>
      </div>
      <div id="twa-error" class="error-box"></div>
      <div id="twa-stat" class="stat-row" style="display:none">
        <div class="stat-card blue">
          <div class="stat-number" id="twa-count">0</div>
          <div class="stat-label">TWA Installs</div>
        </div>
      </div>
      <div id="twa-table-wrap" style="display:none">
        <div class="desktop-only table-scroll">
          <table>
            <thead><tr><th>#</th><th>Email / Name</th><th>First Detected</th><th>Tester Status</th><th>Premium</th><th>UID</th></tr></thead>
            <tbody id="twa-body"><tr><td colspan="6" class="loading-row">Loading&hellip;</td></tr></tbody>
          </table>
        </div>
        <div class="mobile-list" id="twa-cards"></div>
      </div>
      <div id="twa-loading" class="loading-state">Loading installs&hellip;</div>
    </div>
  </div>

  <div class="panel" id="panel-premium">
    <div class="section-card section">
      <div class="section-header">
        <h2>Premium Granted Testers</h2>
        <p class="subtitle">Users who received their 2-month premium reward.</p>
      </div>
      <div id="error-msg" class="error-box"></div>
      <div id="beta-stat" class="stat-row" style="display:none">
        <div class="stat-card gold">
          <div class="stat-number" id="total-count">0</div>
          <div class="stat-label">Total Rewarded</div>
        </div>
      </div>
      <div id="table-wrap" style="display:none">
        <div class="desktop-only table-scroll">
          <table>
            <thead><tr><th>#</th><th>Email</th><th>Granted At</th><th>Status</th><th>UID</th></tr></thead>
            <tbody id="testers-body"><tr><td colspan="5" class="loading-row">Loading&hellip;</td></tr></tbody>
          </table>
        </div>
        <div class="mobile-list" id="testers-cards"></div>
      </div>
      <div id="loading" class="loading-state">Loading premium grants&hellip;</div>
    </div>
  </div>

  <div class="panel" id="panel-survey">
    <div class="section-card section">
      <div class="section-header">
        <h2>Weight Tracking Survey</h2>
        <p class="subtitle">Star ratings and written feedback. Dismissed prompts are not listed — only completed answers.</p>
      </div>
      <div id="survey-error" class="error-box"></div>
      <div id="survey-stat" class="stat-row" style="display:none">
        <div class="stat-card gold">
          <div class="stat-number" id="survey-count">0</div>
          <div class="stat-label">Responses</div>
        </div>
        <div class="stat-card gold">
          <div class="stat-number" id="survey-avg">0</div>
          <div class="stat-label">Average stars</div>
        </div>
      </div>
      <div id="survey-dist" class="star-dist" style="display:none"></div>
      <div id="survey-table-wrap" style="display:none">
        <div class="block-head">
          <div class="block-title">Answers</div>
          <label class="filter-chip">
            Stars
            <select id="survey-star-filter" onchange="renderSurveysTable()" style="border:none;background:transparent;font:inherit;font-weight:700;color:#F5C842;outline:none;cursor:pointer">
              <option value="all">All</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </label>
        </div>
        <div class="desktop-only table-scroll">
          <table>
            <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Stars</th><th>Message</th><th>Submitted</th><th>UID</th></tr></thead>
            <tbody id="survey-body"><tr><td colspan="7" class="loading-row">Loading&hellip;</td></tr></tbody>
          </table>
        </div>
        <div class="mobile-list" id="survey-cards"></div>
      </div>
      <div id="survey-loading" class="loading-state">Loading survey answers&hellip;</div>
    </div>
  </div>

  <div class="panel" id="panel-users">
    <div class="section-card section">
      <div class="section-header">
        <h2>User Lookup</h2>
        <p class="subtitle">Search by email or UID. Grant or revoke premium on the user record, with a custom duration.</p>
      </div>
      <form class="search-row" onsubmit="return searchUsers(event)">
        <input id="user-search-input" class="search-input" type="search" placeholder="Email or UID"
          autocomplete="off" />
        <button type="submit" class="search-btn" id="user-search-btn">Search</button>
      </form>
      <div id="users-error" class="error-box"></div>
      <div id="users-matches" class="match-list"></div>
      <div id="users-loading" class="loading-state" style="display:none">Searching&hellip;</div>
      <div id="users-detail"></div>
      <div id="opens-error" class="error-box" style="margin-top:8px"></div>
      <div id="opens-stat" class="stat-row" style="margin-top:8px">
        <div class="stat-card green">
          <div class="stat-number" id="opens-count">0</div>
          <div class="stat-label">People who opened the app</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" id="opens-date-label" style="font-size:18px">&mdash;</div>
          <div class="stat-label">Manila date</div>
        </div>
      </div>
      <div class="block-head" style="margin-bottom:12px">
        <div class="block-title">Who opened</div>
        <input type="date" id="opens-date" class="search-input" style="max-width:190px;min-height:40px;padding:8px 12px"
          onchange="loadDailyOpens()"/>
      </div>
      <div id="opens-loading" class="loading-state" style="display:none">Loading who opened&hellip;</div>
      <div id="opens-list" class="match-list"></div>
    </div>
  </div>

  <div class="panel" id="panel-barcodes">
    <div class="section-card section">
      <div class="section-header">
        <h2>Pending barcode products</h2>
        <p class="subtitle">Approve copies the product into foods/. Reject keeps it for audit and does not publish.</p>
      </div>
      <div id="barcodes-error" class="error-box"></div>
      <div class="stat-row" id="barcodes-stat" style="display:none">
        <div class="stat-card gold">
          <div class="stat-number" id="barcodes-count">0</div>
          <div class="stat-label">Waiting review</div>
        </div>
      </div>
      <div id="barcodes-loading" class="loading-state">Loading submissions&hellip;</div>
      <div id="barcodes-list" class="match-list"></div>
    </div>
    <div class="section-card section">
      <div class="section-header">
        <h2>Review history</h2>
        <p class="subtitle">Past approvals and rejections stay here so you can still see what users submitted.</p>
      </div>
      <div class="stat-row" id="barcodes-history-stat" style="display:none">
        <div class="stat-card green">
          <div class="stat-number" id="barcodes-approved-count">0</div>
          <div class="stat-label">Approved</div>
        </div>
        <div class="stat-card red">
          <div class="stat-number" id="barcodes-rejected-count">0</div>
          <div class="stat-label">Rejected</div>
        </div>
      </div>
      <div class="block-head">
        <div class="seg" id="barcodes-history-filter">
          <button type="button" class="seg-btn active" data-filter="all" onclick="setBarcodeHistoryFilter('all')">All</button>
          <button type="button" class="seg-btn" data-filter="approved" onclick="setBarcodeHistoryFilter('approved')">Approved</button>
          <button type="button" class="seg-btn" data-filter="rejected" onclick="setBarcodeHistoryFilter('rejected')">Rejected</button>
        </div>
      </div>
      <div class="search-row">
        <input id="barcodes-history-q" class="search-input" type="search" placeholder="Search name, barcode, or submitter"
          autocomplete="off" oninput="renderBarcodeHistory()"/>
      </div>
      <div id="barcodes-history-list" class="match-list"></div>
    </div>
  </div>

  <div class="panel" id="panel-reports">
    <div class="section-card section">
      <div class="section-header">
        <h2>Payment Problem Reports</h2>
        <p class="subtitle">Users who paid but verification failed. Review and manually grant premium if the payment is valid.</p>
      </div>
      <div id="reports-error" class="error-box"></div>
      <div id="reports-stat" class="stat-row" style="display:none">
        <div class="stat-card red">
          <div class="stat-number" id="reports-open-count">0</div>
          <div class="stat-label">Open Reports</div>
        </div>
        <div class="stat-card green">
          <div class="stat-number" id="reports-resolved-count">0</div>
          <div class="stat-label">Resolved</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" id="reports-total-count">0</div>
          <div class="stat-label">Total Reports</div>
        </div>
      </div>
      <div class="block-head" style="margin-bottom:12px">
        <div class="seg" id="reports-filter-seg">
          <button type="button" class="seg-btn active" data-filter="open" onclick="setReportsFilter('open')">Open</button>
          <button type="button" class="seg-btn" data-filter="resolved" onclick="setReportsFilter('resolved')">Resolved</button>
          <button type="button" class="seg-btn" data-filter="all" onclick="setReportsFilter('all')">All</button>
        </div>
      </div>
      <div id="reports-loading" class="loading-state">Loading reports&hellip;</div>
      <div id="reports-list" class="match-list"></div>
    </div>
  </div>

</div>

<script>
var API_TESTERS  = '/api/admin-testers';
var API_TOGGLE   = '/api/toggle-tester';
var API_TWA      = '/api/admin-twa-users';
var API_PAYMENTS = '/api/admin-payments';
var API_REPORTS  = '/api/admin-payment-reports';
var API_USERS    = '/api/admin-testers';
var API_SURVEYS  = '/api/admin-testers';
var API_BARCODES = '/api/admin-testers';
var pw = localStorage.getItem('admin_pw') || sessionStorage.getItem('admin_pw') || '';
if (pw) {
  try { localStorage.setItem('admin_pw', pw); } catch (e) {}
  try { sessionStorage.removeItem('admin_pw'); } catch (e) {}
  attemptLoad(pw);
} else {
  // No stored password, hide loading and show login
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('login-screen').style.display = 'block';
}

var loadedTabs = {};

function currentTab() {
  var btn = document.querySelector('.tab-btn.active');
  return btn ? btn.getAttribute('data-tab') : 'payments';
}

function loadTab(name) {
  if (!name || loadedTabs[name]) return;
  loadedTabs[name] = true;
  if (name === 'payments') loadPayments();
  if (name === 'testers') loadPendingTesters();
  if (name === 'premium') loadBetaTesters();
  if (name === 'twa') loadTwaUsers();
  if (name === 'survey') loadSurveys();
  if (name === 'users') loadDailyOpens();
  if (name === 'barcodes') loadBarcodes();
  if (name === 'reports') loadReports();
}

function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    var on = btn.getAttribute('data-tab') === name;
    btn.classList.toggle('active', on);
    if (on) btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  });
  document.querySelectorAll('.panel').forEach(function(panel) {
    panel.classList.toggle('active', panel.id === 'panel-' + name);
  });
  if (location.hash !== '#' + name) {
    history.replaceState(null, '', '#' + name);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  loadTab(name);
}

function tabFromHash() {
  var name = (location.hash || '').replace(/^#/, '');
  if (!name) return;
  if (!document.getElementById('panel-' + name)) return;
  switchTab(name);
}

function login() {
  var p = document.getElementById('password-input').value.trim();
  if (!p) return;
  pw = p;
  attemptLoad(p);
}

function logout() {
  try { localStorage.removeItem('admin_pw'); } catch (e) {}
  try { sessionStorage.removeItem('admin_pw'); } catch (e) {}
  pw = '';
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('login-screen').style.display = 'block';
  document.getElementById('password-input').value = '';
  document.getElementById('login-error').textContent = '';
}

async function attemptLoad(p) {
  var resp = await fetch(API_TESTERS + '?type=pending&password=' + encodeURIComponent(p));
  if (resp.status === 401) {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('login-error').textContent = 'Wrong password.';
    return;
  }
  try { localStorage.setItem('admin_pw', p); } catch (e) {}
  try { sessionStorage.removeItem('admin_pw'); } catch (e) {}
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  renderPendingData(await resp.json());
  loadedTabs = {};
  if (location.hash && location.hash.replace(/^#/, '')) {
    tabFromHash();
  } else {
    loadTab(currentTab());
  }
}

function loadAll() {
  var name = currentTab();
  delete loadedTabs[name];
  loadTab(name);
  if (_userUid) loadUserDetail(_userUid);
  else if (_userQuery) searchUsers();
}

function setHtml(id, html) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

async function loadPayments() {
  document.getElementById('payments-loading').style.display = 'block';
  document.getElementById('payments-stat').style.display = 'none';
  document.getElementById('payments-chart-wrap').style.display = 'none';
  document.getElementById('payments-months-wrap').style.display = 'none';
  document.getElementById('payments-payers-wrap').style.display = 'none';
  document.getElementById('payments-table-wrap').style.display = 'none';
  document.getElementById('payments-error').style.display = 'none';
  try {
    var resp = await fetch(API_PAYMENTS + '?password=' + encodeURIComponent(pw));
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    renderPaymentsData(await resp.json());
  } catch(e) {
    document.getElementById('payments-loading').style.display = 'none';
    var el = document.getElementById('payments-error');
    el.textContent = 'Error loading payments: ' + e.message;
    el.style.display = 'block';
  }
}

function peso(n) {
  return '\\u20B1' + Number(n || 0).toLocaleString('en-PH');
}

function fmtPhDate(iso) {
  if (!iso) return '&mdash;';
  return new Date(iso).toLocaleString('en-PH',{timeZone:'Asia/Manila',month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'});
}

var _paymentsCache = null;
var _chart = null;
var _chartMode = 'month';
var _dayRange = 90;

function setChartMode(mode) {
  _chartMode = mode === 'day' ? 'day' : 'month';
  document.getElementById('chart-mode-month').classList.toggle('active', _chartMode === 'month');
  document.getElementById('chart-mode-day').classList.toggle('active', _chartMode === 'day');
  document.getElementById('chart-day-range').style.display = _chartMode === 'day' ? 'inline-flex' : 'none';
  renderPaymentsChart();
}

function setDayRange(range) {
  _dayRange = range === 'all' ? 'all' : Number(range);
  document.querySelectorAll('#chart-day-range .seg-btn').forEach(function(btn) {
    var val = btn.getAttribute('data-range');
    var on = (_dayRange === 'all' && val === 'all') || String(_dayRange) === val;
    btn.classList.toggle('active', on);
  });
  renderPaymentsChart();
}

function chartSeries() {
  if (!_paymentsCache) return [];
  if (_chartMode === 'month') {
    return _paymentsCache.byMonthAsc || (_paymentsCache.byMonth || []).slice().reverse().filter(function(m) {
      return m.monthKey !== 'unknown';
    });
  }
  var days = _paymentsCache.byDay || [];
  if (_dayRange === 'all') return days;
  if (days.length <= _dayRange) return days;
  return days.slice(days.length - _dayRange);
}

function renderPaymentsChart() {
  var wrap = document.getElementById('payments-chart-wrap');
  var canvas = document.getElementById('payments-chart');
  var empty = document.getElementById('chart-empty');
  var meta = document.getElementById('chart-meta');
  var rangeLabel = document.getElementById('chart-range-label');
  if (!wrap || !canvas || typeof Chart === 'undefined') return;

  var series = chartSeries();
  var hasActivity = series.some(function(p) { return (p.count || 0) > 0 || (p.earnings || 0) > 0; });

  wrap.style.display = 'block';
  document.getElementById('chart-day-range').style.display = _chartMode === 'day' ? 'inline-flex' : 'none';

  if (!series.length || !hasActivity) {
    if (_chart) { _chart.destroy(); _chart = null; }
    canvas.style.display = 'none';
    empty.style.display = 'block';
    meta.textContent = '';
    rangeLabel.textContent = 'Asia/Manila timezone';
    return;
  }

  canvas.style.display = 'block';
  empty.style.display = 'none';

  var labels = series.map(function(p) { return p.shortLabel || p.label; });
  var counts = series.map(function(p) { return Number(p.count || 0); });
  var earnings = series.map(function(p) { return Number(p.earnings || 0); });
  var totalEarn = earnings.reduce(function(a, b) { return a + b; }, 0);
  var totalCount = counts.reduce(function(a, b) { return a + b; }, 0);
  var peakEarn = Math.max.apply(null, earnings.concat([0]));
  var peakCount = Math.max.apply(null, counts.concat([0]));

  rangeLabel.textContent = (_chartMode === 'month' ? 'Monthly' : 'Daily')
    + ' · Asia/Manila · ' + (series[0].label || '') + ' → ' + (series[series.length - 1].label || '');

  meta.innerHTML = '<span>Points <strong>' + series.length + '</strong></span>'
    + '<span>Payments <strong>' + totalCount + '</strong></span>'
    + '<span>Earnings <strong>' + peso(totalEarn) + '</strong></span>'
    + '<span>Peak day/month <strong>' + peso(peakEarn) + '</strong> / <strong>' + peakCount + '</strong> payments</span>';

  var maxCount = Math.max(peakCount, 1);
  var maxEarn = Math.max(peakEarn, 1);
  // Nice integer ticks
  var countTop = Math.ceil(maxCount * 1.15);
  if (countTop < 4) countTop = 4;
  var earnTop = Math.ceil((maxEarn * 1.15) / 25) * 25;
  if (earnTop < 100) earnTop = 100;

  var dense = series.length > 45;
  var tickStep = dense ? Math.ceil(series.length / 10) : (series.length > 20 ? 2 : 1);

  if (_chart) { _chart.destroy(); _chart = null; }

  _chart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: 'Payments',
          data: counts,
          yAxisID: 'yCount',
          order: 2,
          borderRadius: 6,
          borderSkipped: false,
          maxBarThickness: _chartMode === 'month' ? 42 : 18,
          backgroundColor: 'rgba(245, 200, 66, 0.82)',
          hoverBackgroundColor: 'rgba(255, 217, 94, 1)',
        },
        {
          type: 'line',
          label: 'Earnings (\\u20B1)',
          data: earnings,
          yAxisID: 'yEarn',
          order: 1,
          tension: 0.28,
          borderWidth: 2.5,
          borderColor: '#34D399',
          backgroundColor: 'rgba(52, 211, 153, 0.07)',
          fill: true,
          pointRadius: dense ? 0 : (_chartMode === 'month' ? 4 : 2.5),
          pointHoverRadius: 5,
          pointBackgroundColor: '#34D399',
          pointBorderColor: '#0A0C11',
          pointBorderWidth: 1.5,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(18, 21, 30, 0.96)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          borderWidth: 1,
          titleFont: { family: 'Inter', weight: '700', size: 13 },
          bodyFont: { family: 'Inter', size: 12 },
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            title: function(items) {
              var i = items[0] && items[0].dataIndex;
              return (series[i] && series[i].label) || '';
            },
            label: function(ctx) {
              if (ctx.dataset.yAxisID === 'yEarn') return ' Earnings: ' + peso(ctx.parsed.y);
              return ' Payments: ' + ctx.parsed.y;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#8B92A7',
            font: { size: 11, weight: '600' },
            maxRotation: dense ? 0 : 0,
            autoSkip: false,
            callback: function(val, idx) {
              if (idx % tickStep !== 0 && idx !== labels.length - 1) return '';
              return labels[idx];
            }
          },
          border: { color: 'rgba(255, 255, 255, 0.10)' }
        },
        yCount: {
          position: 'left',
          beginAtZero: true,
          suggestedMax: countTop,
          ticks: {
            color: '#F5C842',
            font: { size: 11, weight: '600' },
            precision: 0,
            stepSize: Math.max(1, Math.ceil(countTop / 4))
          },
          grid: { color: 'rgba(255, 255, 255, 0.06)' },
          border: { display: false },
          title: {
            display: true,
            text: 'Payments',
            color: '#F5C842',
            font: { size: 11, weight: '700' }
          }
        },
        yEarn: {
          position: 'right',
          beginAtZero: true,
          suggestedMax: earnTop,
          ticks: {
            color: '#34D399',
            font: { size: 11, weight: '600' },
            callback: function(v) { return '\\u20B1' + Number(v).toLocaleString('en-PH'); }
          },
          grid: { drawOnChartArea: false },
          border: { display: false },
          title: {
            display: true,
            text: 'Earnings (\\u20B1)',
            color: '#34D399',
            font: { size: 11, weight: '700' }
          }
        }
      }
    }
  });
}

function renderPaymentsData(data) {
  _paymentsCache = data;
  document.getElementById('payments-loading').style.display = 'none';
  document.getElementById('payments-total-earn').textContent = peso(data.totalEarnings);
  var cm = data.currentMonth || {};
  document.getElementById('payments-month-earn').textContent = peso(cm.earnings);
  document.getElementById('payments-month-label').textContent =
    (cm.label || 'This month') + ' \\u00B7 ' + (cm.count || 0) + ' payment' + ((cm.count || 0) === 1 ? '' : 's');
  document.getElementById('payments-count').textContent = data.count;
  document.getElementById('payments-unique').textContent = data.uniquePayers != null ? data.uniquePayers : data.count;
  document.getElementById('payments-repeat').textContent = data.repeatPayers != null ? data.repeatPayers : 0;
  document.getElementById('payments-stat').style.display = 'grid';

  renderPaymentsChart();

  var monthsBody = document.getElementById('payments-months-body');
  monthsBody.innerHTML = '';
  var monthsCards = '';
  if (!data.byMonth || data.byMonth.length === 0) {
    monthsBody.innerHTML = '<tr><td colspan="4" class="empty-state">No earnings yet.</td></tr>';
    monthsCards = '<div class="empty-state">No earnings yet.</div>';
  } else {
    data.byMonth.forEach(function(m) {
      monthsBody.innerHTML += '<tr>'
        + '<td><strong>' + esc(m.label) + '</strong></td>'
        + '<td>' + m.count + '</td>'
        + '<td>' + m.uniquePayers + '</td>'
        + '<td style="font-weight:800;white-space:nowrap">' + peso(m.earnings) + '</td>'
        + '</tr>';
      monthsCards += '<div class="m-card"><div class="m-card-top"><div class="m-card-title">'
        + esc(m.label) + '</div><div class="m-card-value">' + peso(m.earnings)
        + '</div></div><div class="m-row"><span>Payments</span><strong>' + m.count
        + '</strong></div><div class="m-row"><span>Unique payers</span><strong>' + m.uniquePayers
        + '</strong></div></div>';
    });
  }
  setHtml('payments-months-cards', monthsCards);
  document.getElementById('payments-months-wrap').style.display = 'block';

  renderPayersTable();
  document.getElementById('payments-payers-wrap').style.display = 'block';

  var tbody = document.getElementById('payments-body');
  tbody.innerHTML = '';
  var payCards = '';
  if (!data.payments || data.payments.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No paid subscriptions yet.</td></tr>';
    payCards = '<div class="empty-state">No paid subscriptions yet.</div>';
  } else {
    data.payments.forEach(function(p, i) {
      var date = fmtPhDate(p.paidAt);
      var amount = p.amount != null ? peso(p.amount) : '&mdash;';
      var ref = p.referenceNumber
        ? '<span class="uid" title="'+esc(p.referenceNumber)+'">' + esc(String(p.referenceNumber).slice(0,14)) + (String(p.referenceNumber).length > 14 ? '&hellip;' : '') + '</span>'
          + (p.manualReview ? ' <span class="badge badge-pending">Manual</span>' : '')
        : '&mdash;';
      var uid = p.uid ? '<span class="uid" title="'+esc(p.uid)+'">' + esc(p.uid.slice(0,12)) + '&hellip;</span>' : '&mdash;';
      tbody.innerHTML += '<tr>'
        + '<td style="color:#94A3B8;font-weight:700">' + (i+1) + '</td>'
        + '<td><strong>' + (p.name ? esc(p.name) : '&mdash;') + '</strong></td>'
        + '<td>' + esc(p.email) + '</td>'
        + '<td style="white-space:nowrap;font-size:12px">' + date + '</td>'
        + '<td style="white-space:nowrap;font-weight:700">' + amount + '</td>'
        + '<td>' + ref + '</td>'
        + '<td>' + uid + '</td>'
        + '</tr>';
      payCards += '<div class="m-card"><div class="m-card-top"><div><div class="m-card-title">'
        + (p.name ? esc(p.name) : esc(p.email || 'Payment')) + '</div><div class="m-card-sub">'
        + esc(p.email || '') + '</div></div><div class="m-card-value">' + amount
        + '</div></div><div class="m-row"><span>Paid at</span><strong>' + date
        + '</strong></div><div class="m-row"><span>Ref</span><strong>' + ref
        + '</strong></div></div>';
    });
  }
  setHtml('payments-cards', payCards);
  document.getElementById('payments-table-wrap').style.display = 'block';
}

function renderPayersTable() {
  var data = _paymentsCache;
  var tbody = document.getElementById('payments-payers-body');
  if (!data || !tbody) return;
  tbody.innerHTML = '';
  var list = data.byPayer || [];
  var onlyRepeat = document.getElementById('payments-repeat-only') && document.getElementById('payments-repeat-only').checked;
  if (onlyRepeat) list = list.filter(function(p) { return p.paymentCount > 1; });

  if (list.length === 0) {
    var empty = onlyRepeat ? 'No one has paid more than once yet.' : 'No payers yet.';
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state">' + empty + '</td></tr>';
    setHtml('payments-payers-cards', '<div class="empty-state">' + empty + '</div>');
    return;
  }

  var cards = '';
  list.forEach(function(p, i) {
    var timesBadge = p.paymentCount > 1
      ? '<span class="badge badge-extended">' + p.paymentCount + 'x</span>'
      : '<span class="badge badge-no">1x</span>';
    var uid = p.uid ? '<span class="uid" title="'+esc(p.uid)+'">' + esc(p.uid.slice(0,12)) + '&hellip;</span>' : '&mdash;';
    tbody.innerHTML += '<tr' + (p.paymentCount > 1 ? ' style="background:rgba(245,200,66,0.05)"' : '') + '>'
      + '<td style="color:#94A3B8;font-weight:700">' + (i+1) + '</td>'
      + '<td><strong>' + (p.name ? esc(p.name) : '&mdash;') + '</strong></td>'
      + '<td>' + esc(p.email) + '</td>'
      + '<td>' + timesBadge + '</td>'
      + '<td style="font-weight:800;white-space:nowrap">' + peso(p.totalPaid) + '</td>'
      + '<td style="white-space:nowrap;font-size:12px">' + fmtPhDate(p.firstPaidAt) + '</td>'
      + '<td style="white-space:nowrap;font-size:12px">' + fmtPhDate(p.lastPaidAt) + '</td>'
      + '<td>' + uid + '</td>'
      + '</tr>';
    cards += '<div class="m-card"><div class="m-card-top"><div><div class="m-card-title">'
      + (p.name ? esc(p.name) : esc(p.email || 'Payer')) + '</div><div class="m-card-sub">'
      + esc(p.email || '') + '</div></div><div class="m-card-value">' + peso(p.totalPaid)
      + '</div></div><div class="m-meta">' + timesBadge + '</div><div class="m-row"><span>First</span><strong>'
      + fmtPhDate(p.firstPaidAt) + '</strong></div><div class="m-row"><span>Last</span><strong>'
      + fmtPhDate(p.lastPaidAt) + '</strong></div></div>';
  });
  setHtml('payments-payers-cards', cards);
}

async function loadBetaTesters() {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('beta-stat').style.display = 'none';
  document.getElementById('table-wrap').style.display = 'none';
  document.getElementById('error-msg').style.display = 'none';
  try {
    var resp = await fetch(API_TESTERS + '?password=' + encodeURIComponent(pw));
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    renderBetaData(await resp.json());
  } catch(e) {
    document.getElementById('loading').style.display = 'none';
    var el = document.getElementById('error-msg');
    el.textContent = 'Error: ' + e.message;
    el.style.display = 'block';
  }
}

function renderBetaData(data) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('total-count').textContent = data.count;
  document.getElementById('beta-stat').style.display = 'grid';
  var tbody = document.getElementById('testers-body');
  tbody.innerHTML = '';
  var cards = '';
  if (!data.testers || data.testers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No premium testers yet.</td></tr>';
    cards = '<div class="empty-state">No premium testers yet.</div>';
  } else {
    data.testers.forEach(function(t, i) {
      var date = t.betaRewardGrantedAt
        ? new Date(t.betaRewardGrantedAt).toLocaleString('en-PH',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'})
        : '&mdash;';
      var badge = t.alreadyPremium
        ? '<span class="badge badge-extended">Active</span>'
        : '<span class="badge badge-active">Granted</span>';
      tbody.innerHTML += '<tr>'
        + '<td style="color:#94A3B8;font-weight:700">' + (i+1) + '</td>'
        + '<td><strong>' + esc(t.email) + '</strong></td>'
        + '<td style="white-space:nowrap">' + date + '</td>'
        + '<td>' + badge + '</td>'
        + '<td class="uid">' + t.uid.slice(0,12) + '&hellip;</td>'
        + '</tr>';
      cards += '<div class="m-card"><div class="m-card-top"><div class="m-card-title">'
        + esc(t.email) + '</div>' + badge + '</div><div class="m-row"><span>Granted</span><strong>'
        + date + '</strong></div></div>';
    });
  }
  setHtml('testers-cards', cards);
  document.getElementById('table-wrap').style.display = 'block';
}

async function loadPendingTesters() {
  document.getElementById('pending-loading').style.display = 'block';
  document.getElementById('pending-stat').style.display = 'none';
  document.getElementById('pending-table-wrap').style.display = 'none';
  document.getElementById('pending-error').style.display = 'none';
  try {
    var resp = await fetch(API_TESTERS + '?type=pending&password=' + encodeURIComponent(pw));
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    renderPendingData(await resp.json());
  } catch(e) {
    document.getElementById('pending-loading').style.display = 'none';
    var el = document.getElementById('pending-error');
    el.textContent = 'Error loading pending testers: ' + e.message;
    el.style.display = 'block';
  }
}

function renderPendingData(data) {
  document.getElementById('pending-loading').style.display = 'none';
  document.getElementById('pending-count').textContent = data.count;
  document.getElementById('pending-stat').style.display = 'grid';
  var tbody = document.getElementById('pending-body');
  tbody.innerHTML = '';
  if (!data.testers || data.testers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state">No signups yet.</td></tr>';
    setHtml('pending-cards', '<div class="empty-state">No signups yet.</div>');
    document.getElementById('pending-table-wrap').style.display = 'block';
    return;
  }
  var cards = '';
  data.testers.forEach(function(t, i) {
    var date = t.registeredAt
      ? new Date(t.registeredAt).toLocaleString('en-PH',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'})
      : '&mdash;';

    var dlBadge   = t.downloadReady  ? '<span class="badge badge-ready">Approved</span>'  : '<span class="badge badge-no">Locked</span>';
    var optBadge  = t.optedIn        ? '<span class="badge badge-optedin">Opted In</span>' : '<span class="badge badge-no">Pending</span>';
    var premBadge = t.premiumGranted ? '<span class="badge badge-granted">Granted</span>'  : '<span class="badge badge-no">No</span>';

    var dlBtn = t.downloadReady
      ? '<button class="toggle-btn on" data-uid="'+esc(t.uid)+'" data-field="downloadReady" data-value="false" onclick="toggle(this)">Revoke DL</button>'
      : '<button class="toggle-btn off" data-uid="'+esc(t.uid)+'" data-field="downloadReady" data-value="true" onclick="toggle(this)">Approve DL</button>';

    var optBtn = t.optedIn
      ? '<button class="toggle-btn danger-on" data-uid="'+esc(t.uid)+'" data-field="optedIn" data-value="false" onclick="toggle(this)"'+(t.premiumGranted?' title="Premium already granted"':'')+'>Revoke</button>'
      : '<button class="toggle-btn danger-off" data-uid="'+esc(t.uid)+'" data-field="optedIn" data-value="true" onclick="toggle(this)">Grant Premium</button>';

    tbody.innerHTML += '<tr id="row-'+esc(t.uid)+'">'
      + '<td style="color:#94A3B8;font-weight:700">' + (i+1) + '</td>'
      + '<td><strong>' + esc(t.email) + '</strong></td>'
      + '<td style="white-space:nowrap;font-size:12px">' + date + '</td>'
      + '<td id="dl-badge-'+esc(t.uid)+'">' + dlBadge + '</td>'
      + '<td id="opt-badge-'+esc(t.uid)+'">' + optBadge + '</td>'
      + '<td id="prem-badge-'+esc(t.uid)+'">' + premBadge + '</td>'
      + '<td><div class="actions-cell" id="actions-'+esc(t.uid)+'">' + dlBtn + optBtn + '</div></td>'
      + '<td class="uid">' + t.uid.slice(0,12) + '&hellip;</td>'
      + '</tr>';

    cards += '<div class="m-card" id="mcard-'+esc(t.uid)+'">'
      + '<div class="m-card-title">' + esc(t.email) + '</div>'
      + '<div class="m-card-sub">Registered ' + date + '</div>'
      + '<div class="m-meta">' + dlBadge + optBadge + premBadge + '</div>'
      + '<div class="m-actions">' + dlBtn + optBtn + '</div>'
      + '</div>';
  });
  setHtml('pending-cards', cards);
  document.getElementById('pending-table-wrap').style.display = 'block';
}

async function toggle(btn) {
  var uid   = btn.dataset.uid;
  var field = btn.dataset.field;
  var value = btn.dataset.value === 'true';
  btn.disabled = true;
  var orig = btn.textContent;
  btn.textContent = '...';
  try {
    var resp = await fetch(API_TOGGLE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, uid: uid, field: field, value: value }),
    });
    if (!resp.ok) {
      var body = await resp.json().catch(function(){ return {} });
      throw new Error(body.error || 'HTTP ' + resp.status);
    }
    loadPendingTesters();
    if (field === 'optedIn' && value) loadBetaTesters();
  } catch(e) {
    btn.textContent = orig;
    btn.disabled = false;
    alert('Failed: ' + e.message);
  }
}

async function loadTwaUsers() {
  document.getElementById('twa-loading').style.display = 'block';
  document.getElementById('twa-stat').style.display = 'none';
  document.getElementById('twa-table-wrap').style.display = 'none';
  document.getElementById('twa-error').style.display = 'none';
  try {
    var resp = await fetch(API_TWA + '?password=' + encodeURIComponent(pw));
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    renderTwaData(await resp.json());
  } catch(e) {
    document.getElementById('twa-loading').style.display = 'none';
    var el = document.getElementById('twa-error');
    el.textContent = 'Error loading TWA users: ' + e.message;
    el.style.display = 'block';
  }
}

function renderTwaData(data) {
  document.getElementById('twa-loading').style.display = 'none';
  document.getElementById('twa-count').textContent = data.count;
  document.getElementById('twa-stat').style.display = 'grid';
  var tbody = document.getElementById('twa-body');
  tbody.innerHTML = '';
  var cards = '';
  if (!data.users || data.users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No TWA installs detected yet.</td></tr>';
    cards = '<div class="empty-state">No TWA installs detected yet.</div>';
  } else {
    data.users.forEach(function(u, i) {
      var date = u.detectedAt
        ? new Date(u.detectedAt).toLocaleString('en-PH',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'})
        : '&mdash;';
      var testerBadge = u.testerStatus === 'ready'
        ? '<span class="badge badge-ready">Ready</span>'
        : u.testerStatus === 'pending'
          ? '<span class="badge badge-pending">Pending</span>'
          : '<span class="badge badge-no">None</span>';
      var premBadge = u.isPremium
        ? '<span class="badge badge-active">Premium</span>'
        : '<span class="badge badge-no">No</span>';
      tbody.innerHTML += '<tr>'
        + '<td style="color:#94A3B8;font-weight:700">' + (i+1) + '</td>'
        + '<td><strong>' + esc(u.email) + '</strong>' + (u.name ? '<br><span style="font-size:11px;color:#94A3B8">' + esc(u.name) + '</span>' : '') + '</td>'
        + '<td style="white-space:nowrap;font-size:12px">' + date + '</td>'
        + '<td>' + testerBadge + '</td>'
        + '<td>' + premBadge + '</td>'
        + '<td class="uid">' + u.uid.slice(0,12) + '&hellip;</td>'
        + '</tr>';
      cards += '<div class="m-card"><div class="m-card-title">' + esc(u.email) + '</div>'
        + (u.name ? '<div class="m-card-sub">' + esc(u.name) + '</div>' : '')
        + '<div class="m-meta">' + testerBadge + premBadge + '</div>'
        + '<div class="m-row"><span>First detected</span><strong>' + date + '</strong></div></div>';
    });
  }
  setHtml('twa-cards', cards);
  document.getElementById('twa-table-wrap').style.display = 'block';
}

var _surveysCache = null;

async function loadSurveys() {
  document.getElementById('survey-loading').style.display = 'block';
  document.getElementById('survey-stat').style.display = 'none';
  document.getElementById('survey-dist').style.display = 'none';
  document.getElementById('survey-table-wrap').style.display = 'none';
  document.getElementById('survey-error').style.display = 'none';
  try {
    var resp = await fetch(API_SURVEYS + '?type=surveys&password=' + encodeURIComponent(pw));
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    renderSurveysData(await resp.json());
  } catch(e) {
    document.getElementById('survey-loading').style.display = 'none';
    var el = document.getElementById('survey-error');
    el.textContent = 'Error loading survey answers: ' + e.message;
    el.style.display = 'block';
  }
}

function starStr(n) {
  var s = '';
  var i;
  for (i = 1; i <= 5; i++) s += i <= n ? '\\u2605' : '\\u2606';
  return s;
}

function renderSurveysData(data) {
  _surveysCache = data;
  document.getElementById('survey-loading').style.display = 'none';
  document.getElementById('survey-count').textContent = data.count || 0;
  document.getElementById('survey-avg').textContent = data.averageStars != null ? data.averageStars : 0;
  document.getElementById('survey-stat').style.display = 'grid';

  var dist = document.getElementById('survey-dist');
  var byStars = data.byStars || {};
  var total = data.ratedCount || data.count || 0;
  var distHtml = '';
  var star;
  for (star = 5; star >= 1; star--) {
    var count = byStars[star] || 0;
    var pct = total ? Math.round((count / total) * 100) : 0;
    distHtml += '<div class="star-dist-row"><span class="survey-stars">' + starStr(star)
      + '</span><div class="star-dist-bar"><div class="star-dist-fill" style="width:' + pct
      + '%"></div></div><span>' + count + '</span></div>';
  }
  dist.innerHTML = distHtml;
  dist.style.display = 'flex';
  renderSurveysTable();
  document.getElementById('survey-table-wrap').style.display = 'block';
}

function renderSurveysTable() {
  var data = _surveysCache;
  var tbody = document.getElementById('survey-body');
  if (!data || !tbody) return;
  var list = data.responses || [];
  var filterEl = document.getElementById('survey-star-filter');
  var filter = filterEl && filterEl.value ? filterEl.value : 'all';
  if (filter !== 'all') {
    var want = Number(filter);
    list = list.filter(function(r) { return r.stars === want; });
  }

  tbody.innerHTML = '';
  if (!list.length) {
    var empty = filter === 'all' ? 'No survey answers yet.' : 'No answers with that rating.';
    tbody.innerHTML = '<tr><td colspan="7" class="empty-state">' + empty + '</td></tr>';
    setHtml('survey-cards', '<div class="empty-state">' + empty + '</div>');
    return;
  }

  var cards = '';
  list.forEach(function(r, i) {
    var date = fmtPhDate(r.submittedAt);
    var uid = r.uid ? '<span class="uid" title="'+esc(r.uid)+'">' + esc(r.uid.slice(0,12)) + '&hellip;</span>' : '&mdash;';
    var starsHtml = r.stars
      ? '<span class="survey-stars" title="'+esc(String(r.stars))+' / 5">' + starStr(r.stars) + '</span>'
      : '&mdash;';
    var msg = r.opinion ? esc(r.opinion) : '&mdash;';
    tbody.innerHTML += '<tr>'
      + '<td style="color:#94A3B8;font-weight:700">' + (i+1) + '</td>'
      + '<td><strong>' + (r.name ? esc(r.name) : '&mdash;') + '</strong></td>'
      + '<td>' + esc(r.email || '') + '</td>'
      + '<td>' + starsHtml + '</td>'
      + '<td class="survey-msg">' + msg + '</td>'
      + '<td style="white-space:nowrap;font-size:12px">' + date + '</td>'
      + '<td>' + uid + '</td>'
      + '</tr>';
    cards += '<div class="m-card"><div class="m-card-top"><div><div class="m-card-title">'
      + (r.name ? esc(r.name) : esc(r.email || 'User')) + '</div><div class="m-card-sub">'
      + esc(r.email || '') + '</div></div>' + starsHtml + '</div>'
      + '<p class="survey-msg" style="margin:8px 0 10px;font-size:13px;font-weight:600;color:var(--ink)">' + msg + '</p>'
      + '<div class="m-row"><span>Submitted</span><strong>' + date + '</strong></div></div>';
  });
  setHtml('survey-cards', cards);
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

var _userQuery = '';
var _userUid = '';
var _grantFlash = '';
var BODY_ALWAYS = ['name', 'email', 'height', 'weight', 'age', 'gender'];
var BODY_FIELDS = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['testerEmail', 'Tester email'],
  ['height', 'Height (cm)'],
  ['weight', 'Weight (kg)'],
  ['age', 'Age'],
  ['gender', 'Gender'],
  ['activityLevel', 'Activity'],
  ['activity', 'Activity (legacy)'],
  ['goal', 'Goal'],
  ['goalOption', 'Goal option'],
  ['dailyAdjustment', 'Daily adjustment (kcal)'],
  ['targetWeight', 'Target weight (kg)'],
  ['targetDate', 'Target date'],
  ['goalStartWeight', 'Start weight (kg)'],
  ['bmr', 'BMR'],
  ['tdee', 'TDEE'],
  ['calorieGoal', 'Calorie goal'],
  ['waterGoalL', 'Water goal (L)'],
  ['useCustomMacros', 'Custom macros'],
  ['useCustomFiber', 'Custom fiber'],
  ['useCustomSugar', 'Custom sugar']
];
var ACCOUNT_FIELDS = [
  ['isPremium', 'Premium'],
  ['premiumExpiry', 'Premium expiry'],
  ['premiumSince', 'Premium since'],
  ['adminPremiumGranted', 'Admin premium grant'],
  ['adminPremiumGrantedAt', 'Admin granted at'],
  ['adminPremiumDuration', 'Admin duration'],
  ['lastRefNumber', 'Last payment ref'],
  ['trialUsed', 'Trial used'],
  ['trialStartedAt', 'Trial started'],
  ['setupComplete', 'Setup complete'],
  ['createdAt', 'Profile created'],
  ['lastOpenedAt', 'Last opened app'],
  ['lastOpenedDate', 'Last opened date'],
  ['isTWA', 'Play Store app'],
  ['twaDetectedAt', 'App first detected'],
  ['testerStatus', 'Tester status'],
  ['testerRegisteredAt', 'Tester registered'],
  ['betaRewardGranted', 'Beta reward'],
  ['betaRewardGrantedAt', 'Beta granted at'],
  ['streakCount', 'Current streak'],
  ['longestStreak', 'Longest streak'],
  ['lastLogDate', 'Last log date'],
  ['totalLogs', 'Total food logs'],
  ['streakFrozen', 'Streak frozen'],
  ['freezeExpiresAt', 'Freeze expires'],
  ['streakPaused', 'Streak paused'],
  ['streakPausedAt', 'Paused at'],
  ['shareStories', 'Share stories'],
  ['notificationsEnabled', 'Notifications'],
  ['weightTrackingSurveyCompleted', 'Weight survey done'],
  ['weightTrackingSurveyStars', 'Weight survey stars'],
  ['weightTrackingSurveySubmittedAt', 'Weight survey at']
];
var USER_SKIP = {};
BODY_FIELDS.concat(ACCOUNT_FIELDS).forEach(function(pair) { USER_SKIP[pair[0]] = true; });
USER_SKIP.macros = true;
USER_SKIP.customMacros = true;
USER_SKIP.aiProfile = true;
USER_SKIP.photoURL = true;
USER_SKIP.fcmToken = true;
USER_SKIP.fcmTokens = true;
USER_SKIP._notifDebug = true;

function displayVal(v) {
  if (v == null || v === '') return '&mdash;';
  if (typeof v === 'boolean') return v
    ? '<span class="badge badge-active">Yes</span>'
    : '<span class="badge badge-no">No</span>';
  if (typeof v === 'number') return esc(String(v));
  if (typeof v === 'string') {
    if (/^\d{4}-\d{2}-\d{2}T/.test(v)) return esc(fmtPhDate(v));
    return esc(v);
  }
  return '<span class="uid">' + esc(JSON.stringify(v)) + '</span>';
}

function kvCard(label, valueHtml) {
  return '<div class="kv-card"><div class="kv-label">' + esc(label) + '</div><div class="kv-value">' + valueHtml + '</div></div>';
}

function initials(name, email) {
  var src = String(name || email || '?').trim();
  return esc(src.slice(0, 1).toUpperCase());
}

function avatarHtml(url, name, email, cls) {
  if (url) return '<div class="' + cls + '"><img src="' + esc(url) + '" alt="" referrerpolicy="no-referrer"/></div>';
  return '<div class="' + cls + '">' + initials(name, email) + '</div>';
}

function prettyJson(obj) {
  try { return esc(JSON.stringify(obj, null, 2)); }
  catch (e) { return esc(String(obj)); }
}

function manilaDate() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' });
}

async function loadDailyOpens() {
  if (!pw) return;
  var dateInput = document.getElementById('opens-date');
  if (dateInput && !dateInput.value) dateInput.value = manilaDate();
  var date = dateInput && dateInput.value ? dateInput.value : manilaDate();
  var loading = document.getElementById('opens-loading');
  var err = document.getElementById('opens-error');
  if (loading) loading.style.display = 'block';
  if (err) err.style.display = 'none';
  try {
    var resp = await fetch(API_USERS + '?type=opens&password=' + encodeURIComponent(pw) + '&date=' + encodeURIComponent(date));
    var data = await resp.json().catch(function() { return {}; });
    if (!resp.ok) throw new Error(data.error || ('HTTP ' + resp.status));
    renderDailyOpens(data);
  } catch (e) {
    if (loading) loading.style.display = 'none';
    if (err) {
      err.textContent = 'Could not load daily opens: ' + e.message;
      err.style.display = 'block';
    }
  }
}

function renderDailyOpens(data) {
  var loading = document.getElementById('opens-loading');
  if (loading) loading.style.display = 'none';
  document.getElementById('opens-count').textContent = data.count != null ? data.count : 0;
  document.getElementById('opens-date-label').textContent = data.date || manilaDate();
  var list = data.users || [];
  var wrap = document.getElementById('opens-list');
  if (!list.length) {
    wrap.innerHTML = '<div class="empty-state">No one has opened the app on this day yet. Count starts after users update the app and open it.</div>';
    return;
  }
  var html = '';
  list.forEach(function(u) {
    html += '<button type="button" class="match-card" data-uid="' + esc(u.uid) + '" onclick="loadUserDetail(this.dataset.uid)">'
      + avatarHtml(u.photoURL, u.name, u.email, 'match-avatar')
      + '<div class="match-meta"><div class="m-card-title">' + esc(u.name || u.email || '(no name)') + '</div>'
      + '<div class="m-card-sub">' + esc(u.email || '') + (u.openedAt ? ' · ' + esc(fmtPhDate(u.openedAt)) : '') + '</div></div>'
      + '</button>';
  });
  wrap.innerHTML = html;
}

async function searchUsers(ev) {
  if (ev && ev.preventDefault) ev.preventDefault();
  var input = document.getElementById('user-search-input');
  var q = (input && input.value || _userQuery || '').trim();
  if (q.length < 2) {
    var err = document.getElementById('users-error');
    err.textContent = 'Enter at least 2 characters.';
    err.style.display = 'block';
    return false;
  }
  _userQuery = q;
  _userUid = '';
  document.getElementById('users-error').style.display = 'none';
  document.getElementById('users-detail').innerHTML = '';
  document.getElementById('users-matches').innerHTML = '';
  document.getElementById('users-loading').style.display = 'block';
  document.getElementById('user-search-btn').disabled = true;
  if (ev) switchTab('users');
  try {
    var resp = await fetch(API_USERS + '?type=search&password=' + encodeURIComponent(pw) + '&q=' + encodeURIComponent(q));
    var data = await resp.json().catch(function() { return {}; });
    if (!resp.ok) throw new Error(data.error || ('HTTP ' + resp.status));
    if (data.error) throw new Error(data.error);
    renderUserMatches(data);
    if (data.matches && data.matches.length === 1) {
      loadUserDetail(data.matches[0].uid);
    }
  } catch (e) {
    document.getElementById('users-loading').style.display = 'none';
    var box = document.getElementById('users-error');
    box.textContent = 'Search failed: ' + e.message;
    box.style.display = 'block';
  }
  document.getElementById('user-search-btn').disabled = false;
  return false;
}

function renderUserMatches(data) {
  document.getElementById('users-loading').style.display = 'none';
  var wrap = document.getElementById('users-matches');
  var list = data.matches || [];
  if (!list.length) {
    wrap.innerHTML = '<div class="empty-state">No users matched that search.</div>';
    return;
  }
  var html = '';
  if (data.truncated) {
    html += '<p class="hint" style="margin-bottom:8px">Showing the first ' + list.length + ' matches. Try a more specific name or email.</p>';
  } else {
    html += '<p class="hint" style="margin-bottom:8px">' + list.length + ' match' + (list.length === 1 ? '' : 'es') + '</p>';
  }
  list.forEach(function(u) {
    var stats = [];
    if (u.height != null && u.height !== '') stats.push(u.height + ' cm');
    if (u.weight != null && u.weight !== '') stats.push(u.weight + ' kg');
    if (u.age != null && u.age !== '') stats.push('age ' + u.age);
    html += '<button type="button" class="match-card" id="match-' + esc(u.uid) + '" data-uid="' + esc(u.uid) + '" onclick="loadUserDetail(this.dataset.uid)">'
      + avatarHtml(u.photoURL, u.name, u.email, 'match-avatar')
      + '<div class="match-meta"><div class="m-card-title">' + esc(u.name || u.email || '(no name)') + '</div>'
      + '<div class="m-card-sub">' + esc(u.email || u.testerEmail || '') + (stats.length ? ' · ' + esc(stats.join(' · ')) : '') + '</div></div>'
      + (u.isPremium ? '<span class="badge badge-active">Premium</span>' : '')
      + '</button>';
  });
  wrap.innerHTML = html;
}

async function loadUserDetail(uid) {
  _userUid = uid;
  document.querySelectorAll('.match-card').forEach(function(el) {
    el.classList.toggle('active', el.id === 'match-' + uid);
  });
  var detail = document.getElementById('users-detail');
  detail.innerHTML = '<div class="loading-state">Loading full Firestore record&hellip;</div>';
  document.getElementById('users-error').style.display = 'none';
  try {
    var resp = await fetch(API_USERS + '?type=user&password=' + encodeURIComponent(pw) + '&uid=' + encodeURIComponent(uid));
    var data = await resp.json().catch(function() { return {}; });
    if (!resp.ok) throw new Error(data.error || ('HTTP ' + resp.status));
    renderUserDetail(data);
  } catch (e) {
    detail.innerHTML = '';
    var box = document.getElementById('users-error');
    box.textContent = 'Failed to load user: ' + e.message;
    box.style.display = 'block';
  }
}

function macrosHtml(m) {
  if (!m || typeof m !== 'object') return '&mdash;';
  var parts = [];
  if (m.protein != null) parts.push('P ' + m.protein + 'g');
  if (m.carbs != null) parts.push('C ' + m.carbs + 'g');
  if (m.fat != null) parts.push('F ' + m.fat + 'g');
  if (m.fiber != null) parts.push('Fiber ' + m.fiber + 'g');
  if (m.sugar != null) parts.push('Sugar ' + m.sugar + 'g');
  return parts.length ? esc(parts.join(' · ')) : prettyJson(m);
}

function renderUserDetail(data) {
  var p = data.profile || {};
  var auth = data.auth || {};
  var name = p.name || auth.displayName || null;
  var email = p.email || p.testerEmail || auth.email || '';
  var photo = p.photoURL || auth.photoURL || null;
  var html = '';

  html += '<div class="user-hero">';
  html += avatarHtml(photo, name, email, 'user-hero-photo');
  html += '<div style="min-width:0;flex:1">';
  html += '<div style="font-size:20px;font-weight:800">' + esc(name || email || 'Unknown user') + '</div>';
  html += '<div class="m-card-sub" style="margin-top:4px">' + esc(email || 'No email') + '</div>';
  html += '<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;align-items:center">';
  if (p.isPremium) html += '<span class="badge badge-active">Premium</span>';
  if (p.isTWA) html += '<span class="badge badge-extended">Play Store app</span>';
  if (p.setupComplete) html += '<span class="badge badge-ready">Setup done</span>';
  else html += '<span class="badge badge-pending">Setup incomplete</span>';
  if (!data.exists) html += '<span class="badge badge-pending">No Firestore profile</span>';
  html += '<span class="uid" title="' + esc(data.uid) + '">' + esc(data.uid) + '</span>';
  html += '<button type="button" class="copy-btn" data-uid="' + esc(data.uid) + '" onclick="copyText(this.dataset.uid)">Copy UID</button>';
  html += '</div></div></div>';

  var currentlyPremium = p.isPremium === true && p.premiumExpiry && new Date(p.premiumExpiry) > new Date();
  var canRevoke = p.isPremium === true || currentlyPremium;
  html += '<div class="grant-box">';
  html += '<div class="block-title" style="margin-bottom:6px">Grant Premium</div>';
  html += '<p class="hint">Sets <strong>isPremium</strong> and a custom <strong>premiumExpiry</strong> on this user. Extend adds the duration onto a still-active expiry.'
    + (currentlyPremium ? ' Current expiry: <strong>' + esc(fmtPhDate(p.premiumExpiry)) + '</strong>.' : '')
    + '</p>';
  html += '<div class="grant-row">';
  html += '<input id="grant-prem-amount" class="search-input" type="number" min="1" max="3650" step="1" value="60" aria-label="Duration amount"/>';
  html += '<select id="grant-prem-unit" class="search-input" aria-label="Duration unit">';
  html += '<option value="days" selected>Days</option>';
  html += '<option value="months">Months</option>';
  html += '<option value="years">Years</option>';
  html += '</select>';
  html += '<button type="button" class="search-btn" id="grant-prem-btn" onclick="grantUserPremium()">Grant Premium</button>';
  html += '<button type="button" class="toggle-btn danger-on" id="revoke-prem-btn" onclick="revokeUserPremium()"' + (canRevoke ? '' : ' disabled') + '>Revoke</button>';
  html += '</div>';
  html += '<label class="filter-chip" style="margin-top:10px;display:inline-flex">';
  html += '<input type="checkbox" id="grant-prem-extend" checked/> Extend if already premium';
  html += '</label>';
  html += '<div id="grant-prem-status" class="grant-status"></div>';
  html += '</div>';

  html += '<div class="block-title">Body &amp; goals</div><div class="kv-grid">';
  BODY_FIELDS.forEach(function(pair) {
    var empty = p[pair[0]] == null || p[pair[0]] === '';
    if (empty && BODY_ALWAYS.indexOf(pair[0]) === -1) return;
    html += kvCard(pair[1], displayVal(p[pair[0]]));
  });
  if (p.macros) html += kvCard('Macros', macrosHtml(p.macros));
  if (p.customMacros) html += kvCard('Custom macros', macrosHtml(p.customMacros));
  html += '</div>';

  html += '<div class="block-title">Account</div><div class="kv-grid">';
  ACCOUNT_FIELDS.forEach(function(pair) {
    if (p[pair[0]] == null || p[pair[0]] === '') return;
    html += kvCard(pair[1], displayVal(p[pair[0]]));
  });
  if (auth.creationTime) html += kvCard('Auth created', displayVal(auth.creationTime));
  if (auth.lastSignInTime) html += kvCard('Last sign-in', displayVal(auth.lastSignInTime));
  if (auth.providers && auth.providers.length) html += kvCard('Auth providers', esc(auth.providers.join(', ')));
  if (auth.emailVerified != null) html += kvCard('Email verified', displayVal(auth.emailVerified));
  if (auth.disabled) html += kvCard('Auth disabled', displayVal(auth.disabled));
  if (p.fcmToken || (p.fcmTokens && typeof p.fcmTokens === 'object' && Object.keys(p.fcmTokens).length)) {
    html += kvCard('Push notifications', '<span class="badge badge-active">Token saved</span>');
  }
  html += '</div>';

  var extraKeys = Object.keys(p).filter(function(k) { return !USER_SKIP[k]; });
  if (extraKeys.length) {
    html += '<div class="block-title">Other profile fields</div><div class="kv-grid">';
    extraKeys.forEach(function(k) {
      html += kvCard(k, displayVal(p[k]));
    });
    html += '</div>';
  }

  if (p.aiProfile) {
    html += '<details class="acc" open><summary>AI profile</summary><div class="acc-body"><pre class="raw-json">' + prettyJson(p.aiProfile) + '</pre></div></details>';
  }

  html += '<details class="acc"' + (data.tester ? ' open' : '') + '><summary>Tester record <span class="badge ' + (data.tester ? 'badge-ready' : 'badge-no') + '">' + (data.tester ? 'Found' : 'None') + '</span></summary><div class="acc-body">';
  html += data.tester ? '<pre class="raw-json">' + prettyJson(data.tester) + '</pre>' : '<p class="hint">No testers/ document.</p>';
  html += '</div></details>';

  var pays = data.payments || [];
  html += '<details class="acc"' + (pays.length ? ' open' : '') + '><summary>Payments <span class="badge ' + (pays.length ? 'badge-active' : 'badge-no') + '">' + pays.length + '</span></summary><div class="acc-body">';
  if (!pays.length) html += '<p class="hint">No payments/ documents.</p>';
  else {
    html += '<div class="table-scroll"><table><thead><tr><th>Paid at</th><th>Amount</th><th>Ref</th><th>Manual</th></tr></thead><tbody>';
    pays.forEach(function(pay) {
      html += '<tr><td>' + displayVal(pay.timestamp || pay.paidAt) + '</td><td>' + (pay.amount != null ? peso(pay.amount) : '&mdash;') + '</td><td class="uid">' + esc(pay.referenceNumber || pay.id || '') + '</td><td>' + displayVal(!!pay.manualReview) + '</td></tr>';
    });
    html += '</tbody></table></div>';
  }
  html += '</div></details>';

  var subs = data.subcollections || {};
  Object.keys(subs).sort().forEach(function(colName) {
    var col = subs[colName] || {};
    var docs = col.docs || [];
    var total = col.total != null ? col.total : docs.length;
    var label = colName + ' (' + docs.length + (col.truncated ? ' of ' + total : '') + ')';
    html += '<details class="acc"' + (docs.length && (colName === 'weightLogs' || colName === 'mealPlan') ? ' open' : '') + '><summary>' + esc(label) + (col.truncated ? ' <span class="badge badge-pending">Truncated</span>' : '') + '</summary><div class="acc-body">';
    if (col.error) html += '<p class="hint">Could not load: ' + esc(col.error) + '</p>';
    else if (!docs.length) html += '<p class="hint">Empty collection.</p>';
    else if (colName === 'weightLogs') html += renderWeightTable(docs);
    else if (colName === 'foodLogs') html += renderFoodTable(docs);
    else html += '<pre class="raw-json">' + prettyJson(docs) + '</pre>';
    html += '</div></details>';
  });

  var stories = data.stories || {};
  Object.keys(stories).forEach(function(colName) {
    var rows = stories[colName];
    html += '<details class="acc"><summary>' + esc(colName) + '</summary><div class="acc-body"><pre class="raw-json">' + prettyJson(rows) + '</pre></div></details>';
  });

  html += '<details class="acc"><summary>Raw Firestore user document</summary><div class="acc-body">';
  html += '<button type="button" class="copy-btn" style="margin-bottom:10px" onclick="copyUserJson()">Copy JSON</button>';
  html += '<pre class="raw-json" id="user-raw-json">' + prettyJson({ uid: data.uid, auth: data.auth, profile: data.profile, tester: data.tester, payments: data.payments, stories: data.stories, subcollections: data.subcollections }) + '</pre></div></details>';

  document.getElementById('users-detail').innerHTML = html;
  if (_grantFlash) {
    setGrantStatus(_grantFlash, false);
    _grantFlash = '';
  }
}

function renderWeightTable(docs) {
  var html = '<div class="table-scroll"><table><thead><tr><th>Date</th><th>Weight (kg)</th><th>Walked (km)</th><th>Recorded</th></tr></thead><tbody>';
  docs.forEach(function(d) {
    html += '<tr><td>' + (d.date ? esc(d.date) : '&mdash;') + '</td><td><strong>' + displayVal(d.weight) + '</strong></td><td>' + displayVal(d.kmWalked) + '</td><td>' + displayVal(d.recordedAt || d.createdAt) + '</td></tr>';
  });
  return html + '</tbody></table></div>';
}

function renderFoodTable(docs) {
  var html = '<div class="table-scroll"><table><thead><tr><th>Date</th><th>Food</th><th>kcal</th><th>P / C / F</th></tr></thead><tbody>';
  docs.forEach(function(d) {
    var macros = [d.protein, d.carbs, d.fat].map(function(n) { return n != null ? n : '–'; }).join(' / ');
    html += '<tr><td style="white-space:nowrap;font-size:12px">' + esc(d.date || '') + '</td><td>' + esc(d.name || d.foodName || '') + '</td><td><strong>' + displayVal(d.calories) + '</strong></td><td class="uid">' + esc(macros) + '</td></tr>';
  });
  return html + '</tbody></table></div>';
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
    return;
  }
  window.prompt('Copy UID', text);
}

function copyUserJson() {
  var el = document.getElementById('user-raw-json');
  if (!el) return;
  copyText(el.textContent || '');
}

function setGrantStatus(msg, isError) {
  var el = document.getElementById('grant-prem-status');
  if (!el) return;
  el.textContent = msg || '';
  el.className = 'grant-status' + (isError ? ' err' : '');
  el.style.display = msg ? 'block' : 'none';
}

async function grantUserPremium() {
  var uid = _userUid;
  if (!uid) {
    setGrantStatus('Load a user first.', true);
    return;
  }
  var amountEl = document.getElementById('grant-prem-amount');
  var unitEl = document.getElementById('grant-prem-unit');
  var extendEl = document.getElementById('grant-prem-extend');
  var btn = document.getElementById('grant-prem-btn');
  var amount = parseInt(amountEl && amountEl.value, 10);
  var unit = unitEl && unitEl.value ? unitEl.value : 'days';
  if (!amount || amount < 1) {
    setGrantStatus('Enter a duration of at least 1.', true);
    return;
  }
  if (!window.confirm('Grant ' + amount + ' ' + unit + ' of premium to this user?')) return;
  if (btn) btn.disabled = true;
  setGrantStatus('Granting premium…', false);
  try {
    var resp = await fetch(API_USERS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: pw,
        type: 'grant-premium',
        uid: uid,
        amount: amount,
        unit: unit,
        extend: !!(extendEl && extendEl.checked)
      })
    });
    var data = await resp.json().catch(function() { return {}; });
    if (!resp.ok || data.error) throw new Error(data.error || ('HTTP ' + resp.status));
    _grantFlash = 'Premium granted until ' + fmtPhDate(data.premiumExpiry) + (data.extended ? ' (extended).' : '.');
    await loadUserDetail(uid);
  } catch (e) {
    setGrantStatus('Grant failed: ' + e.message, true);
    if (btn) btn.disabled = false;
  }
}

async function revokeUserPremium() {
  var uid = _userUid;
  if (!uid) {
    setGrantStatus('Load a user first.', true);
    return;
  }
  if (!window.confirm('Revoke premium for this user?')) return;
  var btn = document.getElementById('revoke-prem-btn');
  if (btn) btn.disabled = true;
  setGrantStatus('Revoking premium…', false);
  try {
    var resp = await fetch(API_USERS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, type: 'revoke-premium', uid: uid })
    });
    var data = await resp.json().catch(function() { return {}; });
    if (!resp.ok || data.error) throw new Error(data.error || ('HTTP ' + resp.status));
    _grantFlash = 'Premium revoked.';
    await loadUserDetail(uid);
  } catch (e) {
    setGrantStatus('Revoke failed: ' + e.message, true);
    if (btn) btn.disabled = false;
  }
}

var _barcodeHistory = [];
var _barcodeHistoryFilter = 'all';

async function loadBarcodes() {
  var err = document.getElementById('barcodes-error');
  var loading = document.getElementById('barcodes-loading');
  var list = document.getElementById('barcodes-list');
  if (!list) return;
  err.style.display = 'none';
  loading.style.display = 'block';
  list.innerHTML = '';
  try {
    var resp = await fetch(API_BARCODES + '?password=' + encodeURIComponent(pw) + '&type=barcodes');
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    var data = await resp.json();
    renderBarcodes(data.items || []);
    _barcodeHistory = data.history || [];
    renderBarcodeHistory();
  } catch (e) {
    err.textContent = 'Error loading barcodes: ' + e.message;
    err.style.display = 'block';
  }
  loading.style.display = 'none';
}

function barcodeCardMeta(item) {
  var macros = item.macros || {};
  var img = item.imageUrl
    ? '<img src="' + esc(item.imageUrl) + '" alt="Nutrition label" style="width:100%;max-height:220px;object-fit:contain;background:#fff;border-radius:12px;margin-bottom:10px;border:1px solid var(--line)"/>'
    : '';
  return img +
    '<div class="m-card-sub">' + esc(item.brand || 'No brand') + ' · barcode ' + esc(item.barcode || '') + '</div>' +
    '<div class="m-row">Serving <strong>' + esc(item.servingSize || '') + '</strong></div>' +
    '<div class="m-row">Calories <strong>' + esc(macros.calories) + '</strong></div>' +
    '<div class="m-row">P / C / F <strong>' + esc(macros.protein) + ' / ' + esc(macros.carbs) + ' / ' + esc(macros.fat) + '</strong></div>' +
    '<div class="m-row">Submitted by <strong>' + esc(item.submitterName || item.submitterEmail || item.submittedBy || '') + '</strong></div>' +
    '<div class="m-row">Submitted <strong>' + fmtPhDate(item.submittedAt) + '</strong></div>';
}

function renderBarcodes(items) {
  document.getElementById('barcodes-count').textContent = items.length;
  document.getElementById('barcodes-stat').style.display = 'grid';
  var list = document.getElementById('barcodes-list');
  if (!items.length) {
    list.innerHTML = '<div class="empty-state">No pending barcode submissions.</div>';
    return;
  }
  list.innerHTML = items.map(function(item) {
    var safeId = String(item.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
    return '<div class="m-card">' +
      '<div class="m-card-title">' + esc(item.name || '(no name)') + '</div>' +
      barcodeCardMeta(item) +
      '<div class="m-actions">' +
      '<button class="toggle-btn on" onclick="reviewBarcode(\\'' + safeId + '\\', \\'approve\\')">Approve</button>' +
      '<button class="toggle-btn danger-on" onclick="reviewBarcode(\\'' + safeId + '\\', \\'reject\\')">Reject</button>' +
      '</div></div>';
  }).join('');
}

function setBarcodeHistoryFilter(filter) {
  _barcodeHistoryFilter = filter === 'approved' || filter === 'rejected' ? filter : 'all';
  document.querySelectorAll('#barcodes-history-filter .seg-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === _barcodeHistoryFilter);
  });
  renderBarcodeHistory();
}

function renderBarcodeHistory() {
  var approved = 0;
  var rejected = 0;
  _barcodeHistory.forEach(function(item) {
    if (item.status === 'approved') approved += 1;
    if (item.status === 'rejected') rejected += 1;
  });
  document.getElementById('barcodes-approved-count').textContent = approved;
  document.getElementById('barcodes-rejected-count').textContent = rejected;
  document.getElementById('barcodes-history-stat').style.display = 'grid';

  var q = (document.getElementById('barcodes-history-q').value || '').trim().toLowerCase();
  var items = _barcodeHistory.filter(function(item) {
    if (_barcodeHistoryFilter !== 'all' && item.status !== _barcodeHistoryFilter) return false;
    if (!q) return true;
    var hay = [item.name, item.brand, item.barcode, item.submitterName, item.submitterEmail, item.submittedBy]
      .join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  });

  var list = document.getElementById('barcodes-history-list');
  if (!items.length) {
    var empty = _barcodeHistory.length
      ? 'No matching submissions.'
      : 'No reviewed submissions yet.';
    list.innerHTML = '<div class="empty-state">' + empty + '</div>';
    return;
  }
  list.innerHTML = items.map(function(item) {
    var approvedItem = item.status === 'approved';
    var badge = approvedItem
      ? '<span class="badge badge-ready">Approved</span>'
      : '<span class="badge badge-rejected">Rejected</span>';
    return '<div class="m-card">' +
      '<div class="m-card-top"><div class="m-card-title">' + esc(item.name || '(no name)') + '</div>' + badge + '</div>' +
      barcodeCardMeta(item) +
      '<div class="m-row">Reviewed <strong>' + fmtPhDate(item.reviewedAt) + '</strong></div>' +
      '</div>';
  }).join('');
}

async function reviewBarcode(id, action) {
  try {
    var resp = await fetch(API_BARCODES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, id: id, action: action })
    });
    var data = await resp.json().catch(function() { return {}; });
    if (!resp.ok) throw new Error(data.error || ('HTTP ' + resp.status));
    loadBarcodes();
  } catch (e) {
    var err = document.getElementById('barcodes-error');
    err.textContent = e.message;
    err.style.display = 'block';
  }
}

function isStandaloneApp() {
  return window.matchMedia('(display-mode: standalone)').matches
    || window.matchMedia('(display-mode: minimal-ui)').matches
    || window.navigator.standalone === true;
}

function phoneKind() {
  var ua = navigator.userAgent || '';
  var ios = /iphone|ipad|ipod/i.test(ua);
  if (ios && /crios|fxios|edgios|opios/i.test(ua)) return 'ios-other';
  if (ios) return 'ios-safari';
  if (/android/i.test(ua)) return 'android';
  return 'desktop';
}

function hideInstallUi() {
  var hint = document.getElementById('install-hint');
  var btn = document.getElementById('install-btn');
  if (hint) hint.style.display = 'none';
  if (btn) btn.hidden = true;
}

function copyAdminLink() {
  var url = location.origin + '/';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url);
    return;
  }
  window.prompt('Copy this link and open it in Safari', url);
}

function renderInstallHelp() {
  var box = document.getElementById('install-hint');
  if (!box) return;
  var kind = phoneKind();
  if (kind === 'android') {
    box.innerHTML = '<p style="margin:0 0 10px;color:var(--ink);font-weight:700">Add this to your Home screen</p>'
      + '<ol class="install-steps">'
      + '<li>Tap the <strong>⋮</strong> button at the top right</li>'
      + '<li>Tap <strong>Add to Home screen</strong> — not Install app</li>'
      + '<li>Tap <strong>Add</strong></li>'
      + '<li>Look for <strong>MC Admin</strong> on your Home screen</li>'
      + '</ol>'
      + '<p>The Install app option often says it is installing and then does nothing. Use Add to Home screen.</p>';
    return;
  }
  if (kind === 'ios-other') {
    box.innerHTML = '<p style="margin:0 0 10px;color:var(--ink);font-weight:700">iPhone Chrome cannot install this</p>'
      + '<ol class="install-steps">'
      + '<li>Tap <strong>Copy link</strong> below</li>'
      + '<li>Open <strong>Safari</strong></li>'
      + '<li>Paste the link and open it</li>'
      + '<li>Tap <strong>Share</strong>, then <strong>Add to Home Screen</strong></li>'
      + '</ol>'
      + '<button type="button" class="install-cta" onclick="copyAdminLink()">Copy link</button>';
    return;
  }
  if (kind === 'ios-safari') {
    box.innerHTML = '<p style="margin:0 0 10px;color:var(--ink);font-weight:700">Add this to your Home Screen</p>'
      + '<ol class="install-steps">'
      + '<li>Tap the <strong>Share</strong> button</li>'
      + '<li>Tap <strong>Add to Home Screen</strong></li>'
      + '<li>Tap <strong>Add</strong></li>'
      + '</ol>';
    return;
  }
  box.innerHTML = '<button type="button" class="install-cta" onclick="installApp()">Install as app</button>'
    + '<p>Or use the browser menu → Install Mr. Calorie Admin. Then open MC Admin from the Start menu.</p>';
}

function setupPwa() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/admin-sw.js', { scope: '/', updateViaCache: 'none' }).catch(function () {});
  }
  if (isStandaloneApp()) {
    hideInstallUi();
    return;
  }
  renderInstallHelp();
}

function installApp() {
  renderInstallHelp();
}

// ─── Payment Reports ──────────────────────────────────────────────────────────
var _reportsCache = [];
var _reportsFilter = 'open';

async function loadReports() {
  var err = document.getElementById('reports-error');
  var loading = document.getElementById('reports-loading');
  var list = document.getElementById('reports-list');
  if (!list) return;
  err.style.display = 'none';
  loading.style.display = 'block';
  list.innerHTML = '';
  try {
    var resp = await fetch(API_REPORTS + '?password=' + encodeURIComponent(pw));
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    var data = await resp.json();
    _reportsCache = data.reports || [];
    document.getElementById('reports-open-count').textContent = data.open || 0;
    document.getElementById('reports-resolved-count').textContent = data.resolved || 0;
    document.getElementById('reports-total-count').textContent = data.total || 0;
    document.getElementById('reports-stat').style.display = 'grid';
    renderReportsList();
  } catch(e) {
    err.textContent = 'Error loading reports: ' + e.message;
    err.style.display = 'block';
  }
  loading.style.display = 'none';
}

function setReportsFilter(filter) {
  _reportsFilter = filter;
  document.querySelectorAll('#reports-filter-seg .seg-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
  });
  renderReportsList();
}

function renderReportsList() {
  var list = document.getElementById('reports-list');
  if (!list) return;
  var items = _reportsCache.filter(function(r) {
    if (_reportsFilter === 'all') return true;
    return r.status === _reportsFilter;
  });
  if (!items.length) {
    list.innerHTML = '<div class="empty-state">' + (_reportsFilter === 'open' ? 'No open reports. All good!' : 'No reports here yet.') + '</div>';
    return;
  }
  list.innerHTML = items.map(function(r) {
    var isOpen = r.status === 'open';
    var badge = isOpen
      ? '<span class="badge badge-pending" style="background:var(--red-soft);color:var(--red);border:1px solid rgba(248,113,113,0.25)">Open</span>'
      : '<span class="badge badge-ready">Resolved</span>';
    var btnLabel = isOpen ? 'Mark Resolved' : 'Reopen';
    var btnClass = isOpen ? 'toggle-btn on' : 'toggle-btn';
    var safeId = String(r.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
    return '<div class="m-card">'
      + '<div class="m-card-top">'
      + '<div class="m-card-title">' + esc(r.name || r.email || '(unknown user)') + '</div>'
      + badge
      + '</div>'
      + (r.name ? '<div class="m-row"><strong>Name:</strong> ' + esc(r.name) + '</div>' : '')
      + (r.email ? '<div class="m-row"><strong>Email:</strong> ' + esc(r.email) + '</div>' : '')
      + (r.uid ? '<div class="m-row"><strong>UID:</strong> <span style="font-family:JetBrains Mono,monospace;font-size:11px">' + esc(r.uid) + '</span></div>' : '')
      + (r.errorMsg ? '<div class="m-row" style="background:var(--amber-soft);border-radius:8px;padding:6px 10px;margin:8px 0"><span style="color:var(--amber);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.06em">Verification error</span><br>' + esc(r.errorMsg) + '</div>' : '')
      + '<div class="m-row" style="margin-top:6px"><strong>Message:</strong> ' + esc(r.message || '') + '</div>'
      + (r.referenceNumber ? '<div class="m-row"><strong>Ref#:</strong> ' + esc(r.referenceNumber) + '</div>' : '')
      + '<div class="m-row"><strong>Submitted:</strong> ' + fmtPhDate(r.createdAt) + '</div>'
      + (r.resolvedAt ? '<div class="m-row"><strong>Resolved:</strong> ' + fmtPhDate(r.resolvedAt) + '</div>' : '')
      + '<div class="m-actions">'
      + '<button class="' + btnClass + '" onclick="resolveReport(\\'' + safeId + '\\', \\'' + (isOpen ? 'resolved' : 'open') + '\\')">' + btnLabel + '</button>'
      + (r.uid ? '<button class="toggle-btn" onclick="lookupUserFromReport(\\'' + safeId + '\\')">Lookup User &amp; Grant Premium</button>' : '')
      + '</div>'
      + '</div>';
  }).join('');
}

async function resolveReport(reportId, newStatus) {
  try {
    var resp = await fetch(API_REPORTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, reportId: reportId, status: newStatus })
    });
    var data = await resp.json().catch(function() { return {}; });
    if (!resp.ok || data.error) throw new Error(data.error || ('HTTP ' + resp.status));
    // Update cache locally
    _reportsCache = _reportsCache.map(function(r) {
      if (r.id !== reportId) return r;
      return Object.assign({}, r, { status: newStatus, resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : null });
    });
    var open = _reportsCache.filter(function(r) { return r.status === 'open'; }).length;
    var resolved = _reportsCache.filter(function(r) { return r.status === 'resolved'; }).length;
    document.getElementById('reports-open-count').textContent = open;
    document.getElementById('reports-resolved-count').textContent = resolved;
    renderReportsList();
  } catch (e) {
    var err = document.getElementById('reports-error');
    err.textContent = 'Update failed: ' + e.message;
    err.style.display = 'block';
  }
}

function lookupUserFromReport(uid) {
  document.getElementById('user-search-input').value = uid;
  switchTab('users');
  searchUsers();
}

setupPwa();
</script>
</body>
</html>`
}

handler.getHtml = getHtml
module.exports = handler
