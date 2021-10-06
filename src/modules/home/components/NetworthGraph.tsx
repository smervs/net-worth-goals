import React, { useContext } from "react";
import { View } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel, VictoryAxis } from "victory-native";
import { GoalContext } from "context/GoalContext";

const NetworthGraph = () => {
    const { networthGraph } = useContext(GoalContext);

    return (
        <View style={{ alignItems: 'center' }}>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryAxis dependentAxis />
                <VictoryAxis tickLabelComponent={<VictoryLabel angle={-45} />} />
                <VictoryLine
                    interpolation="natural"
                    data={networthGraph}
                />
            </VictoryChart>
        </View>
    );
}

export default NetworthGraph;