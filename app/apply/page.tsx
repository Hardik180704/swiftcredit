"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import ProfileForm from "@/components/ProfileForm";
import LoanForm from "@/components/LoanForm";
import { ApplicationSchema, ApplicationInput } from "@/lib/validators";
import Link from "next/link";

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const methods = useForm<ApplicationInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(ApplicationSchema) as any,
    mode: "onTouched",
    defaultValues: {
      businessType: "Retail"
    }
  });

  const { trigger, handleSubmit } = methods;

  const handleNext = async () => {
    const fields = step === 1 
      ? ["name", "pan", "businessType", "monthlyRevenue"] as const
      : ["loanAmount", "tenure", "loanPurpose"] as const;
    const isStepValid = await trigger(fields);
    if (isStepValid) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const onSubmit = async (data: ApplicationInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit application");
      }

      const { applicationId } = json;

      const poll = setInterval(async () => {
        try {
          const pollRes = await fetch(`/api/application/${applicationId}`);
          if (!pollRes.ok) throw new Error("Status check failed");
          
          const pollJson = await pollRes.json();
          if (pollJson.status === "COMPLETED") {
            clearInterval(poll);
            router.push(`/result/${applicationId}`);
          }
        } catch (pollErr) {
          console.error("Polling error caught:", pollErr);
        }
      }, 2000);

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "A connection error occurred.";
      setError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-white flex font-sans overflow-hidden">
      <div className="hidden lg:flex flex-col justify-between w-[40%] bg-neutral-50 text-neutral-900 p-16 xl:p-20 border-r border-neutral-100 animate-in fade-in slide-in-from-left-4 duration-1000">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
          </Link>
          <div className="mt-20">
            <img src="/logo.png" alt="SwiftCredit Logo" className="h-12 w-auto mix-blend-multiply mb-8 -ml-2" />
            <h2 className="text-5xl font-semibold tracking-tight">Your Business <br/><span className="text-neutral-400 font-light">Profile</span></h2>
            <p className="mt-6 text-neutral-500 font-light leading-relaxed max-w-sm">We just need a few details to provide an accurate, personalized credit decision for your enterprise.</p>
          </div>
        </div>
        
        <div className="w-full pr-12 xl:pr-16">
           <StepIndicator currentStep={step} />
           <div className="flex justify-between text-xs font-medium text-neutral-400">
             <span className={step >= 1 ? "text-neutral-900" : ""}>1. Profile</span>
             <span className={step >= 2 ? "text-neutral-900" : ""}>2. Loan Details</span>
           </div>
        </div>
      </div>

      <div className="w-full lg:w-[60%] flex flex-col justify-center p-8 sm:p-16 lg:px-32 bg-white h-full overflow-y-auto">
        <div className="w-full max-w-xl mx-auto animate-in fade-in slide-in-from-right-4 duration-1000">
          <div className="lg:hidden mb-12">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-neutral-400 hover:text-neutral-900 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Home
            </Link>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Application</h2>
            <StepIndicator currentStep={step} />
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-800 border border-red-100 text-sm font-medium rounded-2xl">
              {error}
            </div>
          )}

          <div className="px-2">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && <ProfileForm />}
                {step === 2 && <LoanForm />}

                <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                  {step === 2 ? (
                    <button type="button" onClick={handleBack} disabled={isSubmitting} className="w-full sm:w-auto px-8 py-4 bg-white border border-neutral-200 text-neutral-600 text-sm font-medium hover:bg-neutral-50 transition-colors focus:outline-none rounded-full">
                      Back
                    </button>
                  ) : null}
                  
                  {step === 1 ? (
                    <button type="button" onClick={handleNext} className="w-full flex justify-center items-center py-4 bg-neutral-900 text-white text-sm font-medium hover:bg-black transition-colors focus:outline-none rounded-full shadow-md">
                      Continue
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="w-full flex-1 py-4 flex justify-center items-center bg-neutral-900 text-white text-sm font-medium hover:bg-black transition-colors disabled:opacity-70 focus:outline-none rounded-full shadow-md">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4" />
                          Evaluating...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
