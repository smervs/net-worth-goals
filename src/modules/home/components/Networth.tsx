import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { hexToRGB, numberWithCommas } from "helpers/index";
import { GoalContext } from "context/GoalContext";

const bgColor = hexToRGB(0x00ebc7);

const NetworthDashboard: React.FC = () => {
    const { totalNetworth } = useContext(GoalContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>$ {numberWithCommas(totalNetworth)}</Text>
            <Text style={styles.subtitle}>Current Net Worth</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, 0.6)`,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 2,
        padding: 8,
        marginRight: 8
    },
    title: {
        fontSize: 21,
        fontFamily: 'Poppins-Bold'
    },
    subtitle: {
        fontFamily: 'Poppins-Regular'
    }
});

export default NetworthDashboard;