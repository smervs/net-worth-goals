import { createContext } from "react";

type Goal = {
    totalNetworth: number;
    totalCompletion: number;
    accountGraphSeries: Array<Object>,
    accountGraphColors: Array<string>,
    networthGraph: Array<Object>,
    updateDashboard: () => void
}

export const GoalContext = createContext<Goal>(null);