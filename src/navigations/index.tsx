import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Text } from "react-native-elements";

import HomeScreen from "modules/home";
import AccountScreen from "modules/accounts";
import GoalScreen from "modules/goals";
import NetworthScreen from "modules/networth";
import HistoryScreen from "modules/history";
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const options = (label: string, icon: string = 'home', iconType: string = 'feather') => {
    return {
        tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            focused ? <View style={{ backgroundColor: 'rgba(156, 163, 175, 0.4)', padding: 8, borderRadius: 30 }}>
                <Icon name={icon} type={iconType} color={color} />
            </View> :
                <Icon name={icon} type={iconType} color="#9CA3AF" />
        ),
        tabBarLabel: ({ focused }: { focused: boolean }) => {
            if (focused) {
                return <Text style={{ color: '#00214d' }}>{label}</Text>;
            }
        }
    }
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: '#ff5470',
                    tabBarInactiveTintColor: '#ff5470',
                    headerShown: false,
                    tabBarStyle: {
                        height: 70,
                        // padding: 10,
                        // marginHorizontal: 10,
                        // borderRadius: 40,
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                        // elevation: 4,
                        // marginBottom: 10
                    }
                })}>
                <Tab.Screen name="Home" component={HomeScreen} options={options('Home', 'home')}/>
                <Tab.Screen name="Accounts" component={AccountScreen} options={options('Accounts', 'clipboard')}/>
                <Tab.Screen name="Goals" component={GoalScreen} options={options('Goals', 'gift')}/>
                <Tab.Screen name="Net Worth" component={NetworthScreen} options={options('Net Worth', 'trending-up')}/>
                {/* <Tab.Screen name="History" component={HistoryScreen} options={options('History', 'clock')}/> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
}