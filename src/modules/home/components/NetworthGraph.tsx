import React, { useContext } from "react";
import { View } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel, VictoryAxis, VictoryScatter, VictoryArea } from "victory-native";
import { GoalContext } from "context/GoalContext";
import theme from "theme/index";

const NetworthGraph = () => {
    const { networthGraph } = useContext(GoalContext);

    return (
        <View>
            <VictoryChart theme={VictoryTheme.material} width={350}>
                <VictoryAxis dependentAxis tickLabelComponent={(
                    <VictoryLabel
                        verticalAnchor="middle"
                        textAnchor="start"
                        x={0}
                    />
                )}/>
                <VictoryAxis tickLabelComponent={<VictoryLabel angle={-45} />} />
                <VictoryLine
                    interpolation="natural"
                    data={networthGraph}
                    style={{
                        data: { stroke: '#D1D5DB' }
                    }}
                />
                <VictoryScatter
                    style={{ data: { fill: theme.colors.red } }}
                    size={4}
                    data={networthGraph}
                />
            </VictoryChart>
        </View>
    );
}

export default NetworthGraph;