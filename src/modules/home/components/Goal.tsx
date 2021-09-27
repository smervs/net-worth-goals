import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { hexToRGB } from "helpers/index";
import { GoalContext } from "context/GoalContext";

const bgColor = hexToRGB('0xff5470');

const GoalDashboard: React.FC = () => {
    const { totalCompletion } = useContext(GoalContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{totalCompletion.toFixed(2)}%</Text>
            <Text style={styles.subtitle}>Goals Completed</Text>
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
        marginLeft: 8,
    },
    title: {
        fontSize: 21,
        fontFamily: 'Poppins-Bold'
    },
    subtitle: {
        fontFamily: 'Poppins-Regular'
    }
});

export default GoalDashboard;
