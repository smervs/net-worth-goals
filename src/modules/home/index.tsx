import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Screen } from "modules/common/components";
import { Card } from "react-native-elements";
import database from "database/index";
import EnhancedNetworthDashboard from "modules/home/components/Networth";
import EnhancedGoalDashboard from "modules/home/components/Goal";
import EnhancedAccountsGraph from "modules/home/components/AccountsGraph";
import EnhancedNetworthGraph from "modules/home/components/NetworthGraph";

const accountsCollection = database.get('accounts');
const networthsCollection = database.get('networths');

export default function HomeScreen() {
    return (
        <Screen>
            <ScrollView>
                <View style={{ marginBottom: 80 }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, marginTop: 20 }}>
                        <EnhancedNetworthDashboard />
                        <EnhancedGoalDashboard />
                    </View>
                    <Card containerStyle={styles.cardContainer}>
                        <Text>Accounts</Text>
                        <EnhancedAccountsGraph accounts={accountsCollection} />
                    </Card>
                    <Card containerStyle={styles.cardContainer}>
                        <Text>Net Worth</Text>
                        <EnhancedNetworthGraph networths={networthsCollection} />
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
    }
});