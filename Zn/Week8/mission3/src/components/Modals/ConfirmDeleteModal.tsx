import type { FC } from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title = "정말 탈퇴하시겠습니까?",
  message = "탈퇴하면 모든 정보가 영구적으로 삭제됩니다.",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 rounded-lg w-[320px] p-6 text-center shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
        <p className="text-sm text-gray-300 mb-6">{message}</p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 cursor-pointer"
          >
            예
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-md bg-gray-600 text-white text-sm font-semibold hover:bg-gray-500 cursor-pointer"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
