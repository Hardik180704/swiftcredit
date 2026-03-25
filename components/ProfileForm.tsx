import { useFormContext } from "react-hook-form";

export default function ProfileForm() {
  const { register, formState: { errors } } = useFormContext();

  const inputClasses = "mt-2 block w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 py-3 px-4 text-neutral-900 focus:border-neutral-400 focus:bg-white focus:ring-4 focus:ring-neutral-100 sm:text-base font-normal transition-all outline-none";
  const labelClasses = "block text-sm font-medium text-neutral-700 ml-1";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <label className={labelClasses}>Business Name</label>
        <input {...register("name")} className={inputClasses} placeholder="e.g. Acme Corp" />
        {errors.name && <p className="text-red-500 text-xs mt-2 font-medium ml-1">{errors.name.message?.toString()}</p>}
      </div>

      <div>
        <label className={labelClasses}>Tax ID (PAN)</label>
        <input {...register("pan")} className={`${inputClasses} uppercase`} placeholder="ABCDE1234F" />
        {errors.pan && <p className="text-red-500 text-xs mt-2 font-medium ml-1">{errors.pan.message?.toString()}</p>}
      </div>

      <div>
        <label className={labelClasses}>Sector</label>
        <select {...register("businessType")} className={inputClasses}>
          <option value="Retail">Retail</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Services">Services</option>
          <option value="Trading">Trading</option>
        </select>
        {errors.businessType && <p className="text-red-500 text-xs mt-2 font-medium ml-1">{errors.businessType.message?.toString()}</p>}
      </div>

      <div>
        <label className={labelClasses}>Monthly Revenue (₹)</label>
        <input type="number" {...register("monthlyRevenue")} className={inputClasses} placeholder="100000" />
        {errors.monthlyRevenue && <p className="text-red-500 text-xs mt-2 font-medium ml-1">{errors.monthlyRevenue.message?.toString()}</p>}
      </div>
    </div>
  );
}
