import { useRef, useLayoutEffect, MutableRefObject } from "react";
import { Positions, TargetProps } from "../shared/types/others";

const isBrowser = typeof window !== `undefined`;

function getScrollPosition({ element, useWindow }: TargetProps) {
    if (!isBrowser) return { x: 0, y: 0 };

    const target = element && element.current ? element.current : document.body;
    const position = target.getBoundingClientRect();

    return useWindow ? { x: window.scrollX, y: window.scrollY } : { x: position.left, y: position.top };
}

export function useScrollPosition(
    effect: (positions: Positions) => void,
    deps: string[] | number[] | boolean[],
    element: MutableRefObject<HTMLElement | null> | null | undefined,
    useWindow: boolean,
    wait: number | null
) {
    const position = useRef(getScrollPosition({ useWindow }));

    let throttleTimeout: number | null = null;

    const callBack = () => {
        const currPos = getScrollPosition({ element, useWindow });
        effect({ prevPos: position.current, currPos });
        position.current = currPos;
        throttleTimeout = null;
    };

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callBack, wait);
                }
            } else {
                callBack();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, deps);
}
