import React from 'react';
import { View } from 'react-native';

export default function Screen({ children }: { children: React.ReactNode }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#f2f4f6' }}>
            {children}
        </View>
    );
}