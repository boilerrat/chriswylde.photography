import { ImageBlock } from "./image-block";

interface TwoUpProps {
  children: React.ReactNode;
}

export function TwoUp({ children }: TwoUpProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-8">
      {children}
    </div>
  );
}

