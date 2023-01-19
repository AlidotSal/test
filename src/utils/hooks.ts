import { createSignal } from "solid-js";
import type { Accessor, Setter } from "solid-js";
import { animationIntervalX } from "./animation";

export function createAnimated(initialValue: number): [Accessor<number>, (added: number) => void, Setter<number>] {
    const [value, setValue] = createSignal(initialValue);
    const steps = 24;
    const delay = Math.floor(500 / steps);
    const addValue = (added: number) => {
        animationIntervalX(
            () => {
                setValue((p) => p + added / steps);
            },
            delay,
            steps,
        );
    };
    return [() => Math.round(value()), addValue, setValue];
}
