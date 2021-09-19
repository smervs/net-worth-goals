import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Accounts" component={HomeScreen} />
                <Tab.Screen name="Goals" component={SettingsScreen} />
                <Tab.Screen name="Net Worth" component={SettingsScreen} />
                <Tab.Screen name="History" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}