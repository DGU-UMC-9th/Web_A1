import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";
import type { RootState } from "../store/store";
import { useCartActions, useCartInfo, useCartStore } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const Modal = () => {
  const {clearCart} = useCartActions();
  const {isOpen, closeModal} = useModalStore();
  //const { isOpen } = useSelector((state: RootState) => state.modal);

  if (!isOpen) return null;

  const handleCancel = () => {
    closeModal();
  };

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-xl font-semibold mb-4">전체 삭제하시겠습니까?</h2>

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            아니요
          </button>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
