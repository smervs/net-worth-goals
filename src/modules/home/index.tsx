import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Screen } from "../common/components";
import { Card } from "react-native-elements";
import { VictoryPie } from "victory-native";
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
            y: account.total, x: `${(account.total / total) * 100}%`, label: account.name
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
            <View style={{ }}>
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
                                    fill: '#000', fontSize: 12, padding: 10,
                                },
                            }}
                        />
                    </View>
                </Card>
                <Card>
                    <Text>Net Worth</Text>
                </Card>
            </View>
        </Screen>
    );
}