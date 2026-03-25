import { CheckCircle2, XCircle, TrendingUp, AlertCircle } from "lucide-react";

type DecisionCardProps = {
  result: "APPROVED" | "REJECTED";
  creditScore: number;
  reasonCodes: string[];
  name: string;
  loanAmount: number;
  tenure: number;
};

export default function DecisionCard({ result, creditScore, reasonCodes, name, loanAmount, tenure }: DecisionCardProps) {
  const isApproved = result === "APPROVED";

  return (
    <div className={`relative group animate-in zoom-in-95 duration-1000 max-w-lg w-full mx-auto`}>
      {/* Animated Glowing Background Border */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 ${
        isApproved ? 'from-emerald-400 via-teal-400 to-green-400' : 'from-rose-400 via-red-400 to-pink-400'
      }`}></div>
      
      {/* Card Wrapper */}
      <div className="relative bg-white text-neutral-900 border border-neutral-100/50 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col isolation-auto">
        
        {/* Header Section */}
        <div className={`p-8 sm:p-10 border-b border-neutral-100/60 flex justify-between items-center relative overflow-hidden ${
          isApproved ? 'bg-gradient-to-br from-emerald-50/80 to-teal-50/30' : 'bg-gradient-to-br from-rose-50/80 to-red-50/30'
        }`}>
          {/* Abstract soft background glow */}
          <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-40 transition-transform duration-1000 group-hover:scale-110 ${
            isApproved ? 'bg-emerald-400' : 'bg-rose-400'
          }`}></div>

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className={`relative flex h-2 w-2 rounded-full ${isApproved ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isApproved ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Status Confirmed</span>
            </div>
            <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight ${isApproved ? 'text-emerald-950' : 'text-rose-950'}`}>
              {result}
            </h2>
            <p className="text-neutral-500 font-medium text-sm mt-3">{name}</p>
          </div>

          <div className={`relative z-10 p-4 rounded-2xl shadow-lg border backdrop-blur-sm ${
            isApproved ? 'bg-white/90 text-emerald-600 border-emerald-100/50 shadow-emerald-200/50' : 'bg-white/90 text-rose-600 border-rose-100/50 shadow-rose-200/50'
          }`}>
            {isApproved ? <CheckCircle2 className="w-10 h-10" strokeWidth={2.5} /> : <XCircle className="w-10 h-10" strokeWidth={2.5} />}
          </div>
        </div>
        
        {/* Body Section */}
        <div className="p-8 sm:p-10 flex flex-col gap-10">
          
          {/* Score Header */}
          <div>
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center">
                 {isApproved ? <TrendingUp className="w-4 h-4 mr-2 text-emerald-500" /> : <AlertCircle className="w-4 h-4 mr-2 text-rose-500" />}
                 Engine Score
              </h3>
              <span className="text-neutral-400 text-xs font-bold tracking-widest">MAX 100</span>
            </div>
            
            <div className="flex items-baseline mb-6">
              <span className="text-7xl font-semibold tracking-tighter leading-none text-neutral-900">{creditScore}</span>
            </div>
            
            {/* Custom Premium Progress Bar */}
            <div className="w-full bg-neutral-100 h-3 relative overflow-hidden rounded-full shadow-inner border border-neutral-200/50">
              <div 
                className={`absolute top-0 left-0 h-full transition-all duration-1500 ease-out rounded-full shadow-sm ${
                  isApproved ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-rose-400 to-rose-500'
                }`} 
                style={{ width: `${creditScore}%` }}
              >
                {/* Shiny highlight inside progress bar */}
                <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-white/40 rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>

          {/* Reason Codes */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300 fill-mode-both">
             <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Decision Factors</h3>
             <div className="flex flex-col gap-3">
               {reasonCodes.map((code, idx) => (
                 <div key={idx} className="group/factor flex items-center text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 px-5 py-4 rounded-2xl border border-neutral-100 shadow-sm transition-all hover:shadow-md cursor-default">
                   <div className={`w-2 h-2 rounded-full mr-4 shadow-sm ${isApproved ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
                   {code.replace(/_/g, ' ')}
                 </div>
               ))}
               {reasonCodes.length === 0 && <span className="text-sm text-neutral-400 italic bg-neutral-50 px-5 py-4 rounded-2xl border border-neutral-100 block">No specific factors listed.</span>}
             </div>
          </div>

          {/* Summary Footer */}
          <div className="pt-2 border-t border-neutral-100/0 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500 fill-mode-both">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-100 transition-colors hover:bg-neutral-100/80">
                <p className="text-neutral-400 mb-2 text-[10px] uppercase tracking-widest font-bold">Requested Amount</p>
                <p className="font-semibold text-xl text-neutral-900">₹{loanAmount.toLocaleString()}</p>
              </div>
              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-100 transition-colors hover:bg-neutral-100/80">
                 <p className="text-neutral-400 mb-2 text-[10px] uppercase tracking-widest font-bold">Duration</p>
                 <p className="font-semibold text-xl text-neutral-900">{tenure} months</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
