import { createSignal, createContext, useContext, createEffect } from "solid-js";
import type { Accessor, Setter, JSXElement } from "solid-js";

const StoreContext = createContext();

export const StoreProvider = (props: { children: JSXElement }) => {
    const [amount, setAmount] = createSignal(0);
    const [earned, setEarned] = createSignal(0, { equals: false });
    let prevAmount = 0;

    createEffect(() => {
        const diff = amount() - prevAmount;
        setEarned(diff);
        prevAmount = amount();
    });

    const storeValue = {
        amount,
        setAmount,
        earned,
    };

    return <StoreContext.Provider value={storeValue}>{props.children}</StoreContext.Provider>;
};

interface UseStore {
    amount: Accessor<number>;
    setAmount: Setter<number>;
    earned: Accessor<number>;
}

export const useStore = () => useContext(StoreContext) as UseStore;
