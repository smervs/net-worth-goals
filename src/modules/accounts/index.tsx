import * as React from 'react';
import { Text, View } from 'react-native';
import { Screen } from "../common/components";
import { FAB, Icon } from "react-native-elements";

export default function AccountScreen() {
    return (
        <Screen>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Account!</Text>
            </View>
            <FAB
                title={<Icon type="font-awesome-5" name="plus" size={18} color="#fff" />}
                placement="right"
                color="#00ebc7" />
        </Screen>
    );
}