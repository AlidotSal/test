import { createEffect, createRenderEffect, createSignal } from "solid-js";
import { useStore } from "../../store";
import iconChart from "../../assets/images/source.svg";
import "./style.css";

export default function Total(props: { delay?: number }) {
    const { amount } = useStore();
    const numbers = () => amount().toString().padStart(10, "0");
    const [move, setMove] = createSignal<{ transform: string; transition: string }>({ transform: "", transition: "" });
    let containerRef!: HTMLDivElement;
    let prev = "0000000000";
    let startingDigit = 9;
    let prevStarting = 9;

    createEffect(() => {
        const children = [...containerRef.childNodes] as HTMLDivElement[];
        let changedNumber = 9;
        children.forEach((el, i) => {
            const digitsEl = el.firstChild as HTMLDivElement;
            const counterAnim = digitsEl.getAnimations()[0];
            if (numbers()[i] !== prev[i]) changedNumber = Math.min(changedNumber, i);
            const difference = Number(numbers()[i]) - Number(prev[i]);
            //check if number should have cycles
            const cycles =
                i - changedNumber <= 0
                    ? 0
                    : (i - changedNumber) * (Number(numbers()[changedNumber]) - Number(prev[changedNumber]));
            //add 0.01 to step into the next number
            const rate = cycles + difference * 0.1 + 0.01;
            counterAnim.updatePlaybackRate(rate);
            //add 100x the duration(500) to make reverse animation run till the end
            counterAnim.currentTime = 50000 + 50 * (Number(prev[i]) === 0 ? 10 : Number(prev[i])) + 1;
            setTimeout(() => {
                counterAnim.play();
            }, props.delay ?? 0);
            setTimeout(() => {
                counterAnim.pause();
                counterAnim.currentTime = 50 * Number(numbers()[i]) + 1;
            }, (props.delay ?? 0) + 500);
        });
        prev = numbers();
    });

    createRenderEffect(() => {
        prevStarting = startingDigit;
        startingDigit = 9;
        for (let i = 0; i < numbers().length; i++) {
            if (numbers()[i] !== "0" && startingDigit > i) startingDigit = i;
        }
        if (startingDigit > prevStarting) {
            setMove({
                transform: `translateX(-${(startingDigit - prevStarting) / 1.68}em)`,
                transition: "transform 0.22s 2.5s",
            });
        } else {
            setMove({ transform: "translateX(0)", transition: "none" });
        }
    });

    return (
        <div class="total">
            <img src={iconChart} alt="" />
            <div
                ref={containerRef}
                class="animated"
                style={{ transform: move().transform, transition: move().transition }}
            >
                {numbers()
                    .split("")
                    .map((_, i) => (
                        <div
                            class="number"
                            classList={{
                                hide: i < startingDigit && i < prevStarting,
                                "fade-out": i < startingDigit && i >= prevStarting,
                            }}
                        >
                            <div class="digits">
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
                    ))}
            </div>
        </div>
    );
}
