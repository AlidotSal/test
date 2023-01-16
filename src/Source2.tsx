import { createEffect, createMemo, createSignal } from "solid-js";
import { createAnimated } from "./utils/hooks";
import { animateTo } from "./utils/animation";
import "./source.css";

function Digit(props: { value: string; speed: number; parent: HTMLElement }) {
    const opacity = getComputedStyle(props.parent).getPropertyValue("opacity");

    return (
        <div class="digits">
            <div class={`num-${props.value} speed-${props.speed + 1} ${opacity === "0" ? "delay" : ""}`}>
                0123456789
            </div>
        </div>
    );
}

export default function Source(props: { earned: number }) {
    const [amount, setAmount] = createSignal(0);
    const length = createMemo(() => (Math.log(props.earned) * Math.LOG10E + 1) | 0);
    const sourceLength = createMemo(() => (Math.log10((amount() ^ (amount() >> 31)) - (amount() >> 31)) | 0) + 1);
    const numbers = () => {
        const nums: string[] = [];
        for (let i = 0; i < length(); i++) {
            nums.push(props.earned.toString()[i]);
        }
        return nums;
    };
    const total = () => {
        const nums: string[] = [];
        for (let i = 0; i < sourceLength(); i++) {
            nums.push(amount().toString()[i]);
        }
        return nums;
    };
    let sourceEl!: HTMLDivElement;
    let earnedEl!: HTMLDivElement;
    let totalEl!: HTMLDivElement;
    const SOURCE_VISIBLE_TIME = 4000;
    const EARNED_VISIBLE_TIME = 1800;

    createEffect(() => {
        props.earned;
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
                offset: [0, 0.25, 0.75, 1],
            },
            { duration: EARNED_VISIBLE_TIME, delay: opacity === "0" ? SOURCE_VISIBLE_TIME * 0.05 : 0 },
        );
        setTimeout(() => setAmount((p) => p + props.earned), EARNED_VISIBLE_TIME);
    });

    return (
        <main>
            <section ref={sourceEl} class="source">
                <div ref={earnedEl} class="earned">
                    <span>+</span>
                    {numbers().map((n, i) => (
                        <Digit value={n} speed={i} parent={sourceEl} />
                    ))}
                </div>
                {/* <p>{amount()}</p> */}
                <div ref={totalEl} class="total">
                    <span>***</span>
                    {total().map((n, i) => (
                        <Digit value={n} speed={i} parent={sourceEl} />
                    ))}
                </div>
            </section>
        </main>
    );
}
