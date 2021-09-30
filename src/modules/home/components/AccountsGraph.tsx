import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import withObservables from '@nozbe/with-observables';
import Account from "models/Account";

const AccountsGraph = ({ accounts }) => {
    const [series, setSeries] = useState([]);
    const [colors, setColors] = useState([]);

    const getAccounts = async () => {
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
    }, [accounts]);

    return (
        <View style={{ alignItems: 'center', padding: 2 }}>
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
    );
}

const enhance = withObservables(['accounts'], (props) => ({
    accounts: props.accounts.query()
}));

const EnhancedAccountsGraph = enhance(AccountsGraph);
export default EnhancedAccountsGraph;