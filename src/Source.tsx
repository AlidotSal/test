import { createSignal, createEffect, Show } from "solid-js";
import type { Setter } from "solid-js";
import { createAnimated } from "./utils/hooks";
import { animateTo } from "./utils/animation";
import iconChart from './assets/images/chart_bar.svg';
import "./source.css";

function Digit(props: { value: string; speed: number; parent: HTMLElement }) {
    const opacity = getComputedStyle(props.parent).getPropertyValue("opacity");

    return (
        <>
            <Show when={props.value !== '-' && props.value !== '+'} fallback={<span>{props.value}</span>}>
                <div class="digits">
                    <div class={`num-${props.value} speed-${props.speed + 1} ${opacity === "0" ? "delay" : ""}`}>
                        0123456789
                    </div>
                </div>
            </Show>
        </>
    );
}

function DebugUI(props: { amount: number; setInput: Setter<number>; setEarned: Setter<string> }) {

    return (
        <section class="debug">
            <input type="text" onChange={e => props.setInput(parseInt(e.target.value))}></input>
            <button onClick={() => props.setEarned("+200")}>add</button>
            <button onClick={() => props.setEarned(`-${Math.floor(0.1 * props.amount)}`)}>death</button>
        </section>
    );
}

export default function Source() {
    const [amount, addAmount, setAmount] = createAnimated(0);
    const [earned, setEarned] = createSignal("+100", { equals: false });
    const [input, setInput] = createSignal(0);
    const numbers = () => {
        const nums: string[] = [];
        for (let i = 0; i < earned().length; i++) {
            nums.push(earned()[i]);
        }
        return nums;
    };
    let sourceEl!: HTMLDivElement;
    let earnedEl!: HTMLDivElement;
    const SOURCE_VISIBLE_TIME = 4000;
    const EARNED_VISIBLE_TIME = 2000;

    createEffect(() => {
        const opacity = getComputedStyle(sourceEl).getPropertyValue("opacity");
        setAmount(input());
        animateTo(
            sourceEl,
            { opacity: [opacity === "0" ? 0 : 1, 1, 1, 0], offset: [0, 0.05, 0.95, 1] },
            { duration: SOURCE_VISIBLE_TIME },
        );
    })

    createEffect(() => {
        const earnedValue = earned();
        const opacity = getComputedStyle(sourceEl).getPropertyValue("opacity");
        animateTo(
            sourceEl,
            { opacity: [opacity === "0" ? 0 : 1, 1, 1, 0], offset: [0, 0.05, 0.95, 1] },
            { duration: SOURCE_VISIBLE_TIME },
        );
        animateTo(
            earnedEl,
            {
                opacity: [0, 1, 1, 0],
                transform: ["translateY(-100%)", "translateY(0)", "translateY(0)", "translateY(100%)"],
                offset: [0, 0.25, 0.8, 1],
            },
            { duration: EARNED_VISIBLE_TIME, delay: opacity === "0" ? SOURCE_VISIBLE_TIME * 0.05 : 0 },
        );
        setTimeout(
            () => addAmount(parseInt(earnedValue)),
            opacity === "0" ? SOURCE_VISIBLE_TIME * 0.05 + 0.75 * EARNED_VISIBLE_TIME : 0.8 * EARNED_VISIBLE_TIME,
        );
    });

    return (
        <>
            <section ref={sourceEl} class="source">
                <div ref={earnedEl} class="earned">
                    {numbers().map((n, i) => <Digit value={n} speed={i} parent={sourceEl} />)}
                </div>
                <p class="total"><img src={iconChart} />{amount()}</p>
            </section>
            <DebugUI amount={amount()} setInput={setInput} setEarned={setEarned} />
        </>
    );
}
