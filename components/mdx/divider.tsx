import { cn } from "@/lib/utils";

interface DividerProps {
  style: "blank" | "rule";
}

export function Divider({ style }: DividerProps) {
  if (style === "blank") {
    return <div className="my-12" />;
  }

  return (
    <hr className="my-12 border-t border-slate-200 max-w-2xl mx-auto" />
  );
}

