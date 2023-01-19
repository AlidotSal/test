import { createEffect, Show } from "solid-js";
import { animateTo } from "../../utils/animation";
import { useStore } from "../../store";
import iconChart from '../../assets/images/chart_bar.svg';
import "./style.css";

export default function Total() {
    const { amount } = useStore();

    return (
        <p class="total"><img src={iconChart} />{amount()}</p>
    );
}
