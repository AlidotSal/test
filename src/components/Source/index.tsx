import { createEffect, Show } from "solid-js";
import { animateTo } from "../../utils/animation";
import { useStore } from "../../store";
import Total from "../Total";
import DebugUI from "../DebugUI";
import "./style.css";

function Digit(props: { value: string; iteration: number; parent: HTMLElement }) {
    const opacity = getComputedStyle(props.parent).getPropertyValue("opacity");

    return (
        <>
            <Show when={props.value !== "-" && props.value !== "+"} fallback={<span>{props.value}</span>}>
                <div class="number">
                    <div
                        class={`digits num-${props.value} iteration-${props.iteration} ${
                            opacity === "0" ? "delay" : ""
                        }`}
                    >
                        <div>0</div>
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>7</div>
                        <div>8</div>
                        <div>9</div>
                        <div>0</div>
                    </div>
                </div>
            </Show>
        </>
    );
}

export default function Source() {
    const { amount, addAmount, earned } = useStore();
    let isMounted = false;
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
        amount();
        const opacity = getComputedStyle(sourceEl).getPropertyValue("opacity");
        animateTo(sourceEl, { opacity: [1, 1, 1, 0], offset: [0, 0.05, 0.95, 1] }, { duration: SOURCE_VISIBLE_TIME });
    });

    createEffect(() => {
        const earnedValue = earned();
        if (isMounted) {
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
        } else {
            isMounted = true;
        }
    });

    return (
        <>
            <section ref={sourceEl} class="source">
                <div ref={earnedEl} class="earned">
                    {numbers().map((n, i) => (
                        <Digit value={n} iteration={i - 1} parent={sourceEl} />
                    ))}
                </div>
                <Total />
            </section>
            <DebugUI />
        </>
    );
}
