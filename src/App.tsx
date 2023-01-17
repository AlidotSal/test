import { Component } from "solid-js";
import { StoreProvider } from "./store";
import Source from "./Source";

const App: Component = () => {

    return (
        <StoreProvider>
            <div class="box"><Source /></div>
        </StoreProvider>
    );
};

export default App;
