import React, { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const savedStore = localStorage.getItem("starwars_store");
    const initialState = savedStore ? JSON.parse(savedStore) : initialStore();

    const [store, dispatch] = useReducer(storeReducer, initialState);

    useEffect(() => {
        localStorage.setItem("starwars_store", JSON.stringify(store));
    }, [store]);

    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

const useGlobalReducer = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useGlobalReducer debe usarse dentro de un StoreProvider");
    }
    return context;
};

export default useGlobalReducer;