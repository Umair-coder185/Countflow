export async function GET(request) {
  try {
    const ua = request.headers.get("user-agent") || "unknown";
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const url = request.url || "-";

    console.log("[log-crawler] hit:", { url, ip, ua });

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("[log-crawler] error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  return GET(request);
}

/*
Usage:
- Deploy this route and point your crawler or monitoring tool to
  `/api/log-crawler` to capture requests in your hosting logs.
- In Vercel/Netlify, these console.logs appear in function logs.
*/
