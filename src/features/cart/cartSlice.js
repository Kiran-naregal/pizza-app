import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
        },
        removeItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        addIngredient: {
            prepare(pizzaId, ingredient, price) {
                return {
                    payload: { pizzaId, ingredient, price }
                }
            },
            reducer(state, action) {
                const item = state.cart.find(item => item.pizzaId === action.payload.pizzaId);
                item.addIngredients.push(action.payload.ingredient);
                item.unitPrice += action.payload.price;
                item.totalPrice = item.quantity * item.unitPrice;
            }
        },
        removeIngredient: {
            prepare(pizzaId, ingredient, price) {
                return {
                    payload: { pizzaId, ingredient, price }
                }
            },
            reducer(state, action) {
                const item = state.cart.find(item => item.pizzaId === action.payload.pizzaId);
                item.addIngredients = item.addIngredients.filter(ingredient => ingredient !== action.payload.ingredient);
                item.unitPrice -= action.payload.price;
                item.totalPrice = item.quantity * item.unitPrice;
            }
        },
        removeDefaultIngredient: {
            prepare(pizzaId, ingredient) {
                return {
                    payload: { pizzaId, ingredient }
                }
            },
            reducer(state, action) {
                const item = state.cart.find(item => item.pizzaId === action.payload.pizzaId);
                item.removeIngredients.push(action.payload.ingredient);
            }
        },
        addDefaultIngredient: {
            prepare(pizzaId, ingredient) {
                return {
                    payload: { pizzaId, ingredient }
                }
            },
            reducer(state, action) {
                const item = state.cart.find(item => item.pizzaId === action.payload.pizzaId);
                item.removeIngredients = item.removeIngredients.filter(ingredient => ingredient !== action.payload.ingredient);
            }
        },
        increaseQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if (item.quantity === 0) cartSlice.caseReducers.removeItem(state, action);
        },
        clearCart(state) {
            state.cart = [];
        },
    }
})

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart, addIngredient, removeIngredient, removeDefaultIngredient, addDefaultIngredient } = cartSlice.actions;

export default cartSlice.reducer;

// this functions impact performance use 'reselect' library to optimice
// the selector should always start with get
export const getTotalCartQuantity = (state) =>
    state.cart.cart?.reduce((acc, item) => (acc += item.quantity), 0);

export const getTotalCartAmount = (state) =>
    state.cart.cart?.reduce((acc, item) => (acc += item.totalPrice), 0);

export const getItemById = (id) => (state) =>
    state.cart.cart?.find(item => item.pizzaId === id) ?? null;

