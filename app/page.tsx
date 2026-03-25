import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, BarChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="h-screen bg-white text-neutral-900 flex flex-col font-sans overflow-hidden">
      <header className="py-6 px-10 border-b border-neutral-100 flex-shrink-0 z-10 bg-white">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <span className="text-2xl font-bold tracking-tight">SwiftCredit</span>
          <nav className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">About Us</nav>
        </div>
      </header>
      
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2">
        <div className="p-12 md:p-20 flex flex-col justify-center border-r border-neutral-100 relative h-full">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000 max-w-xl mx-auto lg:mx-0">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
              Empowering your <br/>
              <span className="text-neutral-400">business growth.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 font-light leading-relaxed">
              Experience seamless, instant credit decisions designed exclusively for modern forward-thinking MSMEs.
            </p>
            
            <div className="pt-6">
              <Link href="/apply" className="group inline-flex items-center justify-center px-8 py-4 text-sm font-medium bg-neutral-900 text-white hover:bg-black transition-all rounded-full shadow-lg">
                Apply for Capital
                <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 p-12 md:p-24 flex flex-col justify-center space-y-12 h-full border-t lg:border-t-0 border-neutral-100">
          <div className="max-w-md mx-auto lg:mx-0 space-y-12">
            <div className="group animate-in fade-in slide-in-from-right-8 duration-1000 delay-100 fill-mode-both flex items-start">
               <div className="bg-white p-3 rounded-2xl shadow-sm border border-neutral-100 mr-6 shrink-0">
                 <Zap className="w-6 h-6 text-neutral-900 stroke-[1.5]" />
               </div>
               <div>
                 <h3 className="font-semibold text-lg mb-1">Instant Decisions</h3>
                 <p className="text-neutral-500 font-light leading-relaxed">Get your application reviewed in real-time, eliminating agonizing wait periods.</p>
               </div>
            </div>
            <div className="group animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 fill-mode-both flex items-start">
               <div className="bg-white p-3 rounded-2xl shadow-sm border border-neutral-100 mr-6 shrink-0">
                 <ShieldCheck className="w-6 h-6 text-neutral-900 stroke-[1.5]" />
               </div>
               <div>
                 <h3 className="font-semibold text-lg mb-1">Smart Evaluation</h3>
                 <p className="text-neutral-500 font-light leading-relaxed">Our system uses objective metrics to ensure fair and accurate loan outcomes.</p>
               </div>
            </div>
            <div className="group animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-both flex items-start">
               <div className="bg-white p-3 rounded-2xl shadow-sm border border-neutral-100 mr-6 shrink-0">
                 <BarChart className="w-6 h-6 text-neutral-900 stroke-[1.5]" />
               </div>
               <div>
                 <h3 className="font-semibold text-lg mb-1">Total Transparency</h3>
                 <p className="text-neutral-500 font-light leading-relaxed">Understand exactly how your business profile influenced the final credit score.</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
