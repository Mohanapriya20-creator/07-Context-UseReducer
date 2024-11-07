import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const ShoppingCartContext = createContext({
    items: [],
    onAddCartItemQuantity: () => { },
    onUpdateCartItemQuantity: () => { }
});

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            const updatedItems = [...state.items];

            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === action.id
            );
            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                // Update quantity if the item already exists
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                // Add new item to cart
                const product = DUMMY_PRODUCTS.find((product) => product.id === action.id);
                updatedItems.push({
                    id: action.id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }

            return { ...state, items: updatedItems };

        case 'UPDATE_ITEM_QUANTITY':
            const items = [...state.items];
            const itemIndex = items.findIndex((item) => item.id === action.id);
            const updatedItem = { ...items[itemIndex], quantity: items[itemIndex].quantity + action.amount };

            if (updatedItem.quantity <= 0) {
                items.splice(itemIndex, 1); // Remove item if quantity is 0
            } else {
                items[itemIndex] = updatedItem; // Update item quantity
            }

            return { ...state, items };

        default:
            return state;
    }
}

export default function ManageShoppingCart({ children }) {

    const [state, dispatch] = useReducer(reducer, {
        items: []
    });

    const [shoppingCart, setShoppingCart] = useState({
        items: [],
    });

    function handleAddItemToCart(id) {
        dispatch({ type: 'ADD_ITEM', id });
    }

    function handleUpdateCartItemQuantity(id, amount) {
        dispatch({ type: 'UPDATE_ITEM_QUANTITY', id, amount });
    }

    const currentShoppingCart = {
        items: state.items,
        onAddCartItemQuantity: handleAddItemToCart,
        onUpdateCartItemQuantity: handleUpdateCartItemQuantity,
    }

    return (
        <ShoppingCartContext.Provider value={currentShoppingCart}>
            {children}
        </ShoppingCartContext.Provider>
    )
}