import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { hexToRGB, numberWithCommas } from "helpers/index";
import withObservables from '@nozbe/with-observables';

const bgColor = hexToRGB(0x00ebc7);

const NetworthDashboard = ({ accounts }) => {
    const sum = accounts.reduce((prev, account) => prev + account.total, 0);

    return (
        <View style={{
            flex: 1,
            backgroundColor: `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, 0.6)`,
            borderRadius: 10,
            borderColor: '#000',
            borderWidth: 2,
            marginRight: 6,
            padding: 8
        }}>
            <Text style={{ fontSize: 21, fontFamily: "Poppins-Bold" }}>$ {numberWithCommas(sum)}</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}>Current Net Worth</Text>
        </View>
    );
}

const enhance = withObservables(['accounts'], (props) => ({
    accounts: props.accounts.query()
}));

const EnhancedNetworthDashboard = enhance(NetworthDashboard);
export default EnhancedNetworthDashboard;