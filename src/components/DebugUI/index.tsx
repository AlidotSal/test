// @ts-nocheck
import { useStore } from "../../store";
import './style.css';

export default function DebugUI() {
    const { amount, setAmount, setEarned, setInput } = useStore();

    return (
        <section class="debug">
            <label>set total value:<input type="number" onChange={e => setAmount(parseInt(e.target.value))}></input></label>
            <label>add or remove value:<input type="text" onChange={e => setEarned(e.target.value)}></input></label>
            <button onClick={() => setEarned(`-${Math.floor(0.1 * amount())}`)}>death</button>
        </section>
    );
}