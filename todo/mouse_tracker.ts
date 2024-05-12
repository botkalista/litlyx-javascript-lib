
function throttle(fn: (...args: any[]) => any, delayMs: number) {
    let lastExecuted = 0;
    return function (...args: any[]) {
        const now = new Date().getTime();
        if (now - lastExecuted < delayMs) return;
        fn(...args);
        lastExecuted = now;
    }
}

export class MouseTracker {

    private running: boolean = false;
    private throttledMouseMove: (e: MouseEvent) => any;

    private points: [number, number][] = [];
    private website: string = "NONE";
    private page: string = "NONE";

    constructor() {
        this.throttledMouseMove = throttle((e: MouseEvent) => this.onMouseMove(e), 50);
    }

    private onMouseMove(e: MouseEvent) {
        this.points.push([e.pageX, e.pageY]);
    }

    get state() { return this.running; }

    start(website: string, page: string) {
        this.website = website;
        this.page = page;
        document.addEventListener('mousemove', this.throttledMouseMove);
    }

    stop() {
        this.points.length = 0;
        document.removeEventListener('mousemove', this.throttledMouseMove);
    }

    flush() { }

    debug() {
        console.log(this.points);
    }

}

