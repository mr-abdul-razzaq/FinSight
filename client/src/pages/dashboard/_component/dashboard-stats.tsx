import { useSummaryAnalyticsQuery } from "@/features/analytics/analyticsAPI";
import SummaryCard from "./summary-card";
import { DateRangeType } from "@/components/date-range-select";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const DashboardStats = ({ dateRange }: { dateRange?: DateRangeType }) => {
  const { data, isFetching } = useSummaryAnalyticsQuery(
    { preset: dateRange?.value },
    { skip: !dateRange }
  );
  const summaryData = data?.data;

  return (
    <div className="flex flex-row items-center pt-2">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 lg:flex-[1] grid grid-cols-1 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <SummaryCard
            title="Available Balance"
            value={summaryData?.availableBalance}
            dateRange={dateRange}
            percentageChange={summaryData?.percentageChange?.balance}
            isLoading={isFetching}
            cardType="balance"
          />
        </motion.div>
        <motion.div variants={item}>
          <SummaryCard
            title="Total Income"
            value={summaryData?.totalIncome}
            percentageChange={summaryData?.percentageChange?.income}
            dateRange={dateRange}
            isLoading={isFetching}
            cardType="income"
          />
        </motion.div>
        <motion.div variants={item}>
          <SummaryCard
            title="Total Expenses"
            value={summaryData?.totalExpenses}
            dateRange={dateRange}
            percentageChange={summaryData?.percentageChange?.expenses}
            isLoading={isFetching}
            cardType="expenses"
          />
        </motion.div>
        <motion.div variants={item}>
          <SummaryCard
            title="Savings Rate"
            value={summaryData?.savingRate?.percentage}
            expenseRatio={summaryData?.savingRate?.expenseRatio}
            isPercentageValue
            dateRange={dateRange}
            isLoading={isFetching}
            cardType="savings"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardStats;
