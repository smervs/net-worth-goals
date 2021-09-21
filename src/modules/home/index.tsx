import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Screen } from "../common/components";
import { Card } from "react-native-elements";
import { VictoryPie, VictoryLabel, VictoryChart, VictoryLine } from "victory-native";
import database from "../../database";
import Account from '../../models/Account';

const accountsCollection = database.get('accounts');

export default function HomeScreen() {
    const [series, setSeries] = useState([]);
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

    useEffect(() => {
        getAccounts();
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
                                data={[
                                    { x: 1, y: 2 },
                                    { x: 2, y: 3 },
                                    { x: 3, y: 5 },
                                    { x: 4, y: 4 },
                                    { x: 5, y: 6 }
                                ]}
                            />
                        </VictoryChart>
                    </View>
                </Card>
            </View>
            </ScrollView>
        </Screen>
    );
}