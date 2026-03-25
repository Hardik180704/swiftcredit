import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ApplicationSchema } from "@/lib/validators";
import rateLimit from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "unknown_submitter";
    const rateLimitResult = rateLimit(ip, 3, 60 * 1000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many applications submitted. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = ApplicationSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid format check", details: parsed.error.format() }, 
        { status: 400 }
      );
    }
    
    const data = parsed.data;

    const application = await prisma.application.create({
      data: {
        name: data.name,
        pan: data.pan,
        businessType: data.businessType,
        monthlyRevenue: data.monthlyRevenue,
        loanAmount: data.loanAmount,
        tenure: data.tenure,
        loanPurpose: data.loanPurpose,
        status: "PENDING"
      }
    });

    await prisma.auditLog.create({
      data: {
        applicationId: application.id,
        action: "APPLICATION_SUBMITTED",
        details: JSON.stringify({ ip, requestedAmount: data.loanAmount })
      }
    });

    const origin = request.headers.get("origin") || new URL(request.url).origin;
    
    fetch(`${origin}/api/decision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId: application.id })
    }).catch(err => {
      console.error("[Engine Trigger Failed]", err);
    });

    return NextResponse.json({ applicationId: application.id, status: "PENDING" }, { status: 201 });
  } catch (error: unknown) {
    console.error("[Application API Error]", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: "Database operation failed", code: error.code }, { status: 500 });
    }
    
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
