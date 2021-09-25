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
import TabBar from "modules/common/components/TabBar";

const Tab = createBottomTabNavigator();

const options = (label: string, icon: string = 'home', iconType: string = 'feather') => {
    return {
        tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
            focused ? <View style={{ padding: 12, borderRadius: 30 }}>
                <Icon name={icon} type={iconType} />
            </View> :
                <Icon name={icon} type={iconType} />
        )
    }
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBar={props => <TabBar {...props} />}
                screenOptions={({ route }) => ({
                    headerStyle: {
                        borderBottomWidth: 2,
                        borderBottomColor: '#000'
                    }
                })}>
                <Tab.Screen name="🏠 Home" component={HomeScreen} options={options('Home', 'home')}/>
                <Tab.Screen name="📚 Accounts" component={AccountScreen} options={options('Accounts', 'clipboard')}/>
                <Tab.Screen name="🏆 Goals" component={GoalScreen} options={options('Goals', 'gift')}/>
                <Tab.Screen name="📊 Net Worth" component={NetworthScreen} options={options('Net Worth', 'trending-up')}/>
                {/* <Tab.Screen name="History" component={HistoryScreen} options={options('History', 'clock')}/> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
}