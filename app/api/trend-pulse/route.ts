import { NextResponse } from "next/server";
import { getTrendPulseData } from "../../lib/trendPulse";

export const runtime = "nodejs";
// Serve cached data for up to 6 hours; refreshes in the background.
export const revalidate = 21600;

export async function GET() {
  const data = await getTrendPulseData();
  return NextResponse.json(data);
}
