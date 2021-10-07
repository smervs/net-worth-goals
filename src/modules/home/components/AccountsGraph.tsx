import React, { useContext } from "react";
import { View } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import { GoalContext } from "context/GoalContext";

const AccountsGraph = () => {
    const { accountGraphSeries, accountGraphColors } = useContext(GoalContext);

    return (
        <View style={{ alignItems: 'center', padding: 2 }}>
            <VictoryPie
                data={accountGraphSeries}
                width={250}
                height={250}
                innerRadius={40}
                colorScale={accountGraphColors}
                style={{
                    labels: {
                        fill: '#000', fontSize: 12, padding: 10
                    },
                }}
                labelComponent={
                    <VictoryLabel
                        text={({ datum }) => datum.label.split(' ')}
                        style={[
                            { fill: "#000", fontWeight: 'bold' },
                            { fill: "#6B7280" }
                        ]}
                    />
                }
            />
        </View>
    );
}

export default AccountsGraph;