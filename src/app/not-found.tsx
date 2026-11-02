import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="state-page"><div className="state-card"><span className="state-mark">G<span>/</span>M.</span><p className="state-eyebrow">404 / PAGE NOT FOUND</p><h1>Not quite<br /><em>where we meant to go.</em></h1><p>This page doesn’t exist, or it hasn’t been published yet.</p><div className="state-actions"><Link href="/"><ArrowLeft size={16} aria-hidden="true" /> Back to portfolio</Link></div></div></main>;
}
