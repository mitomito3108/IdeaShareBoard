import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { TAGS, BACKGROUNDS, PATTERN_URLS, DEFAULT_IDEA_FORM_DATA } from "@/lib/constants";
import { FormData, Idea, BackgroundType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface IdeaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: FormData) => boolean;
  idea?: Idea;
  isEditing: boolean;
}

export default function IdeaForm({ open, onOpenChange, onSubmit, idea, isEditing }: IdeaFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    tag: "" as any, // Will be updated in useEffect
    ...DEFAULT_IDEA_FORM_DATA,
  });
  
  const { toast } = useToast();

  // Load idea data when editing
  useEffect(() => {
    if (isEditing && idea) {
      setFormData({
        title: idea.title,
        content: idea.content,
        tag: idea.tag,
        background: idea.background,
      });
    } else {
      // Reset form for new idea
      setFormData({
        title: "",
        content: "",
        tag: "" as any,
        background: "white",
      });
    }
  }, [isEditing, idea, open]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectBackground = (background: BackgroundType) => {
    setFormData((prev) => ({ ...prev, background }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.title.trim()) {
      toast({
        title: "エラー",
        description: "タイトルを入力してください",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.content.trim()) {
      toast({
        title: "エラー",
        description: "内容を入力してください",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.tag) {
      toast({
        title: "エラー",
        description: "タグを選択してください",
        variant: "destructive",
      });
      return;
    }
    
    const success = onSubmit(formData);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-neutral-500">
            {isEditing ? "アイデアを編集" : "新しいアイデアを追加"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="idea-title" className="text-sm font-medium text-neutral-400">タイトル</Label>
            <Input
              id="idea-title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="アイデアのタイトルを入力"
              className="w-full border-neutral-200 focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="idea-content" className="text-sm font-medium text-neutral-400">内容</Label>
            <Textarea
              id="idea-content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="アイデアの詳細を説明してください"
              className="w-full min-h-[120px] border-neutral-200 focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="idea-tag" className="text-sm font-medium text-neutral-400">タグ</Label>
            <Select
              value={formData.tag}
              onValueChange={(value) => handleChange("tag", value)}
            >
              <SelectTrigger className="w-full border-neutral-200 focus:ring-primary">
                <SelectValue placeholder="タグを選択してください" />
              </SelectTrigger>
              <SelectContent>
                {TAGS.map((tag) => (
                  <SelectItem key={tag.label} value={tag.label}>
                    {tag.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-neutral-400">背景スタイル</Label>
            <div className="flex flex-wrap gap-2">
              {BACKGROUNDS.map((bg) => {
                let style: React.CSSProperties = {};
                
                if (bg.value === "white") {
                  style = { backgroundColor: "white" };
                } else if (bg.value.startsWith("#")) {
                  style = { backgroundColor: bg.value };
                } else if (bg.value === "pattern1" || bg.value === "pattern2") {
                  const patternUrl = PATTERN_URLS[bg.value];
                  style = {
                    backgroundImage: `url('${patternUrl}')`,
                    backgroundSize: "cover",
                    opacity: 0.5,
                  };
                }
                
                return (
                  <Card
                    key={bg.value}
                    style={style}
                    className={`w-12 h-12 rounded-md cursor-pointer overflow-hidden ${
                      formData.background === bg.value
                        ? "border-2 border-primary"
                        : "border-2 border-neutral-200 hover:border-primary"
                    }`}
                    onClick={() => handleSelectBackground(bg.value)}
                  />
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              キャンセル
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              保存
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
