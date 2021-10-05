import React, { useContext } from "react";
import { View } from "react-native";
import { VictoryChart, VictoryLine } from "victory-native";
import { GoalContext } from "context/GoalContext";

const NetworthGraph = () => {
    const { networthGraph } = useContext(GoalContext);

    return (
        <View style={{ alignItems: 'center', padding: 20 }}>
            <VictoryChart>
                <VictoryLine
                    interpolation="natural"
                    data={networthGraph}
                />
            </VictoryChart>
        </View>
    );
}

export default NetworthGraph;