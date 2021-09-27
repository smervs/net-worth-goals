import React, { useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { hexToRGB, numberWithCommas } from "helpers/index";
import { GoalContext } from "context/GoalContext";

const bgColor = hexToRGB(0x00ebc7);

const NetworthDashboard = () => {
    const { totalNetworth } = useContext(GoalContext);

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
            <Text style={{ fontSize: 21, fontFamily: "Poppins-Bold" }}>$ {numberWithCommas(totalNetworth)}</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}>Current Net Worth</Text>
        </View>
    );
}

export default NetworthDashboard;