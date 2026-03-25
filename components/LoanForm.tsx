import { useFormContext } from "react-hook-form";

export default function LoanForm() {
  const { register, formState: { errors } } = useFormContext();

  const inputClasses = "mt-2 block w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 py-3 px-4 text-neutral-900 focus:border-neutral-400 focus:bg-white focus:ring-4 focus:ring-neutral-100 sm:text-base font-normal transition-all outline-none";
  const labelClasses = "block text-sm font-medium text-neutral-700 ml-1";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <label className={labelClasses}>Requested Loan Amount (₹)</label>
        <input type="number" {...register("loanAmount")} className={inputClasses} placeholder="500000" />
        {errors.loanAmount && <p className="text-red-500 text-xs mt-2 font-medium ml-1">{errors.loanAmount.message?.toString()}</p>}
      </div>

      <div>
        <label className={labelClasses}>Duration (Months)</label>
        <input type="number" {...register("tenure")} className={inputClasses} placeholder="12" />
        {errors.tenure && <p className="text-red-500 text-xs mt-2 font-medium ml-1">{errors.tenure.message?.toString()}</p>}
      </div>

      <div>
        <label className={labelClasses}>Purpose of Loan</label>
        <textarea {...register("loanPurpose")} rows={3} className={`${inputClasses} resize-none`} placeholder="Briefly describe how you plan to use this capital..." />
        {errors.loanPurpose && <p className="text-red-500 text-xs mt-2 font-medium ml-1">{errors.loanPurpose.message?.toString()}</p>}
      </div>
    </div>
  );
}
