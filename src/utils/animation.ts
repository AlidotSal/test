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
