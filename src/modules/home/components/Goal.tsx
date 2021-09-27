import React, { useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { hexToRGB } from "helpers/index";
import { GoalContext } from "context/GoalContext";

const bgColor = hexToRGB(0xff5470);

const GoalDashboard = () => {
    const { totalCompletion } = useContext(GoalContext);

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
            <Text style={{ fontSize: 21, fontFamily: "Poppins-Bold" }}>{totalCompletion.toFixed(2)}%</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}>Goals Completed</Text>
        </View>
    );
}

export default GoalDashboard;