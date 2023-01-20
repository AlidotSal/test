import { createSignal, createContext, useContext } from "solid-js";
import { createAnimated } from "../utils/hooks";
import type { Accessor, Setter, JSXElement } from "solid-js";

const StoreContext = createContext();

export const StoreProvider = (props: { children: JSXElement }) => {
    const [amount, setAmount] = createSignal(0);
    const [earned, setEarned] = createSignal("", { equals: false });

    const storeValue = {
        amount,
        setAmount,
        earned,
        setEarned,
    };

    return <StoreContext.Provider value={storeValue}>{props.children}</StoreContext.Provider>;
};

interface UseStore {
    amount: Accessor<number>;
    setAmount: Setter<number>;
    earned: Accessor<string>;
    setEarned: Setter<string>;
}

export const useStore = () => useContext(StoreContext) as UseStore;
