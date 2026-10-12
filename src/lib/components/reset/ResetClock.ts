import { createContext } from 'svelte';

export interface ResetClock {
	now: number;
	reloading: boolean;
}

export const [getResetClock, setResetClock] = createContext<ResetClock>();