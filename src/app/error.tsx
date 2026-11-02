"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="state-page"><div className="state-card"><span className="state-mark">G<span>/</span>M.</span><p className="state-eyebrow">SOMETHING WENT OFF COURSE</p><h1>A small detour,<br /><em>not the end.</em></h1><p>This page couldn’t be loaded right now. You can try again or return to the portfolio.</p><div className="state-actions"><button type="button" onClick={reset}>Try again ↗</button><Link href="/">Back to home</Link></div></div></main>;
}
