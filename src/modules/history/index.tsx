import * as React from 'react';
import { Text, View } from 'react-native';
import { Screen } from "../common/components";

export default function HistoryScreen() {
    return (
        <Screen>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>History!</Text>
            </View>
        </Screen>
    );
}