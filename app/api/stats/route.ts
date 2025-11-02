import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    plugins: 42,
    agents: 18,
    skills: 127,
    orchestrators: 9,
    activePlanName: "Production Deployment Pipeline",
    activeRunId: "run_abc123"
  });
}
