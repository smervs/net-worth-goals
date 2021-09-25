import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import theme from "theme/index";

export default function CancelButton(props) {
    return (
        <Button
            {...props}
            containerStyle={styles.container}
            buttonStyle={styles.button}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.red
    },
    container: {
        marginTop: 30,
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#000',
    }
});