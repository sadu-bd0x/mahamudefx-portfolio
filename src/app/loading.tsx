export default function Loading() {
  return <main className="state-page" aria-live="polite" aria-busy="true">
    <div className="state-card"><span className="state-mark">G<span>/</span>M.</span><p className="state-eyebrow">A MOMENT, PLEASE</p><h1>Putting the pieces<br /><em>together.</em></h1><div className="loading-line" aria-hidden="true"><span /></div><p>Loading the portfolio…</p></div>
  </main>;
}
