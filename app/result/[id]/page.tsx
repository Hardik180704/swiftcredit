import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import DecisionCard from "@/components/DecisionCard";

export const dynamic = 'force-dynamic';

export default async function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const application = await prisma.application.findUnique({
    where: { id: resolvedParams.id },
    include: { 
      decision: true,
      auditLogs: { orderBy: { createdAt: 'asc' } }
    }
  });

  if (!application || !application.decision) {
    notFound();
  }

  const { decision, auditLogs } = application;
  const reasonCodes = JSON.parse(decision.reasonCodes);

  return (
    <div className="h-screen bg-white flex font-sans overflow-hidden">
      <div className="hidden lg:flex flex-col justify-between w-[40%] bg-neutral-50 text-neutral-900 p-16 xl:p-20 border-r border-neutral-100 animate-in fade-in slide-in-from-left-4 duration-1000 relative">
        <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-neutral-100 blur-3xl opacity-50 pointer-events-none -z-10"></div>
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
          </Link>
          <div className="mt-20">
            <img src="/logo.png" alt="SwiftCredit Logo" className="h-12 w-auto mix-blend-multiply mb-8 -ml-2" />
            <h2 className="text-5xl font-semibold tracking-tight leading-[1.1]">Decision <br/><span className="text-neutral-400 font-light">Summary</span></h2>
            <p className="mt-6 text-neutral-500 font-light leading-relaxed max-w-sm">We&apos;ve completed the evaluation of your business profile. Review your custom credit decision to your right.</p>
          </div>
        </div>

        <div className="flex-1 mt-8 mb-8 overflow-y-auto pr-4 custom-scrollbar">
          <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">System Audit Trail</h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
            {auditLogs && auditLogs.length > 0 ? auditLogs.map((log: { id: string, createdAt: Date | string, action: string }) => (
              <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white bg-neutral-300 transition-colors shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-2xl bg-white border border-neutral-100 shadow-sm ml-4 md:ml-0 md:group-even:mr-4 hover:border-neutral-200 transition-all">
                   <div className="flex items-center justify-between mb-1">
                      <time className="text-[9px] font-bold tracking-widest uppercase text-neutral-400">{new Date(log.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time>
                   </div>
                   <div className="text-xs font-semibold text-neutral-700">{log.action.replace(/_/g, ' ')}</div>
                </div>
              </div>
            )) : null}
          </div>
        </div>
        
        <div>
           <Link href="/apply" className="inline-flex items-center justify-center px-8 py-4 bg-white border border-neutral-200 text-neutral-900 text-sm font-medium rounded-full shadow-sm hover:bg-neutral-50 transition-all">
            Start Another Application
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-[60%] flex flex-col justify-center p-6 sm:p-12 lg:px-24 bg-white h-full overflow-y-auto z-10 shadow-[-20px_0_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="max-w-xl w-full mx-auto animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
          <div className="lg:hidden mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-neutral-900 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Link>
          </div>

          <DecisionCard 
            result={decision.result as "APPROVED" | "REJECTED"}
            creditScore={decision.creditScore}
            reasonCodes={reasonCodes}
            name={application.name}
            loanAmount={application.loanAmount}
            tenure={application.tenure}
          />

          <div className="lg:hidden mt-12 flex flex-col items-center">
            <Link href="/apply" className="inline-flex items-center justify-center px-8 py-4 bg-neutral-900 text-white text-sm font-medium rounded-full shadow-md hover:bg-black transition-all w-full">
              Start Another Application
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
