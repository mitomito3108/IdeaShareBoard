import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { formatDate, getTagColor } from "@/lib/constants";
import { Idea } from "@/lib/types";

interface IdeaDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idea: Idea | null;
  onEdit: () => void;
  onDelete: () => void;
}

export default function IdeaDetail({
  open,
  onOpenChange,
  idea,
  onEdit,
  onDelete,
}: IdeaDetailProps) {
  if (!idea) return null;

  const tagColor = getTagColor(idea.tag);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <DialogTitle className="text-xl font-semibold text-neutral-500 mr-3">
              {idea.title}
            </DialogTitle>
            <Badge 
              variant="secondary" 
              className={`bg-tag-${tagColor} text-white hover:bg-tag-${tagColor}/80`}
            >
              {idea.tag}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-neutral-400 whitespace-pre-line">{idea.content}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-neutral-300 pt-2 border-t border-neutral-200">
          <span>{formatDate(idea.timestamp)}</span>
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="text-primary hover:text-primary/80 flex items-center"
            >
              <Edit className="h-4 w-4 mr-1" />
              編集
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-destructive hover:text-destructive/80 flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              削除
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
