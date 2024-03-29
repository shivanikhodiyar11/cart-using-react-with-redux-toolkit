import React from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../featuers/cart/cartSlice';
import { closeModal } from '../featuers/modal/modalSlice';

const Modal = () => {
    const disaptch = useDispatch();
    return (
        <aside className='modal-container'>
            <div className='modal'>
                <h4>Remove all items from your shopping cart?</h4>
                <div className='btn-container'>
                    <button type='button' className='btn confirm-btn' onClick={() => {
                        disaptch(clearCart())
                        disaptch(closeModal())
                    }}>
                        confirm
                    </button>
                    <button type='button' className='btn clear-btn' onClick={() => disaptch(closeModal())}>
                        cancel
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default Modal