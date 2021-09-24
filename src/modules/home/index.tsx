import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Screen } from "modules/common/components";
import { Card } from "react-native-elements";
import { VictoryPie, VictoryLabel, VictoryChart, VictoryLine } from "victory-native";
import database from "database/index";
import Account from 'models/Account';
import Networth from 'models/Networth';
import dayjs from "dayjs";

const accountsCollection = database.get('accounts');
const networthsCollection = database.get('networths');

export default function HomeScreen() {
    const [series, setSeries] = useState([]);
    const [networths, setNetworths] = useState([]);
    const [colors, setColors] = useState([]);

    const getAccounts = async () => {
        const accounts = await accountsCollection.query().fetch();
        const total = accounts.reduce((prev, account: Account) => prev + account.total, 0);
        const data = accounts.map((account: Account) => ({
            y: account.total, x: `${(account.total / total) * 100}%`, label: `${account.name} ${((account.total / total) * 100).toFixed(2)}%`
        }));
        const colorData = accounts.map((account: Account) => account.color);

        setSeries(data);
        setColors(colorData);
    }

    const getNetworths = async () => {
        const networths = await networthsCollection.query().fetch();
        const data = networths.map((net: Networth) => ({ x: dayjs(net.date).format('YYYY-MM-DD'), y: net.amount }));
        setNetworths(data);
    }

    useEffect(() => {
        getAccounts();
        getNetworths();
    }, []);

    return (
        <Screen>
            <ScrollView>
                <View style={{ marginBottom: 80 }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, marginTop: 20 }}>
                        <View style={{ flex: 1, backgroundColor: '#00ebc7',
                            borderRadius: 10,
                            borderColor: '#000',
                            borderWidth: 2,
                            marginRight: 6,
                            padding: 8
                        }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>$ 100,000</Text>
                            <Text>Current Net Worth</Text>
                        </View>
                        <View style={{
                            flex: 1, backgroundColor: '#ff5470',
                            borderRadius: 10,
                            borderColor: '#000',
                            borderWidth: 2,
                            padding: 8,
                            marginLeft: 8,
                        }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>85%</Text>
                            <Text>Goals Completed</Text>
                        </View>
                    </View>
                    <Card containerStyle={styles.cardContainer}>
                        <Text>Accounts</Text>
                        <View style={{ alignItems: 'center', padding: 10 }}>
                            <VictoryPie
                                data={series}
                                width={250}
                                height={250}
                                innerRadius={40}
                                colorScale={colors}
                                style={{
                                    labels: {
                                        fill: '#000', fontSize: 12, padding: 10
                                    },
                                }}
                                labelComponent={
                                    <VictoryLabel
                                        text={({ datum }) => datum.label.split(' ')}
                                        style={[
                                            { fill: "red", fontWeight: 'bold' },
                                            { fill: "green" }
                                        ]}
                                    />
                                }
                            />
                        </View>
                    </Card>
                    <Card containerStyle={styles.cardContainer}>
                        <Text>Net Worth</Text>
                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <VictoryChart>
                                <VictoryLine
                                    interpolation="natural"
                                    data={networths}
                                />
                            </VictoryChart>
                        </View>
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