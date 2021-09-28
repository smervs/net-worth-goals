import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from "./src/navigations";
import theme from "theme/index";
import { ThemeProvider } from "react-native-elements";
import { GoalContext } from "context/GoalContext";
import { getNetworth } from "services/account";
import { getTotalCompletion } from 'services/goal';

const App = () => {
    const [totalCompletion, setTotalCompletion] = useState(0);
    const [totalNetworth, setTotalNetworth] = useState(0);

    const updateDashboard = async () => {
        // get total accounts networth
        const networth = await getNetworth();
        setTotalNetworth(networth);
        // get total goal completion
        const goalCompletion = await getTotalCompletion();
        setTotalCompletion(goalCompletion || 0);
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
                    updateDashboard
                }}>
                    <Navigation />
                </GoalContext.Provider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
};

export default App;
