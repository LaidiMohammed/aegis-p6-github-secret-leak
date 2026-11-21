import { NextRequest, NextResponse } from "next/server";
import { scanRepo } from "@/lib/detector";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const out = scanRepo(body);
    return NextResponse.json(out);
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}
