import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IdeaCard from "./IdeaCard";
import IdeaDetail from "./IdeaDetail";
import IdeaForm from "./IdeaForm";
import DeleteConfirmation from "./DeleteConfirmation";
import { Idea, FormData } from "@/lib/types";
import { Search } from "lucide-react";

// Sortable Item Wrapper Component
function SortableItem({ idea, onClick }: { idea: Idea; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: idea.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <IdeaCard 
        idea={idea} 
        onClick={onClick} 
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

interface IdeaGridProps {
  ideas: Idea[];
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
  onUpdate: (id: number, formData: FormData) => boolean;
  onDelete: (id: number) => boolean;
}

export default function IdeaGrid({ ideas, onReorder, onUpdate, onDelete }: IdeaGridProps) {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Set up sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }
    
    // Find the indices for reordering
    const activeIndex = ideas.findIndex(idea => idea.id === active.id);
    const overIndex = ideas.findIndex(idea => idea.id === over.id);
    
    onReorder(activeIndex, overIndex);
  };

  // Open detail view
  const handleCardClick = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsDetailOpen(true);
  };

  // Edit idea
  const handleEdit = () => {
    setIsDetailOpen(false);
    setIsFormOpen(true);
  };

  // Open delete confirmation
  const handleDeleteClick = () => {
    setIsDetailOpen(false);
    setIsDeleteOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (selectedIdea) {
      onDelete(selectedIdea.id);
      setIsDeleteOpen(false);
      setSelectedIdea(null);
    }
  };

  // Update idea
  const handleUpdateIdea = (formData: FormData) => {
    if (selectedIdea) {
      return onUpdate(selectedIdea.id, formData);
    }
    return false;
  };

  // Show empty search result state
  if (ideas.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="col-span-full text-center py-16"
      >
        <div className="flex justify-center mb-3">
          <Search className="h-16 w-16 text-neutral-200" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-400">検索結果がありません</h3>
        <p className="text-neutral-300 mt-2">検索条件を変更するか、新しいアイデアを追加してください。</p>
      </motion.div>
    );
  }

  return (
    <>
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SortableContext 
            items={ideas.map(idea => idea.id)} 
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence>
              {ideas.map((idea) => (
                <SortableItem 
                  key={idea.id} 
                  idea={idea} 
                  onClick={() => handleCardClick(idea)} 
                />
              ))}
            </AnimatePresence>
          </SortableContext>
        </div>
      </DndContext>

      {/* Detail modal */}
      <IdeaDetail
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        idea={selectedIdea}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Edit modal */}
      <IdeaForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleUpdateIdea}
        idea={selectedIdea}
        isEditing={true}
      />

      {/* Delete confirmation */}
      <DeleteConfirmation
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
