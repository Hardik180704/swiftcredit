import { ApplicationInput } from './validators';

export type DecisionResult = {
  result: "APPROVED" | "REJECTED";
  creditScore: number;
  reasonCodes: string[];
};

export function generateDecision(data: ApplicationInput): DecisionResult {
  let creditScore = 50;
  const reasonCodes: string[] = [];

  const emi = data.loanAmount / data.tenure;
  const emiToRevenueRatio = emi / data.monthlyRevenue;

  if (emiToRevenueRatio < 0.3) {
    creditScore += 20;
    reasonCodes.push("STRONG_REPAYMENT_CAPACITY");
  } else if (emiToRevenueRatio >= 0.3 && emiToRevenueRatio <= 0.5) {
    creditScore += 10;
  } else {
    creditScore -= 20;
    reasonCodes.push("HIGH_EMI_TO_REVENUE_RATIO");
  }

  const loanToRevenueMultiple = data.loanAmount / data.monthlyRevenue;
  if (loanToRevenueMultiple < 3) {
    creditScore += 15;
  } else if (loanToRevenueMultiple >= 3 && loanToRevenueMultiple <= 6) {
    creditScore += 5;
  } else {
    creditScore -= 15;
    reasonCodes.push("LOAN_AMOUNT_EXCEEDS_REVENUE_LIMIT");
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (panRegex.test(data.pan)) {
    creditScore += 10;
  } else {
    creditScore -= 20;
    reasonCodes.push("INVALID_PAN_FORMAT");
  }

  if (data.monthlyRevenue > 0) {
    creditScore += 5;
  }
  if (data.monthlyRevenue < 10000) {
    reasonCodes.push("LOW_MONTHLY_REVENUE");
  }

  if (data.tenure >= 6 && data.tenure <= 60) {
    creditScore += 5;
  } else {
    creditScore -= 10;
    reasonCodes.push("INVALID_TENURE");
  }

  if (creditScore > 100) creditScore = 100;
  if (creditScore < 0) creditScore = 0;

  if (creditScore >= 75) {
    reasonCodes.push("APPROVED_GOOD_PROFILE");
  }

  const result = creditScore >= 60 ? "APPROVED" : "REJECTED";

  return { result, creditScore, reasonCodes };
}
