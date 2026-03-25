import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { generateDecision } from "@/lib/decisionEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { applicationId } = body;

    if (!applicationId) {
      return NextResponse.json({ error: "applicationId is required" }, { status: 400 });
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const application = await prisma.application.findUnique({
      where: { id: applicationId }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (application.status !== "PENDING") {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    const data = {
      name: application.name,
      pan: application.pan,
      businessType: application.businessType as "Retail" | "Manufacturing" | "Services" | "Trading",
      monthlyRevenue: application.monthlyRevenue,
      loanAmount: application.loanAmount,
      tenure: application.tenure,
      loanPurpose: application.loanPurpose,
    };

    const decisionResult = generateDecision(data);

    const [decisionRecord] = await prisma.$transaction([
      prisma.decision.create({
        data: {
          applicationId: application.id,
          result: decisionResult.result,
          creditScore: decisionResult.creditScore,
          reasonCodes: JSON.stringify(decisionResult.reasonCodes)
        }
      }),
      prisma.application.update({
        where: { id: application.id },
        data: { status: "COMPLETED" }
      }),
      prisma.auditLog.create({
        data: {
          applicationId: application.id,
          action: "DECISION_GENERATED",
          details: JSON.stringify({ result: decisionResult.result, score: decisionResult.creditScore })
        }
      })
    ]);

    return NextResponse.json({ success: true, decisionRecord });
  } catch (error: unknown) {
    console.error("[Decision API Error]", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: "Decision commit failed", code: error.code }, { status: 500 });
    }

    const message = error instanceof Error ? error.message : "An internal engine error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
