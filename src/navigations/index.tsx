import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "react-native-elements";

import HomeScreen from "../modules/home";
import AccountScreen from "../modules/accounts";
import GoalScreen from "../modules/goals";
import NetworthScreen from "../modules/networth";
import HistoryScreen from "../modules/history";

const Tab = createBottomTabNavigator();

const options = (icon: string = 'home', iconType: string = 'feather') => {
    return {
        tabBarIcon: ({ color }: { color: string }) => (
            <Icon name={icon} type={iconType} color={color} />
        )
    }
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: '#ff5470',
                    tabBarInactiveTintColor: '#00214d',
                })}>
                <Tab.Screen name="Home" component={HomeScreen} options={options('home')}/>
                <Tab.Screen name="Accounts" component={AccountScreen} options={options('clipboard')}/>
                <Tab.Screen name="Goals" component={GoalScreen} options={options('gift')}/>
                <Tab.Screen name="Net Worth" component={NetworthScreen} options={options('trending-up')}/>
                <Tab.Screen name="History" component={HistoryScreen} options={options('clock')}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}