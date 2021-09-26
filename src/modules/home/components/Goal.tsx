import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { hexToRGB } from "helpers/index";
import withObservables from '@nozbe/with-observables';

const bgColor = hexToRGB(0xff5470);

const GoalDashboard = ({ goals }) => {
    const [completed, setCompleted] = useState(0);

    useEffect(() => {
        const calculateCompletion = async () => {
            const totalGoals = goals.reduce((prev, goal) => prev + goal.amount, 0);
            const totalAccounts = await goals.reduce(async (prev, goal) => {
                const account = await goal.account;
                const prevVal = await prev;

                return prevVal + (account.total > goal.amount ? goal.amount : account.total);
            }, Promise.resolve(0));

            const c = (totalAccounts / totalGoals) * 100;
            setCompleted(c);
        }

        calculateCompletion();
    }, [goals]);


    return (
        <View style={{
            flex: 1,
            backgroundColor: `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, 0.6)`,
            borderRadius: 10,
            borderColor: '#000',
            borderWidth: 2,
            padding: 8,
            marginLeft: 8,
        }}>
            <Text style={{ fontSize: 21, fontFamily: "Poppins-Bold" }}>{completed.toFixed(2)}%</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}>Goals Completed</Text>
        </View>
    );
}

const enhance = withObservables(['goals'], (props) => ({
    goals: props.goals.query()
}));

const EnhancedGoalDashboard = enhance(GoalDashboard);
export default EnhancedGoalDashboard;