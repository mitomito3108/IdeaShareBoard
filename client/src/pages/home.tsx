import { useState } from "react";
import Header from "@/components/Header";
import EmptyState from "@/components/EmptyState";
import IdeaGrid from "@/components/IdeaGrid";
import IdeaForm from "@/components/IdeaForm";
import { useIdeas } from "@/hooks/useIdeas";
import { TagType } from "@/lib/types";

export default function Home() {
  const {
    ideas,
    filteredIdeas,
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    addIdea,
    updateIdea,
    deleteIdea,
    reorderIdeas,
  } = useIdeas();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddIdea = () => {
    setIsFormOpen(true);
  };

  const handleReorder = (sourceIndex: number, destinationIndex: number) => {
    reorderIdeas(sourceIndex, destinationIndex);
  };

  return (
    <>
      <Header
        onSearch={setSearchTerm}
        onTagFilter={(tag) => setSelectedTag(tag)}
        onAddIdea={handleAddIdea}
        searchTerm={searchTerm}
        selectedTag={selectedTag}
      />

      <main className="flex-grow container mx-auto px-4 py-6">
        {ideas.length === 0 ? (
          <EmptyState onAddIdea={handleAddIdea} />
        ) : (
          <IdeaGrid
            ideas={filteredIdeas}
            onReorder={handleReorder}
            onUpdate={updateIdea}
            onDelete={deleteIdea}
          />
        )}
      </main>

      {/* Create new idea form */}
      <IdeaForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={addIdea}
        isEditing={false}
      />
    </>
  );
}
