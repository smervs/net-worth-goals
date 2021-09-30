import Networth from "models/Networth";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { VictoryChart, VictoryLine } from "victory-native";
import dayjs from "dayjs";
import withObservables from '@nozbe/with-observables';

const NetworthGraph = ({ networths }) => {
    const [networthData, setNetworthData] = useState([]);

    const getNetworths = async () => {
        const data = networths.map((net: Networth) => (
            { x: dayjs(net.date).format('YYYY-MM-DD'), y: net.amount }
        ));
        setNetworthData(data);
    }

    useEffect(() => {
        getNetworths();
    }, [networths]);

    return (
        <View style={{ alignItems: 'center', padding: 20 }}>
            <VictoryChart>
                <VictoryLine
                    interpolation="natural"
                    data={networthData}
                />
            </VictoryChart>
        </View>
    );
}

const enhance = withObservables(['networths'], (props) => ({
    networths: props.networths.query()
}));

const EnhancedNetworthGraph = enhance(NetworthGraph);
export default EnhancedNetworthGraph;