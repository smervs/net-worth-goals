import React from "react";
import { View } from "react-native";
import { Button, Icon } from "react-native-elements";

export default function EditButton({ onPress }) {
    return (
        <View style={{
            marginLeft: 15, marginRight: -6, marginVertical: 6, borderRadius: 10,
            borderWidth: 2,
            borderColor: '#000',
            borderBottomColor: '#000',
            borderBottomWidth: 2
        }}>
            <Button
                title="Edit"
                icon={<Icon name="edit" type="feather" color="white" containerStyle={{ marginRight: 8 }} />}
                buttonStyle={{ minHeight: '100%', backgroundColor: '#3B82F6', borderRadius: 8 }}
                onPress={onPress}
            />
        </View>
    );
}