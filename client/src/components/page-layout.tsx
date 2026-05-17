import { cn } from "@/lib/utils";
import PageHeader from "./page-header";

interface PropsType {
  children: React.ReactNode;
  className?: string
  title?: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  showHeader?: boolean;
  renderPageHeader?: React.ReactNode
}

const PageLayout = ({ children, className,
  title,
  subtitle,
  rightAction,
  showHeader = true,
  renderPageHeader,
 }: PropsType) => {
  return (
    <div>
      {showHeader && (
        <PageHeader 
          title={title} 
          subtitle={subtitle} 
          rightAction={rightAction} 
          renderPageHeader={renderPageHeader}
        />
      )}
    <div className={cn("w-full max-w-[var(--max-width)] mx-auto pt-8",
      className)}>
      {children}
    </div>
    </div>
  );
};

export default PageLayout;
