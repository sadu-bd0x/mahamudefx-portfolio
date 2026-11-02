import { getCmsConfig } from "@/lib/cms-config";

// Build-time config also works on a static host. It contains only public repo,
// branch and OAuth Worker URL; the Worker alone holds OAuth credentials.
export const dynamic = "force-static";

export function GET() {
  const config = getCmsConfig();
  return Response.json(config || { configured: false }, {
    headers: { "X-Robots-Tag": "noindex, nofollow" },
  });
}
