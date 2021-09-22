import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
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
            <View style={{ marginBottom: 15 }}>
                <Card>
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
                <Card>
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