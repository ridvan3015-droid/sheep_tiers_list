import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, verticalListSortingStrategy, rectSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { MinecraftElement } from "@/lib/data";

interface TierRowProps {
  id: string;
  label: string;
  colorClass: string;
  items: MinecraftElement[];
}

export function TierRow({ id, label, colorClass, items }: TierRowProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: { type: "Tier" }
  });

  return (
    <div className="flex flex-col md:flex-row border-b-4 border-minecraft-border-dark bg-black/40 min-h-[120px]">
      <div 
        className={`w-full md:w-28 md:min-h-[120px] flex items-center justify-center border-r-4 border-minecraft-border-dark p-4 ${colorClass} shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] shrink-0`}
      >
        <span className="text-4xl md:text-5xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {label}
        </span>
      </div>
      
      <div 
        ref={setNodeRef}
        className={`flex-1 p-3 flex flex-wrap gap-2 items-center transition-colors min-h-[100px] ${
          isOver ? "bg-white/5" : ""
        }`}
      >
        <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} item={item} />
          ))}
          {items.length === 0 && (
            <div className="w-full text-center text-gray-600 text-lg select-none">
              Glissez des elements ici
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}
