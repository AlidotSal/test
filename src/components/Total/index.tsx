import { createEffect, createRenderEffect, createSignal, For, Show } from "solid-js";
import { useStore } from "../../store";
import iconChart from '../../assets/images/chart_bar.svg';
import "./style.css";

export default function Total(props: { animate?: boolean }) {
    const { amount } = useStore();
    const [isDone, setDone] = createSignal(false);
    const [numbers, setNumbers] = createSignal<{ value: string; iteration: number; from: number }[]>();
    let prev = "0";
    createRenderEffect(() => {
        setDone(false)
        const amountStr = amount().toString();
        const total = amountStr.split("").map(n => ({ value: n, iteration: 0, from: 0 }));
        for (var i = 0; i < total.length; i++) {
            const difference = Number(amountStr.charAt(i)) - (Number(prev.charAt(i)) || 0);
            total[i]['iteration'] = (0.1 * difference + 0.01) + ((total[i - 1]?.iteration || 0) > 0.1 ? i : 0);
            total[i]['from'] = Number(prev.charAt(i));
        };
        setNumbers(total);
        setTimeout(() => setDone(true), 3800);
        prev = amount().toString();
    });

    return (
        <div class="total">
            <img src={iconChart} />
            <Show when={props.animate && !isDone()} fallback={<p>{amount()}</p>}>
                <div class="animated">
                    <For each={numbers()}>
                        {(num) => {
                            return (
                                <div class="number">
                                    <div class="digits" style={{ "animation-delay": `${num.from * 0.1 * (-0.5 / num.iteration)}s`, "animation-iteration-count": num.iteration, "animation-duration": `${0.5 / num.iteration}s` }}>
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
                            )
                        }}
                    </For>
                </div>
            </Show>
        </div>
    );
}
