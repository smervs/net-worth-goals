import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export default function CancelButton(props) {
    return (
        <Button
            {...props}
            titleStyle={styles.title}
            containerStyle={styles.container}
            type="outline"
        />
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#000'
    },
    container: {
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#000'
    }
});