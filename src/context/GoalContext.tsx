import { createContext } from "react";

type Goal = {
    totalNetworth: number;
    totalCompletion: number;
    updateDashboard: () => void
}

export const GoalContext = createContext<Goal>(null);