import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from "./src/navigations";
import theme from "theme/index";
import { ThemeProvider } from "react-native-elements";
import { GoalContext } from "context/GoalContext";
import { getNetworth, getAccountsGraph } from "services/account";
import { getTotalCompletion } from 'services/goal';
import { getNetworthGraph } from 'services/networth';

const App = () => {
    const [totalCompletion, setTotalCompletion] = useState(0);
    const [totalNetworth, setTotalNetworth] = useState(0);
    const [accountGraphSeries, setAccountGraphSeries] = useState([]);
    const [accountGraphColors, setAccountGraphColors] = useState([]);
    const [networthGraph, setNetworthGraph] = useState([]);

    const updateDashboard = async () => {
        // get total accounts networth
        const networth = await getNetworth();
        setTotalNetworth(networth);
        // get total goal completion
        const goalCompletion = await getTotalCompletion();
        setTotalCompletion(goalCompletion || 0);
        // accounts graph
        const [series, colors] = await getAccountsGraph();
        setAccountGraphSeries(series);
        setAccountGraphColors(colors);
        // networth graph
        const nwGraph = await getNetworthGraph();
        setNetworthGraph(nwGraph);
    }

    useEffect(() => {
        (async() => {
            await updateDashboard();
        })();
    }, []);

    return (
        <SafeAreaProvider>
            <ThemeProvider theme={theme}>
                <GoalContext.Provider value={{
                    totalNetworth,
                    totalCompletion,
                    accountGraphSeries,
                    accountGraphColors,
                    networthGraph,
                    updateDashboard
                }}>
                    <Navigation />
                </GoalContext.Provider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
};

export default App;
