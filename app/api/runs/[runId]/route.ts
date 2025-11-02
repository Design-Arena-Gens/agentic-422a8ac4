import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ runId: string }> }
) {
  const { runId } = await params;

  return NextResponse.json({
    id: runId,
    status: "running",
    startedAt: new Date().toISOString(),
    workers: [
      {
        id: "worker_1",
        label: "Data Ingestion Worker",
        status: "completed",
        eta: null
      },
      {
        id: "worker_2",
        label: "Validation Worker",
        status: "running",
        eta: "2m 15s"
      },
      {
        id: "worker_3",
        label: "Transform Worker",
        status: "pending",
        eta: "5m 30s"
      },
      {
        id: "worker_4",
        label: "Deployment Worker",
        status: "pending",
        eta: "8m 45s"
      }
    ]
  });
}
