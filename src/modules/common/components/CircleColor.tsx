import React from "react";
import { View } from "react-native";

export default function CircleColor({ color }) {
    return (
        <View style={{
            height: 40,
            width: 40,
            backgroundColor: color,
            borderRadius: 20
        }}></View>
    );
}