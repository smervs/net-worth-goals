import * as React from 'react';
import { Text, View } from 'react-native';
import { Screen } from "../common/components";

export default function NetworthScreen() {
    return (
        <Screen>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Net Worth!</Text>
            </View>
        </Screen>
    );
}