import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
