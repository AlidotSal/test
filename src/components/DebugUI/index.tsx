// @ts-nocheck
import { useStore } from "../../store";
import "./style.css";

export default function DebugUI() {
    const { amount, setAmount } = useStore();

    return (
        <section class="debug">
            <label>
                set total value:
                <input
                    type="number"
                    min={0}
                    oninput="validity.valid||(value='');"
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                ></input>
            </label>
            <label>
                add or remove value(with +/-):
                <input
                    type="text"
                    placeholder="example: +200"
                    onChange={(e) =>
                        setAmount((p) => (p + parseInt(e.target.value) >= 0 ? p + parseInt(e.target.value) : 0))
                    }
                ></input>
            </label>
            <button onClick={() => setAmount((p) => p - Math.floor(0.1 * amount()))}>death</button>
        </section>
    );
}
