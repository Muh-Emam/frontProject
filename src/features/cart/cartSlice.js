import { createSlice } from "@reduxjs/toolkit";

const getFromLocalStorage = () => {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
};

const saveCartToLocalStorage = cart => {
  localStorage.setItem('cart', JSON.stringify(cart));
};


const cartSlice = createSlice({
    name: "cart",
    initialState: getFromLocalStorage(),
    reducers: {
        addToCart: (state, action) => {
            const item = state.find(item => item.id == action.payload.id)
            if(item) {
                item.quantity += 1
            }
            else {
                state.push({
                    ...action.payload,
                    quantity:1
                })
            }
            saveCartToLocalStorage(state)
        },

        removeFromCart: (state, action) => {
            const newArray = state.filter(item => item.id != action.payload)
            saveCartToLocalStorage(state)
            return newArray;
        },

        updateCart: (state, action) => {
            const {id, quantity} = action.payload
            const item = state.find(item => item.id == id)
            if(item && quantity >= 1) {
                item.quantity = Number(action.payload.quantity) 
                saveCartToLocalStorage(state)
            }
        },
        clearCart: (state, action) => {
            localStorage.removeItem("cart")
            return []
        }
    }  
})

export const { addToCart, removeFromCart, updateCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;