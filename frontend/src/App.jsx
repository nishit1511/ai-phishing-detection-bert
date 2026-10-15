
import { useState } from "react";
import "./App.css";

const initialScans = [
  { name: "Payroll Update", type: "Email", verdict: "Phishing", risk: 98, time: "2 min ago" },
  { name: "github.com", type: "URL", verdict: "Safe", risk: 4, time: "18 min ago" },
  { name: "Account Verification", type: "SMS", verdict: "Suspicious", risk: 72, time: "34 min ago" },
  { name: "Microsoft 365", type: "URL", verdict: "Safe", risk: 2, time: "1 hr ago" },
];

function App() {
  const [active, setActive] = useState("Dashboard");
  const [query, setQuery] = useState("");
  const [scanType, setScanType] = useState("URL");
  const [scans, setScans] = useState(initialScans);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const navItems = [
    ["▦", "Dashboard"],
    ["⌕", "Threat Scanner"],
    ["◷", "Scan History"],
    ["⌁", "Model Insights"],
  ];

  function runDemoScan(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setScanning(true);
    setResult(null);

    setTimeout(() => {
      const suspicious = /verify|urgent|password|login|gift|prize|bank|free/i.test(query);
      const risk = suspicious ? 91 : 8;
      const verdict = suspicious ? "Suspicious" : "Low Risk";
      setResult({
        input: query,
        type: scanType,
        risk,
        verdict,
        explanation: suspicious
          ? "This demo flagged language commonly associated with social engineering. This is a heuristic demonstration, not a model prediction."
          : "No obvious trigger phrases were detected by the demo rule. This does not prove the content is safe.",
      });
      setScans((prev) => [
        { name: query.slice(0, 30), type: scanType, verdict, risk, time: "Just now" },
        ...prev,
      ]);
      setScanning(false);
    }, 800);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">P</div>
          <div>
            <div className="brand-name">PhishGuard</div>
            <div className="brand-subtitle">INTELLIGENCE</div>
          </div>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="navigation">
          {navItems.map(([icon, label]) => (
            <button
              key={label}
              className={`nav-item ${active === label ? "active" : ""}`}
              onClick={() => setActive(label)}
            >
              <span className="nav-icon">{icon}</span>
              <span>{label}</span>
              {label === "Threat Scanner" && <span className="nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="security-card">
            <div className="security-icon">✳</div>
            <div className="security-title">AI Protection</div>
            <div className="security-copy">Your security workspace is ready.</div>
            <div className="security-status"><span /> Demo interface</div>
          </div>
          <div className="profile">
            <div className="avatar">PG</div>
            <div className="profile-text">
              <strong>Security Analyst</strong>
              <span>Research workspace</span>
            </div>
            <span className="profile-menu">•••</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> {active}</div>
          <div className="topbar-right">
            <span className="environment"><span /> DEVELOPMENT</span>
            <button className="icon-button" aria-label="Notifications">♧</button>
            <div className="top-avatar">SA</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="live-dot" /> THREAT INTELLIGENCE PLATFORM</div>
              <h1>{active === "Dashboard" ? "Security overview" : active}</h1>
              <p>Monitor threats, investigate suspicious content, and understand model decisions.</p>
            </div>
            <div className="date-chip">◷ &nbsp; Live workspace</div>
          </section>

          {active === "Dashboard" && (
            <>
              <section className="metrics-grid">
                <Metric title="Total scans" value="1,284" change="+12.8%" icon="⌕" color="cyan" />
                <Metric title="Threats detected" value="186" change="+8.2%" icon="⚑" color="red" />
                <Metric title="Safe content" value="1,098" change="+5.4%" icon="✓" color="green" />
                <Metric title="Model accuracy" value="99.1%" change="Research metric" icon="⌁" color="purple" />
              </section>

              <section className="dashboard-grid">
                <div className="panel scanner-panel">
                  <div className="panel-heading">
                    <div>
                      <div className="panel-kicker">ANALYSIS ENGINE</div>
                      <h2>Threat scanner</h2>
                      <p>Inspect a URL, email, or SMS message.</p>
                    </div>
                    <div className="engine-icon">⌘</div>
                  </div>

                  <form onSubmit={runDemoScan}>
                    <label className="field-label">SCAN CONTENT TYPE</label>
                    <div className="scan-tabs">
                      {["URL", "Email", "SMS"].map((type) => (
                        <button
                          type="button"
                          key={type}
                          className={`scan-tab ${scanType === type ? "selected" : ""}`}
                          onClick={() => { setScanType(type); setResult(null); }}
                        >
                          {type === "URL" ? "↗" : type === "Email" ? "✉" : "▤"} &nbsp; {type}
                        </button>
                      ))}
                    </div>
                    <label className="field-label" htmlFor="scan-input">CONTENT TO ANALYZE</label>
                    <textarea
                      id="scan-input"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={
                        scanType === "URL"
                          ? "https://example.com"
                          : scanType === "Email"
                          ? "Paste the email subject and message..."
                          : "Paste the SMS message..."
                      }
                      rows={4}
                    />
                    <div className="input-hint">Demo mode · Do not paste real credentials or sensitive data.</div>
                    <button className="scan-button" disabled={scanning || !query.trim()}>
                      {scanning ? "Analyzing..." : "✳  Analyze content"} <span>→</span>
                    </button>
                  </form>

                  {result && (
                    <div className="result-card" aria-live="polite">
                      <div className="result-top">
                        <strong>Demo result</strong>
                        <span className={result.risk > 50 ? "risk-high" : "risk-low"}>
                          {result.risk}% heuristic risk
                        </span>
                      </div>
                      <h3>{result.verdict}</h3>
                      <p>{result.explanation}</p>
                      <div className="result-foot">Input type: {result.type}</div>
                    </div>
                  )}
                </div>

                <div className="right-stack">
                  <div className="panel threat-panel">
                    <div className="panel-heading compact">
                      <div><div className="panel-kicker">LAST 7 DAYS</div><h2>Threat activity</h2></div>
                      <span className="subtle-tag">Demo data</span>
                    </div>
                    <div className="chart-legend"><span><i className="legend-threat" /> Threats</span><span><i className="legend-safe" /> Safe scans</span></div>
                    <div className="chart">
                      {[42, 65, 49, 78, 58, 87, 68].map((height, i) => (
                        <div className="chart-column" key={i}>
                          <div className="bar-pair">
                            <span className="bar threat-bar" style={{ height: `${height * 0.65}%` }} />
                            <span className="bar safe-bar" style={{ height: `${height}%` }} />
                          </div>
                          <span className="chart-day">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="panel model-panel">
                    <div className="panel-heading compact">
                      <div><div className="panel-kicker">MODEL STATUS</div><h2>Detection engine</h2></div>
                      <span className="status-pill"><i /> UI READY</span>
                    </div>
                    <div className="model-row"><span className="model-symbol">✉</span><div><strong>Email classifier</strong><small>DistilBERT · Research model</small></div><span className="model-state">Planned</span></div>
                    <div className="model-row"><span className="model-symbol">▤</span><div><strong>SMS classifier</strong><small>DistilBERT · Research model</small></div><span className="model-state">Planned</span></div>
                    <div className="model-row"><span className="model-symbol">↗</span><div><strong>URL classifier</strong><small>Random Forest · 48 features</small></div><span className="model-state">Planned</span></div>
                  </div>
                </div>
              </section>

              <section className="panel history-panel">
                <div className="panel-heading compact">
                  <div><div className="panel-kicker">RECENT ACTIVITY</div><h2>Latest scans</h2></div>
                  <button className="text-button" onClick={() => setActive("Scan History")}>View all scans →</button>
                </div>
                <ScanTable scans={scans.slice(0, 5)} />
                <div className="demo-note">Sample activity is illustrative. Connect the API to display persisted scans.</div>
              </section>
            </>
          )}

          {active === "Threat Scanner" && (
            <section className="panel alternate-panel">
              <div className="panel-kicker">INVESTIGATION WORKSPACE</div>
              <h2>Analyze suspicious content</h2>
              <p>Run a demonstration scan or return to the dashboard for the scanner.</p>
              <button className="scan-button" onClick={() => setActive("Dashboard")}>Open scanner →</button>
            </section>
          )}

          {active === "Scan History" && (
            <section className="panel history-panel">
              <div className="panel-heading compact">
                <div><div className="panel-kicker">AUDIT TRAIL</div><h2>Scan history</h2></div>
                <span className="subtle-tag">{scans.length} entries · demo</span>
              </div>
              <ScanTable scans={scans} />
            </section>
          )}

          {active === "Model Insights" && (
            <section className="panel insights-grid">
              <div>
                <div className="panel-kicker">EXPLAINABLE AI</div>
                <h2>Model insights</h2>
                <p>Research metrics from the dissertation evaluation. These are not live production measurements.</p>
              </div>
              <div className="insight-metric"><span>Email · DistilBERT</span><strong>99.09%</strong><small>Reported accuracy</small></div>
              <div className="insight-metric"><span>SMS · DistilBERT</span><strong>99.39%</strong><small>Reported accuracy</small></div>
              <div className="insight-metric"><span>URL · Random Forest</span><strong>98.50%</strong><small>Reported accuracy</small></div>
              <div className="insight-warning">SHAP explanations and live model inference will be displayed here after backend integration.</div>
            </section>
          )}

          <footer className="footer"><span>PhishGuard Intelligence</span><span>Research prototype · v0.1.0</span><span>Built for explainable security</span></footer>
        </div>
      </main>
    </div>
  );
}

function Metric({ title, value, change, icon, color }) {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${color}`}>{icon}</div>
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-change">{change}</div>
    </div>
  );
}

function ScanTable({ scans }) {
  return (
    <div className="table-scroll">
      <table className="scan-table">
        <thead><tr><th>CONTENT</th><th>TYPE</th><th>VERDICT</th><th>RISK</th><th>TIME</th></tr></thead>
        <tbody>
          {scans.map((scan, index) => (
            <tr key={`${scan.name}-${index}`}>
              <td><span className="content-symbol">{scan.type === "URL" ? "↗" : scan.type === "Email" ? "✉" : "▤"}</span>{scan.name}</td>
              <td>{scan.type}</td>
              <td><span className={`verdict ${scan.verdict.toLowerCase().replace(/\s+/g, "-")}`}>{scan.verdict}</span></td>
              <td><div className="risk-cell"><div className="risk-track"><span style={{ width: `${scan.risk}%` }} /></div><span>{scan.risk}%</span></div></td>
              <td className="time-cell">{scan.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
