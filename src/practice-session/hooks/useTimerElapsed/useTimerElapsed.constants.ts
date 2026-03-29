export const DEFAULT_TIMER_GRACE_PERIOD_MS = 1000;
export const DEFAULT_TIMER_UPDATE_INTERVAL_MS = 1000;

export type TimerId = ReturnType<typeof setInterval>;
export type TimeoutId = ReturnType<typeof setTimeout>;
