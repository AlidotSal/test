// @ts-nocheck
import { useStore } from "../../store";
import './style.css';

export default function DebugUI() {
    const { amount, addAmount, setEarned } = useStore();

    return (
        <section class="debug">
            <label>set total value:<input type="number" onChange={e => addAmount(parseInt(e.target.value) - amount())}></input></label>
            <label>add or remove value(with +/-):<input type="text" placeholder="example: +200" onChange={e => setEarned(e.target.value)}></input></label>
            <button onClick={() => setEarned(`-${Math.floor(0.1 * amount())}`)}>death</button>
        </section>
    );
}