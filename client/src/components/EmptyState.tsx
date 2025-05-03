import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  onAddIdea: () => void;
}

export default function EmptyState({ onAddIdea }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <svg 
        className="mb-6 w-48 h-auto opacity-50"
        viewBox="0 0 300 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="300" height="200" rx="10" fill="#E0E0E0" />
        <path d="M150 80C161.046 80 170 71.0457 170 60C170 48.9543 161.046 40 150 40C138.954 40 130 48.9543 130 60C130 71.0457 138.954 80 150 80Z" fill="#9E9E9E"/>
        <rect x="110" y="100" width="80" height="10" rx="5" fill="#9E9E9E"/>
        <rect x="125" y="120" width="50" height="10" rx="5" fill="#9E9E9E"/>
        <rect x="85" y="140" width="130" height="10" rx="5" fill="#9E9E9E"/>
        <rect x="100" y="160" width="100" height="10" rx="5" fill="#9E9E9E"/>
      </svg>
      <h2 className="text-2xl font-bold text-neutral-400 mb-2">アイデアを追加しましょう</h2>
      <p className="text-neutral-300 mb-6 max-w-md">
        チームと共有したいアイデアやコンセプトを投稿して、コラボレーションを始めましょう。
      </p>
      <Button 
        onClick={onAddIdea} 
        className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-lg transition flex items-center"
      >
        <Plus className="mr-1 h-5 w-5" />
        最初のアイデアを追加
      </Button>
    </motion.div>
  );
}
