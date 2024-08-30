import type { ReactiveController, ReactiveElement } from 'lit';
/**
 * A controller that repeatedly calls the specified callback with the provided interval time.
 * The timer is automatically paused while the user is interacting with the component.
 */
export declare class AutoplayController implements ReactiveController {
    private host;
    private timerId;
    private tickCallback;
    private activeInteractions;
    paused: boolean;
    stopped: boolean;
    constructor(host: ReactiveElement, tickCallback: () => void);
    hostConnected(): void;
    hostDisconnected(): void;
    start(interval: number): void;
    stop(): void;
    pause: () => void;
    resume: () => void;
}
