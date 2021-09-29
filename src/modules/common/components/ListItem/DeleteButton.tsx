import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

export default function DeleteButton({ onPress }) {
    return (
        <View style={{
            marginRight: 15, marginLeft: -6, marginVertical: 6, borderRadius: 10,
            borderWidth: 2,
            borderColor: '#000',
            borderBottomColor: '#000',
            borderBottomWidth: 2
        }}>
            <Button
                title="Delete"
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: '#ff5470', borderRadius: 8 }}
                onPress={onPress}
            />
        </View>
    );
}