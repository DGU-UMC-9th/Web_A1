// src/components/FloatingButton.tsx
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/pageeeee")} // ✅ 존재하지 않는 경로
      className="
        fixed bottom-6 right-6
        bg-pink-500 hover:bg-pink-600 
        text-white 
        rounded-full 
        shadow-lg 
        w-14 h-14 
        flex items-center justify-center 
        transition-all duration-300
      "
    >
      <Plus size={28} />
    </button>
  );
}
