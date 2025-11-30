import { useCartInfo } from "../hooks/useCartStore";
import { useDispatch, useSelector } from "../hooks/useCustomRedux"
import { useModalStore } from "../hooks/useModalStore";
import { clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
    const{total} = useCartInfo();
    const {openModal} = useModalStore();
    const handleInitializeCart = ()=>{
        openModal();
    }
  return (
    <div className='p-12 flex justify-between'>
      <div className="border p-4 rounded-md cursor-pointer">
        <button onClick={handleInitializeCart}>
            전체 삭제
        </button>
      </div>
      <div>총 가격 : {total}원</div>
    </div>
  )
}

export default PriceBox
