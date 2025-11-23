// src/components/Modals/PlusLpModal.tsx
import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { LuX } from "react-icons/lu";
import usePostLp from "../../hooks/mutations/usePostLp";

interface PlusLpModalProps {
  onClose: () => void;
}

const PlusLpModal = ({ onClose }: PlusLpModalProps) => {
  // 폼 데이터
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);

  // 파일 & 미리보기
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  // 태그
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const { mutate, isPending } = usePostLp();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const newUrl = URL.createObjectURL(file);
    setImagePreview(newUrl);
  };

  // cleanup 에서 revoke 제거 (썸네일 깨짐 방지)
  useEffect(() => {
    return () => {
      // if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imagePreview.trim() || !name.trim()) {
      alert("앨범 커버와 LP 이름은 필수입니다.");
      return;
    }

    const newPost = {
      title: name,
      content,
      thumbnail: imagePreview, // 현재는 blob URL 사용
      tags,
      published,
    };

    mutate(newPost, {
      onSuccess: () => {
        // 🔸 LP 목록 새로고침은 usePostLp 의 onSuccess 가 담당
        onClose(); // 모달만 닫기
      },
    });
  };

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const handleAddTag = () => {
    const trimmed = currentTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setCurrentTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const isSubmitDisabled =
    isPending || !imagePreview.trim() || !name.trim();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
    >
      <div
        onClick={handleClose}
        className="relative flex flex-col w-full max-w-md overflow-hidden bg-gray-800 rounded-lg shadow-xl"
      >
        <button
          className="absolute top-4 right-4 z-10 text-gray-400 transition-colors cursor-pointer hover:text-gray-300"
          aria-label="모달 닫기"
          onClick={onClose}
        >
          <LuX size={24} />
        </button>

        {/* 이미지 업로드 */}
        <div className="w-full h-80 bg-gray-800">
          <label
            htmlFor="pic"
            className="flex items-center justify-center w-full h-80 transition-colors bg-gray-700 cursor-pointer hover:bg-gray-600"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="미리보기"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">+ 앨범 커버 추가</span>
            )}
          </label>
          <input
            type="file"
            id="pic"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* 폼 */}
        <div>
          <form
            id="lp-form"
            onSubmit={handleSubmit}
            className="p-6 space-y-4 overflow-y-auto"
          >
            <input
              type="text"
              id="name"
              placeholder="LP Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              id="content"
              placeholder="LP Content"
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="tag"
                placeholder="LP Tag"
                value={currentTag}
                onChange={handleTagInput}
                className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 font-bold bg-pink-400 disabled:bg-gray-400 rounded-md transition-colors hover:bg-pink-600"
                disabled={currentTag.trim() === ""}
              >
                Add
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-gray-700">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-white border border-gray-600 bg-gray-700 rounded-md"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 cursor-pointer text-gray-400 transition-colors rounded-full hover:text-white"
                      aria-label={`태그 ${tag} 삭제`}
                    >
                      <LuX size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </form>

          <div className="p-6">
            <button
              type="submit"
              form="lp-form"
              className="w-full py-3 bg-pink-400 font-bold rounded-md cursor-pointer transition-colors hover:bg-pink-600 disabled:opacity-50"
              disabled={isSubmitDisabled}
            >
              {isPending ? "등록 중..." : "Add Lp"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlusLpModal;
