import { Component, createSignal } from "solid-js";
import Source from "./Source";

const App: Component = () => {
    const [m, setM] = createSignal(0);

    return (
        <>
            <div class="box"><Source /></div>
            <section class="bar">
                <div />
            </section>
        </>
    );
};

export default App;
