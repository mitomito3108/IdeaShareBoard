import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { TAGS } from "@/lib/constants";
import { TagType } from "@/lib/types";

interface HeaderProps {
  onSearch: (value: string) => void;
  onTagFilter: (value: "all" | TagType) => void;
  onAddIdea: () => void;
  searchTerm: string;
  selectedTag: "all" | TagType;
}

export default function Header({
  onSearch,
  onTagFilter,
  onAddIdea,
  searchTerm,
  selectedTag,
}: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-primary">アイデアボード</h1>
          <span className="ml-2 text-neutral-300">コンセプト共有ツール</span>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-300 h-4 w-4" />
            <Input
              type="text"
              placeholder="キーワード検索"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border-neutral-200 w-full focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="relative w-full sm:w-auto">
            <Select
              value={selectedTag}
              onValueChange={(value) => onTagFilter(value as "all" | TagType)}
            >
              <SelectTrigger className="border-neutral-200 w-full focus:ring-primary focus:border-transparent">
                <SelectValue placeholder="すべてのタグ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのタグ</SelectItem>
                {TAGS.map((tag) => (
                  <SelectItem key={tag.label} value={tag.label}>
                    {tag.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={onAddIdea} 
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" />
            新規作成
          </Button>
        </div>
      </div>
    </header>
  );
}
