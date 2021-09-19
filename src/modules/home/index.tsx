import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Screen } from "../common/components";
import { Card } from "react-native-elements";

export default function HomeScreen() {
    return (
        <Screen>
            <View style={{ }}>
                <Card>
                    <Text>Accounts</Text>
                </Card>
                <Card>
                    <Text>Net Worth</Text>
                </Card>
            </View>
        </Screen>
    );
}