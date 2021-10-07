import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Screen } from "modules/common/components";
import { Card } from "react-native-elements";
import EnhancedNetworthDashboard from "modules/home/components/Networth";
import EnhancedGoalDashboard from "modules/home/components/Goal";
import EnhancedAccountsGraph from "modules/home/components/AccountsGraph";
import EnhancedNetworthGraph from "modules/home/components/NetworthGraph";

export default function HomeScreen() {
    return (
        <Screen>
            <ScrollView>
                <View style={{ marginBottom: 80 }}>
                    <View style={styles.percentageContainer}>
                        <EnhancedNetworthDashboard />
                        <EnhancedGoalDashboard />
                    </View>
                    <Card containerStyle={styles.cardContainer}>
                        <Text style={styles.title}>ACCOUNTS</Text>
                        <EnhancedAccountsGraph />
                    </Card>
                    <Card containerStyle={styles.cardContainer}>
                        <Text style={styles.title}>NET WORTH</Text>
                        <EnhancedNetworthGraph />
                    </Card>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
        borderWidth: 2,
        borderColor: '#000',
        borderBottomWidth: 2
    },
    percentageContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20
    },
    title: {
        backgroundColor: '#D1D5DB',
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontWeight: 'bold',
        borderRadius: 20,
        textAlign: 'center'
    }
});