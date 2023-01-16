export function animateTo(
    element: HTMLElement,
    to: Keyframe[] | PropertyIndexedKeyframes,
    options: KeyframeAnimationOptions,
) {
    const anim = element.animate(to, { ...options, fill: "both" });
    anim.addEventListener("finish", () => {
        anim.commitStyles();
        anim.cancel();
    });
    return anim;
}

export function animateFrom(element: HTMLElement, from: PropertyIndexedKeyframes, options: KeyframeAnimationOptions) {
    return element.animate({ ...from, offset: 0 }, { ...options, fill: "backwards" });
}

export function animationInterval(ms: number, signal: AbortSignal, callback: (time: number) => void) {
    const start = document.timeline.currentTime ?? 0;

    function frame(time: number) {
        if (signal.aborted) return;
        callback(time);
        scheduleFrame(time);
    }

    function scheduleFrame(time: number) {
        const elapsed = time - start;
        const roundedElapsed = Math.round(elapsed / ms) * ms;
        const targetNext = start + roundedElapsed + ms;
        const delay = targetNext - performance.now();
        setTimeout(() => requestAnimationFrame(frame), delay);
    }

    scheduleFrame(start);
}

export function setIntervalX(callback: () => void, delay: number, repetitions: number) {
    var x = 0;
    var intervalID = window.setInterval(function () {
        callback();

        if (++x === repetitions) {
            window.clearInterval(intervalID);
        }
    }, delay);
}
export function animationIntervalX(callback: () => void, ms: number, repetitions: number) {
    const start = document.timeline.currentTime ?? 0;
    let rep = 0;

    function frame(time: number) {
        if (rep++ === repetitions) return;
        callback();
        scheduleFrame(time);
    }

    function scheduleFrame(time: number) {
        const elapsed = time - start;
        const roundedElapsed = Math.round(elapsed / ms) * ms;
        const targetNext = start + roundedElapsed + ms;
        const delay = targetNext - performance.now();
        setTimeout(() => requestAnimationFrame(frame), delay);
    }

    scheduleFrame(start);
}
