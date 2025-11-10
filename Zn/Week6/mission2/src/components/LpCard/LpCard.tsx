import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react"; // ✅ 아이콘 import
import type { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/lp/${lp.id}`)}
      className="relative rounded-lg overflow-hidden shadow-md cursor-pointer group"
    >
      {/* ✅ 이미지 */}
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-56 transform transition-transform duration-500 group-hover:scale-110"
      />

      {/* ✅ Hover 오버레이 */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        {/* 제목 */}
        <h3 className="text-white text-sm font-semibold truncate">
          {lp.title}
        </h3>

        {/* 메타 정보 */}
        <div className="flex justify-between items-center text-xs text-gray-300 mt-1">
          <span>{new Date(lp.createdAt).toLocaleDateString()}</span>

          {/* ✅ 흰색 하트 아이콘 + 개수 */}
          <div className="flex items-center gap-1">
            <Heart size={14} color="white" fill="white" /> {/* 흰색 하트 */}
            <span>{lp.likes?.length ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
