// A static health endpoint works in both the server preview and a Pages export.
// Portfolio content is committed to Git, so no runtime database is required.
export const dynamic = "force-static";

export function GET() {
  return Response.json({ ok: true, service: "portfolio" });
}
