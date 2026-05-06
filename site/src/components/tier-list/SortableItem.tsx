import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MinecraftElement } from "@/lib/data";

interface SortableItemProps {
  item: MinecraftElement;
}

export function SortableItem({ item }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, data: item });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
    scale: isDragging ? 1.05 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`minecraft-item relative group touch-none ${isDragging ? 'shadow-2xl ring-2 ring-white/50' : ''}`}
      title={item.name}
    >
      <span className="text-white text-sm md:text-base font-bold leading-tight break-words drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] line-clamp-3">
        {item.name}
      </span>
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white/50 bg-black/40 px-1 rounded-sm pointer-events-none">
        {item.category.slice(0, 3)}
      </div>
    </div>
  );
}
