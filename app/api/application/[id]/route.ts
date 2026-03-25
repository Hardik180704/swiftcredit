import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const id = params.id;

    const application = await prisma.application.findUnique({
      where: { id },
      include: { decision: true }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (application.status === "PENDING") {
      return NextResponse.json({ status: "PENDING" });
    }

    let parsedReasonCodes: string[] = [];
    if (application.decision?.reasonCodes) {
      try {
        parsedReasonCodes = JSON.parse(application.decision.reasonCodes);
      } catch {
        parsedReasonCodes = [];
      }
    }

    return NextResponse.json({
      status: application.status,
      decision: {
        result: application.decision?.result,
        creditScore: application.decision?.creditScore,
        reasonCodes: parsedReasonCodes
      }
    });

  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
