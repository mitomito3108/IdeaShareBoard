import { useState, useEffect, useMemo } from "react";
import { Idea, TagType, FormData, BackgroundType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

// Custom hook to initialize localStorage
export function useLocalStorage() {
  useEffect(() => {
    // Check if ideas exist in localStorage
    if (!localStorage.getItem("ideas")) {
      // Initialize ideas array if it doesn't exist
      localStorage.setItem("ideas", JSON.stringify([]));
    }
  }, []);
}

// Main ideas hook
export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<"all" | TagType>("all");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load ideas from localStorage
  useEffect(() => {
    const loadIdeas = () => {
      try {
        const savedIdeas = localStorage.getItem("ideas");
        if (savedIdeas) {
          setIdeas(JSON.parse(savedIdeas));
        }
      } catch (error) {
        console.error("Failed to load ideas from localStorage:", error);
        toast({
          title: "エラー",
          description: "アイデアの読み込みに失敗しました",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadIdeas();
  }, [toast]);

  // Save ideas to localStorage whenever ideas change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("ideas", JSON.stringify(ideas));
      } catch (error) {
        console.error("Failed to save ideas to localStorage:", error);
        toast({
          title: "エラー",
          description: "アイデアの保存に失敗しました",
          variant: "destructive",
        });
      }
    }
  }, [ideas, isLoading, toast]);

  // Filtered ideas based on search and tag filter
  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      const matchesSearch =
        searchTerm === "" ||
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = selectedTag === "all" || idea.tag === selectedTag;
      
      return matchesSearch && matchesTag;
    });
  }, [ideas, searchTerm, selectedTag]);

  // Add new idea
  const addIdea = (formData: FormData) => {
    try {
      const timestamp = Date.now();
      const newIdea: Idea = {
        id: timestamp,
        timestamp,
        updatedAt: timestamp,
        ...formData,
      };

      setIdeas((prevIdeas) => [newIdea, ...prevIdeas]);

      toast({
        title: "成功",
        description: "新しいアイデアが追加されました",
      });

      return true;
    } catch (error) {
      console.error("Failed to add idea:", error);
      toast({
        title: "エラー",
        description: "アイデアの追加に失敗しました",
        variant: "destructive",
      });
      return false;
    }
  };

  // Update existing idea
  const updateIdea = (id: number, formData: FormData) => {
    try {
      setIdeas((prevIdeas) =>
        prevIdeas.map((idea) =>
          idea.id === id
            ? {
                ...idea,
                ...formData,
                updatedAt: Date.now(),
              }
            : idea
        )
      );

      toast({
        title: "成功",
        description: "アイデアが更新されました",
      });

      return true;
    } catch (error) {
      console.error("Failed to update idea:", error);
      toast({
        title: "エラー",
        description: "アイデアの更新に失敗しました",
        variant: "destructive",
      });
      return false;
    }
  };

  // Delete idea
  const deleteIdea = (id: number) => {
    try {
      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));

      toast({
        title: "成功",
        description: "アイデアが削除されました",
      });

      return true;
    } catch (error) {
      console.error("Failed to delete idea:", error);
      toast({
        title: "エラー",
        description: "アイデアの削除に失敗しました",
        variant: "destructive",
      });
      return false;
    }
  };

  // Reorder ideas (for drag and drop)
  const reorderIdeas = (sourceIndex: number, destinationIndex: number) => {
    try {
      setIdeas((prevIdeas) => {
        const result = Array.from(prevIdeas);
        const [removed] = result.splice(sourceIndex, 1);
        result.splice(destinationIndex, 0, removed);
        return result;
      });
      return true;
    } catch (error) {
      console.error("Failed to reorder ideas:", error);
      toast({
        title: "エラー",
        description: "アイデアの並び替えに失敗しました",
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Get idea by ID
  const getIdeaById = (id: number) => {
    return ideas.find((idea) => idea.id === id);
  };

  return {
    ideas,
    filteredIdeas,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    addIdea,
    updateIdea,
    deleteIdea,
    reorderIdeas,
    getIdeaById,
  };
}
