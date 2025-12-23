import { cn } from "@/lib/utils";

interface TextBlockProps {
  style: "note" | "paragraph";
  children: React.ReactNode;
}

export function TextBlock({ style, children }: TextBlockProps) {
  const styleClasses = {
    note: "text-sm text-slate-600 italic max-w-2xl mx-auto my-6",
    paragraph: "text-base text-slate-900 max-w-2xl mx-auto my-6 leading-relaxed",
  };

  return (
    <div className={cn(styleClasses[style])}>
      {children}
    </div>
  );
}

