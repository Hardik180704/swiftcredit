export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center space-x-2 mb-4 w-full">
      <div className={`h-1.5 flex-1 transition-all duration-700 ease-in-out rounded-full ${currentStep >= 1 ? 'bg-neutral-900 lg:bg-neutral-900' : 'bg-neutral-200 lg:bg-neutral-200'}`}></div>
      <div className={`h-1.5 flex-1 transition-all duration-700 ease-in-out rounded-full ${currentStep >= 2 ? 'bg-neutral-900 lg:bg-neutral-900' : 'bg-neutral-200 lg:bg-neutral-200'}`}></div>
    </div>
  )
}
