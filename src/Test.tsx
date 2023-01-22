import "./test.css";
export default () => {
    let ref!: HTMLDivElement;
    function handleClick() {
        const digitsEl = ref.firstChild as HTMLDivElement;
        const counterAnim = digitsEl.getAnimations()[0];
        counterAnim.pause();
        counterAnim.playbackRate = 0.5;
        counterAnim.play();
        setTimeout(() => {
            counterAnim.pause();
        }, 600);
    }
    return (
        <div class="test">
            <div class="earned">
                <div ref={ref} class="number">
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
                <button onClick={handleClick}>click</button>
            </div>
        </div>
    );
};
