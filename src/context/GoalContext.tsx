import { createContext } from "react";

type Goal = {
    totalNetworth: number;
    totalCompletion: number;
    updateTotalCompletion: () => void
}

export const GoalContext = createContext<Goal>(null);