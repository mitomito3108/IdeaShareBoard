import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { formatDate, getTagColor, PATTERN_URLS } from "@/lib/constants";
import { Idea } from "@/lib/types";
import { forwardRef } from "react";

interface IdeaCardProps {
  idea: Idea;
  onClick: () => void;
  dragHandleProps?: any;
}

const IdeaCard = forwardRef<HTMLDivElement, IdeaCardProps>(
  ({ idea, onClick, dragHandleProps, ...props }, ref) => {
    // Setup background style based on the background type
    const getBackgroundStyle = () => {
      if (idea.background === "white") {
        return { backgroundColor: "#ffffff" };
      } else if (idea.background.startsWith("#")) {
        return { backgroundColor: idea.background };
      } else if (idea.background.startsWith("pattern")) {
        const patternUrl = 
          idea.background === "pattern1" 
            ? PATTERN_URLS.pattern1 
            : PATTERN_URLS.pattern2;
        
        return {
          backgroundImage: `linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.8)), url('${patternUrl}')`,
          backgroundSize: "cover",
        };
      }
      
      return {};
    };

    const tagColor = getTagColor(idea.tag);

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        transition={{ duration: 0.2 }}
        className="cursor-grab active:cursor-grabbing"
        {...props}
      >
        <Card 
          className="overflow-hidden h-full"
          style={getBackgroundStyle()}
          {...dragHandleProps}
        >
          <CardContent className="p-6 pb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-neutral-500 line-clamp-2">{idea.title}</h3>
              <Badge 
                variant="secondary" 
                className={`bg-tag-${tagColor} text-white hover:bg-tag-${tagColor}/80`}
              >
                {idea.tag}
              </Badge>
            </div>
            <p className="text-neutral-400 line-clamp-3 mb-4">{idea.content}</p>
            <div className="text-xs text-neutral-300 flex items-center justify-between mt-2">
              <span>{formatDate(idea.timestamp)}</span>
              <button 
                className="text-neutral-300 hover:text-primary transition"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

IdeaCard.displayName = "IdeaCard";

export default IdeaCard;
