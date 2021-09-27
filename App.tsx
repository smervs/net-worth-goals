import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from "./src/navigations";
import theme from "theme/index";
import { ThemeProvider } from "react-native-elements";
import { GoalContext } from "context/GoalContext";
import database from "database/index";
import Goal from 'models/Goal';

const goalsCollection = database.get('goals');

const App = () => {
    const [totalCompletion, setTotalCompletion] = useState(0);
    const [totalNetworth, setTotalNetworth] = useState(0);

    const updateTotalCompletion = async () => {
        const goals = await goalsCollection.query().fetch();
        const totalGoals = goals.reduce((prev, goal: Goal) => prev + goal.amount, 0);
        const totalAccounts = await goals.reduce(async (prev, goal: Goal) => {
            const account = await goal.account;
            const prevVal = await prev;

            return prevVal + (account.total > goal.amount ? goal.amount : account.total);
        }, Promise.resolve(0));

        const c = (totalAccounts / totalGoals) * 100;
        setTotalCompletion(c || 0);
    }

    useEffect(() => {
        (async() => {
            await updateTotalCompletion();
        })();
    }, []);

    return (
        <SafeAreaProvider>
            <ThemeProvider theme={theme}>
                <GoalContext.Provider value={{
                    totalNetworth,
                    totalCompletion,
                    updateTotalCompletion
                }}>
                    <Navigation />
                </GoalContext.Provider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
};

export default App;
