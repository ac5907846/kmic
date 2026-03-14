import { useState, useEffect, useRef } from "react";

// ─── DATA MODEL (Tables 4, 6, 7 from paper) ───
const KMIC_DATA = {
  c1: {
    name: "Mutual Trust & Collaboration",
    shortName: "Trust & Collaboration",
    icon: "\u2665",
    groupWeight: 0.205,
    benchmarkIndex: 3.780,
    theme: { bg: "rgba(91,138,239,0.15)", color: "#5B8AEF" },
    factors: [
      { code: "C11", desc: "Trust in colleagues' abilities", ow: 0.0305, surveyMean: 3.605, dist: [0.0, 7.7, 38.2, 40.0, 14.1] },
      { code: "C12", desc: "Trust in colleagues' attitudes to work toward organizational goals", ow: 0.0347, surveyMean: 3.641, dist: [1.4, 10.5, 30.5, 38.2, 19.5] },
      { code: "C13", desc: "Trust in colleagues' decisions toward organizational interests", ow: 0.0320, surveyMean: 3.655, dist: [1.4, 9.1, 30.5, 40.9, 18.2] },
      { code: "C14", desc: "Employees' willingness to collaborate with others", ow: 0.0345, surveyMean: 3.927, dist: [1.4, 6.4, 17.7, 47.3, 27.3] },
      { code: "C15", desc: "Employees' willingness to support others", ow: 0.0374, surveyMean: 3.959, dist: [0.9, 5.9, 17.7, 47.3, 28.2] },
      { code: "C16", desc: "Employees' willingness to take responsibility in coordination", ow: 0.0358, surveyMean: 3.850, dist: [0.0, 7.7, 23.6, 44.5, 24.1] },
    ],
  },
  c2: {
    name: "Organizational Values & Norms",
    shortName: "Values & Norms",
    icon: "\u2733",
    groupWeight: 0.213,
    benchmarkIndex: 3.923,
    theme: { bg: "rgba(212,168,83,0.15)", color: "#E8C97A" },
    factors: [
      { code: "C21", desc: "Promoting knowledge sharing", ow: 0.0428, surveyMean: 4.082, dist: [0.9, 5.9, 16.4, 37.7, 39.1] },
      { code: "C22", desc: "Facilitating employees to foster knowledge and skills", ow: 0.0409, surveyMean: 3.786, dist: [2.7, 8.2, 26.4, 33.2, 29.5] },
      { code: "C23", desc: "Promoting strategic collaborations to acquire knowledge", ow: 0.0457, surveyMean: 3.691, dist: [1.4, 11.8, 28.6, 32.7, 25.5] },
      { code: "C24", desc: "Encouraging employees to be creative and innovative at work", ow: 0.0413, surveyMean: 4.036, dist: [1.4, 5.0, 19.5, 36.8, 37.3] },
      { code: "C25", desc: "Facilitating employees' experiential learning", ow: 0.0422, surveyMean: 3.986, dist: [1.4, 4.5, 20.9, 40.5, 32.7] },
    ],
  },
  c3: {
    name: "Information & Communication Systems",
    shortName: "Info & Comm Systems",
    icon: "\u2699",
    groupWeight: 0.201,
    benchmarkIndex: 3.708,
    theme: { bg: "rgba(52,199,123,0.15)", color: "#34C77B" },
    factors: [
      { code: "C31", desc: "Effective use of internal communication channels", ow: 0.0385, surveyMean: 3.805, dist: [0.9, 9.1, 23.6, 41.4, 25.0] },
      { code: "C32", desc: "Effective use of external communication channels", ow: 0.0397, surveyMean: 3.627, dist: [1.4, 11.4, 27.7, 42.3, 17.3] },
      { code: "C33", desc: "Information systems available for sharing experience and knowledge", ow: 0.0429, surveyMean: 3.668, dist: [5.0, 9.5, 25.0, 34.5, 25.9] },
      { code: "C34", desc: "Information system available for managerial activities", ow: 0.0403, surveyMean: 3.736, dist: [5.0, 8.6, 22.7, 35.0, 28.6] },
      { code: "C35", desc: "Encouraging interactions with experts", ow: 0.0395, surveyMean: 3.700, dist: [3.6, 8.6, 27.3, 35.0, 25.5] },
    ],
  },
  c4: {
    name: "Organizational Policies",
    shortName: "Org Policies",
    icon: "\u2696",
    groupWeight: 0.212,
    benchmarkIndex: 3.914,
    theme: { bg: "rgba(232,145,58,0.15)", color: "#E8913A" },
    factors: [
      { code: "C41", desc: "Operations aligning with firm policies", ow: 0.0729, surveyMean: 4.032, dist: [0.5, 4.1, 19.5, 43.6, 32.3] },
      { code: "C42", desc: "External and internal communications aligning with firm policies", ow: 0.0863, surveyMean: 3.718, dist: [0.0, 10.9, 25.0, 45.5, 18.6] },
      { code: "C43", desc: "Firm policies available in writing", ow: 0.0529, surveyMean: 3.982, dist: [2.7, 5.0, 15.0, 45.9, 31.4] },
    ],
  },
  c5: {
    name: "Employee Empowerment",
    shortName: "Empowerment",
    icon: "\u26A1",
    groupWeight: 0.169,
    benchmarkIndex: 3.127,
    theme: { bg: "rgba(224,82,82,0.15)", color: "#E05252" },
    factors: [
      { code: "C51", desc: "Empowering employees to take action within authority", ow: 0.0912, surveyMean: 3.268, dist: [9.1, 15.0, 30.0, 31.8, 14.1] },
      { code: "C52", desc: "Empowering employees to make decisions", ow: 0.0778, surveyMean: 2.977, dist: [13.2, 20.9, 30.0, 26.8, 9.1] },
    ],
  },
};

const COMPONENT_KEYS = ["c1", "c2", "c3", "c4", "c5"];
const COMPONENT_COLORS = ["#5B8AEF", "#E8C97A", "#34C77B", "#E8913A", "#E05252"];
const SURVEY_OVERALL = 3.767;
const DIST_COLORS = ["#E05252", "#E8913A", "#8899B4", "#5B8AEF", "#34C77B"];
const DIST_LABELS = ["Very Low", "Low", "Medium", "High", "Very High"];

// ─── Styles ───
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg-primary: #0B1120;
  --bg-card: #131B2E;
  --bg-input: #0E1628;
  --border: #1E2D4A;
  --accent: #3B6BDB;
  --accent-light: #5B8AEF;
  --accent-glow: rgba(59,107,219,0.15);
  --text-primary: #E8ECF4;
  --text-secondary: #8899B4;
  --text-muted: #5A6B85;
  --gold: #D4A853;
  --gold-light: #E8C97A;
  --green: #34C77B;
  --orange: #E8913A;
  --red: #E05252;
  --radius: 12px;
  --radius-sm: 8px;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  margin: 0;
}

.app-container { max-width: 960px; margin: 0 auto; padding: 0 20px 60px; }

.app-header {
  padding: 48px 0 32px; text-align: center; position: relative; overflow: hidden;
}
.app-header::before {
  content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
  width: 600px; height: 600px;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%); pointer-events: none;
}
.logo-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 100px; padding: 6px 16px 6px 8px;
  font-size: 12px; font-weight: 600; color: var(--gold);
  letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px;
}
.logo-badge .dot { width: 8px; height: 8px; background: var(--gold); border-radius: 50%; }
.app-header h1 {
  font-family: 'DM Serif Display', serif; font-size: clamp(28px, 5vw, 44px);
  font-weight: 400; line-height: 1.15; margin-bottom: 12px; position: relative;
}
.app-header h1 span { color: var(--gold); }
.app-header .subtitle {
  color: var(--text-secondary); font-size: clamp(14px, 2.5vw, 16px);
  max-width: 640px; margin: 0 auto;
}

.stepper { display: flex; align-items: center; justify-content: center; margin: 32px auto 36px; max-width: 680px; padding: 0 8px; }
.step-item { display: flex; align-items: center; flex: 1; }
.step-circle {
  width: 36px; height: 36px; min-width: 36px; border-radius: 50%;
  border: 2px solid var(--border); display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; color: var(--text-muted);
  background: var(--bg-card); transition: all 0.3s; position: relative; z-index: 1;
}
.step-circle.active { border-color: var(--accent); color: #fff; background: var(--accent); box-shadow: 0 0 20px var(--accent-glow); }
.step-circle.done { border-color: var(--green); color: #fff; background: var(--green); }
.step-line { flex: 1; height: 2px; background: var(--border); transition: background 0.3s; }
.step-line.done { background: var(--green); }

.card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 28px; margin-bottom: 20px;
  animation: fadeUp 0.4s ease;
}
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

.card-header { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px; }
.card-icon {
  width: 42px; height: 42px; min-width: 42px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 20px;
}
.card-header h2 { font-family: 'DM Serif Display', serif; font-size: 20px; font-weight: 400; line-height: 1.3; }
.card-header p { font-size: 13px; color: var(--text-secondary); margin-top: 4px; }

.factor-row {
  padding: 20px 0; border-bottom: 1px solid var(--border);
  display: flex; flex-direction: column; align-items: center; text-align: center;
}
.factor-row:last-child { border-bottom: none; }
.factor-desc { font-size: 14px; color: var(--text-primary); margin-bottom: 14px; line-height: 1.5; max-width: 480px; }
.rating-group { display: flex; gap: 6px; justify-content: center; }
.rating-btn {
  width: 52px; padding: 10px 0;
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  background: var(--bg-input); color: var(--text-secondary);
  font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s;
  text-align: center; -webkit-tap-highlight-color: transparent; font-family: 'DM Sans', sans-serif;
}
.rating-btn:hover { border-color: var(--accent); color: var(--text-primary); }
.rating-btn.selected { background: var(--accent); border-color: var(--accent); color: #fff; box-shadow: 0 2px 12px rgba(59,107,219,0.3); }
.rating-labels {
  display: flex; justify-content: space-between; font-size: 11px;
  color: var(--text-muted); margin-top: 8px; width: 284px;
}

.btn-row { display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
.btn {
  padding: 14px 28px; border-radius: var(--radius-sm);
  font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif;
  cursor: pointer; border: none; transition: all 0.2s; -webkit-tap-highlight-color: transparent;
}
.btn-primary { background: var(--accent); color: #fff; flex: 1; }
.btn-primary:hover { background: var(--accent-light); }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-secondary { background: transparent; border: 1px solid var(--border); color: var(--text-secondary); }
.btn-secondary:hover { border-color: var(--text-secondary); color: var(--text-primary); }
.btn-gold { background: linear-gradient(135deg, var(--gold), var(--gold-light)); color: #0B1120; flex: 1; }
.btn-gold:hover { opacity: 0.9; }
.btn-gold:disabled { opacity: 0.4; cursor: not-allowed; }

.score-hero { text-align: center; padding: 40px 20px; }
.score-big { font-family: 'DM Serif Display', serif; font-size: 72px; line-height: 1; color: var(--gold); margin-bottom: 8px; }
.score-label { font-size: 14px; color: var(--text-secondary); margin-bottom: 4px; }
.score-level { display: inline-block; padding: 4px 14px; border-radius: 100px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; margin-top: 8px; color: #fff; }
.benchmark-bar { position: relative; height: 8px; background: var(--bg-input); border-radius: 100px; margin: 20px 0 8px; overflow: visible; }
.benchmark-fill { height: 100%; border-radius: 100px; transition: width 1s ease; background: var(--gold); }
.benchmark-marker { position: absolute; top: -6px; width: 2px; height: 20px; background: var(--text-muted); border-radius: 1px; }
.benchmark-marker-label { position: absolute; top: 18px; transform: translateX(-50%); font-size: 10px; color: var(--text-muted); white-space: nowrap; }
.bar-legend { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: 16px; }

.component-row { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); }
.component-row:last-child { border-bottom: none; }
.comp-name { flex: 1; font-size: 13px; font-weight: 500; }
.comp-score { font-size: 14px; font-weight: 700; min-width: 40px; text-align: right; }
.comp-bar-wrap { width: 120px; min-width: 80px; height: 6px; background: var(--bg-input); border-radius: 100px; overflow: hidden; }
.comp-bar-fill { height: 100%; border-radius: 100px; transition: width 1s ease; }

.chart-wrap { position: relative; max-width: 420px; margin: 0 auto; padding: 20px 0; }

.dist-comp-section { margin-bottom: 8px; }
.dist-comp-header {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 16px; margin-top: 12px;
  background: var(--bg-input); border-radius: var(--radius-sm);
  border-left: 3px solid;
}
.dist-comp-header h3 { font-family: 'DM Serif Display', serif; font-size: 16px; font-weight: 400; flex: 1; }
.dist-comp-header .comp-avg { font-size: 13px; font-weight: 600; }
.dist-factor { padding: 14px 0 14px 16px; border-bottom: 1px solid var(--border); }
.dist-factor:last-child { border-bottom: none; }
.dist-factor-desc { font-size: 13px; color: var(--text-primary); margin-bottom: 6px; line-height: 1.4; }
.dist-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap; }
.dist-scores { font-size: 12px; font-weight: 600; white-space: nowrap; }
.dist-bar-wrap { display: flex; height: 22px; border-radius: 4px; overflow: hidden; position: relative; }
.dist-segment { transition: width 0.6s ease; position: relative; min-width: 0; }
.dist-pct { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.85); pointer-events: none; }
.dist-marker {
  position: absolute; top: -4px; width: 3px; height: 30px;
  background: #fff; border-radius: 2px; z-index: 2;
  box-shadow: 0 0 8px rgba(255,255,255,0.6); transition: left 0.6s ease;
}
.dist-legend {
  display: flex; gap: 12px; flex-wrap: wrap; margin-top: 16px; margin-bottom: 4px; justify-content: center;
}
.dist-legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text-muted); }
.dist-legend-dot { width: 10px; height: 10px; border-radius: 2px; }

.ai-box {
  background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius-sm);
  padding: 20px; min-height: 100px;
  font-size: 14px; line-height: 1.7; color: var(--text-secondary);
}
.ai-box h4 { color: var(--text-primary); margin: 16px 0 6px; font-size: 14px; }
.ai-box h4:first-child { margin-top: 0; }
.ai-box ul { padding-left: 18px; margin: 8px 0; }
.ai-box li { margin-bottom: 4px; }
.ai-loading { display: flex; align-items: center; gap: 10px; color: var(--text-muted); font-size: 14px; }
.spinner { width: 18px; height: 18px; border: 2px solid var(--border); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

footer {
  text-align: center; padding: 40px 20px; font-size: 12px; color: var(--text-muted);
  border-top: 1px solid var(--border); margin-top: 48px;
}

@media (max-width: 640px) {
  .app-header { padding: 32px 0 20px; }
  .card { padding: 20px 16px; }
  .rating-btn { width: 48px; padding: 10px 0; font-size: 14px; }
  .rating-labels { width: 262px; }
  .comp-bar-wrap { width: 80px; min-width: 60px; }
  .score-big { font-size: 56px; }
  .btn { padding: 14px 20px; font-size: 14px; }
  .step-circle { width: 30px; height: 30px; min-width: 30px; font-size: 12px; }
  .dist-scores { width: 100%; margin-top: 2px; }
  .dist-pct { font-size: 8px; }
  .dist-factor { padding-left: 8px; }
  .dist-comp-header { padding: 12px; }
}
`;

// ─── Sub-components ───

function Stepper({ current }) {
  const steps = [0, 1, 2, 3, 4, 5];
  return (
    <div className="stepper">
      {steps.map((s, i) => (
        <div className="step-item" key={s} style={i === steps.length - 1 ? { flex: 0 } : {}}>
          <div className={`step-circle ${s < current ? "done" : s === current ? "active" : ""}`}>
            {s < current ? "\u2713" : s === 5 ? "\u2713" : s + 1}
          </div>
          {i < steps.length - 1 && <div className={`step-line ${s < current ? "done" : ""}`} />}
        </div>
      ))}
    </div>
  );
}

function FactorRow({ factor, rating, onRate }) {
  return (
    <div className="factor-row">
      <div className="factor-desc">{factor.desc}</div>
      <div className="rating-group">
        {[1, 2, 3, 4, 5].map((v) => (
          <button key={v} className={`rating-btn ${rating === v ? "selected" : ""}`} onClick={() => onRate(factor.code, v)}>{v}</button>
        ))}
      </div>
      <div className="rating-labels"><span>Very Low</span><span>Very High</span></div>
    </div>
  );
}

function ComponentCard({ comp, ratings, onRate }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: comp.theme.bg, color: comp.theme.color }}>{comp.icon}</div>
        <div>
          <h2>{comp.name}</h2>
          <p>Rate each factor from 1 (Very Low) to 5 (Very High)</p>
        </div>
      </div>
      {comp.factors.map((f) => (
        <FactorRow key={f.code} factor={f} rating={ratings[f.code] || 0} onRate={onRate} />
      ))}
    </div>
  );
}

function RadarChart({ compScores }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const loadChart = () => {
      if (!canvasRef.current || typeof Chart === "undefined") return;
      if (chartRef.current) chartRef.current.destroy();

      const labels = COMPONENT_KEYS.map((k) => KMIC_DATA[k].shortName);
      const userData = COMPONENT_KEYS.map((k) => compScores[k]);
      const benchData = COMPONENT_KEYS.map((k) => KMIC_DATA[k].benchmarkIndex);

      const valueLabelsPlugin = {
        id: "radarValueLabels",
        afterDatasetsDraw(chart) {
          const { ctx } = chart;
          chart.data.datasets.forEach((dataset, dsIndex) => {
            const meta = chart.getDatasetMeta(dsIndex);
            meta.data.forEach((point, idx) => {
              const val = dataset.data[idx];
              ctx.save();
              ctx.font = "bold 11px DM Sans, sans-serif";
              ctx.fillStyle = dsIndex === 0 ? "#D4A853" : "#5B8AEF";
              ctx.textAlign = "center";
              ctx.fillText(val.toFixed(2), point.x, point.y + (dsIndex === 0 ? -10 : 16));
              ctx.restore();
            });
          });
        },
      };

      chartRef.current = new Chart(canvasRef.current, {
        type: "radar",
        data: {
          labels,
          datasets: [
            { label: "Your Organization", data: userData, borderColor: "#D4A853", backgroundColor: "rgba(212,168,83,0.15)", borderWidth: 2, pointBackgroundColor: "#D4A853", pointRadius: 5 },
            { label: "Survey Average (n=220)", data: benchData, borderColor: "#5B8AEF", backgroundColor: "rgba(91,138,239,0.08)", borderWidth: 2, borderDash: [5, 5], pointBackgroundColor: "#5B8AEF", pointRadius: 4 },
          ],
        },
        options: {
          responsive: true,
          layout: { padding: { top: 20, bottom: 20, left: 12, right: 12 } },
          scales: {
            r: {
              beginAtZero: true, max: 5,
              ticks: { stepSize: 1, color: "#5A6B85", backdropColor: "transparent", font: { size: 10 } },
              grid: { color: "#1E2D4A" }, angleLines: { color: "#1E2D4A" },
              pointLabels: { color: "#8899B4", font: { size: 12, family: "DM Sans", weight: "500" }, padding: 24 },
            },
          },
          plugins: {
            legend: { labels: { color: "#8899B4", font: { size: 12, family: "DM Sans" }, padding: 20, usePointStyle: true, pointStyle: "circle" } },
            tooltip: { enabled: false },
          },
        },
        plugins: [valueLabelsPlugin],
      });
    };

    if (typeof Chart !== "undefined") loadChart();
    else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js";
      script.onload = loadChart;
      document.head.appendChild(script);
    }
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [compScores]);

  return <div className="chart-wrap"><canvas ref={canvasRef} /></div>;
}

function DistributionBenchmark({ ratings }) {
  return (
    <div>
      <div className="dist-legend">
        {DIST_LABELS.map((label, i) => (
          <div className="dist-legend-item" key={label}>
            <div className="dist-legend-dot" style={{ background: DIST_COLORS[i] }} />{label}
          </div>
        ))}
        <div className="dist-legend-item">
          <div style={{ width: 3, height: 14, background: "#fff", borderRadius: 2 }} />Your rating
        </div>
      </div>
      {COMPONENT_KEYS.map((cKey) => {
        const comp = KMIC_DATA[cKey];
        let userCompAvg = 0;
        comp.factors.forEach((f) => { userCompAvg += (ratings[f.code] || 0); });
        userCompAvg = userCompAvg / comp.factors.length;

        return (
          <div className="dist-comp-section" key={cKey}>
            <div className="dist-comp-header" style={{ borderLeftColor: comp.theme.color }}>
              <h3>{comp.name}</h3>
              <div className="comp-avg">
                <span style={{ color: "var(--gold)" }}>{userCompAvg.toFixed(1)}</span>
                <span style={{ color: "var(--text-muted)", margin: "0 4px" }}>vs</span>
                <span style={{ color: "var(--accent-light)" }}>{comp.benchmarkIndex.toFixed(1)}</span>
              </div>
            </div>
            {comp.factors.map((f) => {
              const userRating = ratings[f.code] || 0;
              const delta = userRating - f.surveyMean;
              const deltaColor = delta > 0.3 ? "var(--green)" : delta < -0.3 ? "var(--red)" : "var(--text-muted)";
              const deltaSign = delta > 0 ? "+" : "";
              let markerLeft = 0;
              if (userRating > 0) {
                for (let i = 0; i < userRating - 1; i++) markerLeft += f.dist[i];
                markerLeft += f.dist[userRating - 1] / 2;
              }
              return (
                <div className="dist-factor" key={f.code}>
                  <div className="dist-factor-desc">{f.desc}</div>
                  <div className="dist-meta">
                    <span className="dist-scores">
                      You: <span style={{ color: "var(--gold)" }}>{userRating}</span>
                      <span style={{ color: "var(--text-muted)", margin: "0 4px" }}>/</span>
                      Survey avg: <span style={{ color: "var(--accent-light)" }}>{f.surveyMean.toFixed(1)}</span>
                      <span style={{ color: deltaColor, marginLeft: 6 }}>({deltaSign}{delta.toFixed(1)})</span>
                    </span>
                  </div>
                  <div className="dist-bar-wrap">
                    {f.dist.map((pct, i) => (
                      <div key={i} className="dist-segment" style={{ width: `${pct}%`, background: DIST_COLORS[i], opacity: userRating === i + 1 ? 1 : 0.35 }}>
                        {pct >= 8 && <div className="dist-pct">{pct.toFixed(0)}%</div>}
                      </div>
                    ))}
                    {userRating > 0 && <div className="dist-marker" style={{ left: `${markerLeft}%` }} />}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ─── AI Recommendations (calls /api/recommend on same domain) ───
function AIRecommendations({ ratings }) {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateAI = async () => {
    setLoading(true);
    setOutput(null);
    setError(null);

    let scoreSummary = "";
    COMPONENT_KEYS.forEach((cKey) => {
      const comp = KMIC_DATA[cKey];
      let compScore = 0;
      comp.factors.forEach((f) => {
        const r = ratings[f.code] || 0;
        compScore += (f.ow / comp.groupWeight) * r;
        scoreSummary += `  "${f.desc}": rated ${r}/5 (survey avg: ${f.surveyMean})\n`;
      });
      scoreSummary += `  => ${comp.name} score: ${compScore.toFixed(3)} (benchmark: ${comp.benchmarkIndex})\n\n`;
    });

    let eiTotal = 0;
    COMPONENT_KEYS.forEach((cKey) => {
      KMIC_DATA[cKey].factors.forEach((f) => { eiTotal += f.ow * (ratings[f.code] || 0); });
    });

    const prompt = `You are a senior Knowledge Management consultant advising an A/E/C (Architecture, Engineering, Construction) organization in a developing country. Your recommendations must be specific, actionable, and grounded in published research.

CONTEXT:
This organization completed a KMIC assessment based on a validated model surveying 220 A/E/C practitioners. Their overall Enabling Index is ${eiTotal.toFixed(3)} out of 5.0 (industry benchmark: 3.767).

SCORES BY COMPONENT:
${scoreSummary}

RESEARCH CONTEXT (use these findings to inform your advice):
- Organizational culture (values, norms, knowledge-sharing mindset) is the single strongest driver of KM effectiveness in construction firms (Gold et al., 2001; Lee and Choi, 2003; Donate and de Pablo, 2015). Interventions here yield the highest returns.
- Employee empowerment is the weakest area across A/E/C firms in developing countries (mean 2.977-3.268), largely due to high power distance and centralized hierarchies (Hofstede, 2011; Dang et al., 2020). Empowerment directly enables knowledge creation and initiative (Zhang and Bartol, 2010).
- Clear, written organizational policies that align operations and communications are critical for institutionalizing KM in project-based environments where teams are temporary (Ozorhon et al., 2014; Dang et al., 2018).
- Trust-building across organizational silos is essential but challenging in the fragmented, competitive A/E/C project environment (Zaheer et al., 1998; Dulaimi et al., 2003).
- Technology investments in information systems yield limited returns without supportive culture, policies, trust, and empowered users first (Dang et al., 2018; Chang and Chuang, 2011).
- Experiential learning and expert interaction are key mechanisms for transferring tacit knowledge in construction, where much knowledge is project-specific and hard to codify (Teerajetgul and Charoenngam, 2006).

YOUR TASK:
Do NOT repeat the scores or restate data. Instead, provide a practical action plan:

1. DIAGNOSIS (3-4 sentences): What does this profile reveal about the organization's KM maturity? What is the root pattern behind the numbers?

2. IMMEDIATE WINS (next 1-3 months): 2-3 low-cost, quick-to-implement actions that can show visible progress. Be very specific (e.g., "Launch a monthly cross-project lessons-learned session" not "improve knowledge sharing"). Explain WHY each works, citing relevant research.

3. STRATEGIC INITIATIVES (3-12 months): 3-4 larger interventions. For each one, describe exactly what to do, what resources are needed, and what outcome to expect. Ground each in evidence (e.g., "Research shows that empowering leadership increases creative process engagement - Zhang and Bartol, 2010").

4. WHAT TO AVOID: 2 common mistakes this type of organization typically makes when trying to improve KM, based on the research evidence.

Write in a direct, advisory tone as if you are presenting to the organization's leadership team. Use plain language, not academic jargon. Format with markdown headers and bullet points.`;

    try {
      const resp = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await resp.json();
      if (data.error) {
        setError(data.error);
      } else {
        setOutput(data.result);
      }
    } catch (err) {
      setError(`Connection failed: ${err.message}`);
    }
    setLoading(false);
  };

  useEffect(() => { generateAI(); }, []);

  const formatMarkdown = (text) => {
    return text
      .replace(/### (.*)/g, "<h4>$1</h4>")
      .replace(/## (.*)/g, "<h4>$1</h4>")
      .replace(/# (.*)/g, "<h4>$1</h4>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^- (.*)/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
      .replace(/<\/ul>\s*<ul>/g, "")
      .replace(/\n{2,}/g, "<br><br>")
      .replace(/\n/g, "<br>");
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2>{"\u2728"} AI-Powered Action Plan</h2>
          <p>Practical improvement strategies grounded in KM research, tailored to your scores</p>
        </div>
      </div>
      <div className="ai-box">
        {loading ? (
          <div className="ai-loading"><div className="spinner" /> Analyzing your profile and preparing a tailored action plan...</div>
        ) : error ? (
          <div>
            <p style={{ color: "var(--red)", marginBottom: 12 }}>{error}</p>
            <button className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: 12 }} onClick={generateAI}>{"\u21BB"} Try Again</button>
          </div>
        ) : output ? (
          <div>
            <div dangerouslySetInnerHTML={{ __html: formatMarkdown(output) }} />
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
              <button className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: 12 }} onClick={generateAI}>{"\u21BB"} Regenerate</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ResultsSection({ ratings, onReset }) {
  const [animatedEI, setAnimatedEI] = useState(0);

  const compScores = {};
  let eiTotal = 0;
  COMPONENT_KEYS.forEach((cKey) => {
    const comp = KMIC_DATA[cKey];
    let compScore = 0;
    comp.factors.forEach((f) => {
      eiTotal += f.ow * (ratings[f.code] || 0);
      compScore += (f.ow / comp.groupWeight) * (ratings[f.code] || 0);
    });
    compScores[cKey] = compScore;
  });

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setAnimatedEI(eiTotal * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [eiTotal]);

  const level = eiTotal >= 4.5 ? { text: "Very High", bg: "var(--green)" }
    : eiTotal >= 3.5 ? { text: "High", bg: "var(--accent)" }
    : eiTotal >= 2.5 ? { text: "Moderate", bg: "var(--orange)" }
    : eiTotal >= 1.5 ? { text: "Low", bg: "var(--red)" }
    : { text: "Very Low", bg: "var(--red)" };

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div className="card">
        <div className="score-hero">
          <div className="score-label">Your Organization's KMIC Index</div>
          <div className="score-big">{animatedEI.toFixed(3)}</div>
          <div className="score-label">out of 5.000</div>
          <div className="score-level" style={{ background: level.bg }}>{level.text}</div>
        </div>
        <div style={{ padding: "0 8px" }}>
          <div className="benchmark-bar">
            <div className="benchmark-fill" style={{ width: `${(eiTotal / 5) * 100}%` }} />
            <div className="benchmark-marker" style={{ left: `${(SURVEY_OVERALL / 5) * 100}%` }}>
              <div className="benchmark-marker-label">Survey avg: 3.767</div>
            </div>
          </div>
          <div className="bar-legend"><span>1.0 Very Low</span><span>3.0 Moderate</span><span>5.0 Very High</span></div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div><h2>Component Breakdown</h2><p>Weighted scores for each KMIC component vs. survey benchmarks</p></div></div>
        {COMPONENT_KEYS.map((cKey, i) => (
          <div className="component-row" key={cKey}>
            <span className="comp-name">{KMIC_DATA[cKey].name}</span>
            <div className="comp-bar-wrap"><div className="comp-bar-fill" style={{ width: `${(compScores[cKey] / 5) * 100}%`, background: COMPONENT_COLORS[i] }} /></div>
            <span className="comp-score" style={{ color: COMPONENT_COLORS[i] }}>{compScores[cKey].toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header"><div><h2>KMIC Profile</h2><p>Your organization (gold) compared to the survey average of 220 A/E/C firms (blue)</p></div></div>
        <RadarChart compScores={compScores} />
      </div>

      <div className="card">
        <div className="card-header"><div><h2>Factor Benchmarks</h2><p>How your rating on each factor compares to the survey distribution of 220 respondents</p></div></div>
        <DistributionBenchmark ratings={ratings} />
      </div>

      <AIRecommendations ratings={ratings} />

      <div className="btn-row" style={{ marginBottom: 40 }}>
        <button className="btn btn-secondary" onClick={onReset}>{"\u21BA"} Start Over</button>
      </div>
    </div>
  );
}

// ─── Main App ───
export default function KMICApp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [ratings, setRatings] = useState({});

  const handleRate = (code, value) => { setRatings((prev) => ({ ...prev, [code]: value })); };
  const isSectionComplete = (stepIndex) => {
    if (stepIndex >= 5) return true;
    return KMIC_DATA[COMPONENT_KEYS[stepIndex]].factors.every((f) => ratings[f.code] > 0);
  };
  const goNext = () => { setCurrentStep((s) => Math.min(s + 1, 5)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goBack = () => { setCurrentStep((s) => Math.max(s - 1, 0)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const reset = () => { setRatings({}); setCurrentStep(0); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const nextCompName = currentStep < 4 ? KMIC_DATA[COMPONENT_KEYS[currentStep + 1]].name : null;

  return (
    <>
      <style>{css}</style>
      <div className="app-container">
        <header className="app-header">
          <div className="logo-badge"><span className="dot" /> KMIC Assessment</div>
          <h1>Knowledge Management<br />Infrastructure <span>Capability</span></h1>
          <p className="subtitle">
            How well does your organization create, share, and apply knowledge? This tool measures five key dimensions of knowledge management readiness and benchmarks your performance against 220 A/E/C firms in developing economies.
          </p>
        </header>
        <Stepper current={currentStep} />
        {currentStep < 5 && (
          <div key={currentStep}>
            <ComponentCard comp={KMIC_DATA[COMPONENT_KEYS[currentStep]]} ratings={ratings} onRate={handleRate} />
            <div className="btn-row">
              {currentStep > 0 && <button className="btn btn-secondary" onClick={goBack}>{"\u2190"} Back</button>}
              {currentStep < 4 ? (
                <button className="btn btn-primary" disabled={!isSectionComplete(currentStep)} onClick={goNext}>
                  Next: {nextCompName} {"\u2192"}
                </button>
              ) : (
                <button className="btn btn-gold" disabled={!isSectionComplete(currentStep)} onClick={goNext}>
                  {"\u2733"} Calculate KMIC Index
                </button>
              )}
            </div>
          </div>
        )}
        {currentStep === 5 && <ResultsSection ratings={ratings} onReset={reset} />}
        <footer>
          <p>KMIC Assessment Tool - Based on the FSE-based Enabling Index model for A/E/C organizations</p>
          <p style={{ marginTop: 4 }}>Reference: Forming an enabling index of knowledge management infrastructure capability levels for A/E/C organizations</p>
        </footer>
      </div>
    </>
  );
}
