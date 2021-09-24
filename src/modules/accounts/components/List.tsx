import React from 'react';
import { Alert, View } from "react-native";
import { Button, Icon, Text, Card } from "react-native-elements";
import database from "database/index";
import EnhancedListItem from "modules/accounts/components/ListItem";
import withObservables from '@nozbe/with-observables';
import { sync as syncNetworth } from "services/networth";

const List = ({ accounts, onEdit }) => {
    const sum = accounts.reduce((prev, acc) => prev + acc.total, 0);
    const deleteAccount = async (account) => {
        await database.write(async () => {
            account.destroyPermanently();
            syncNetworth();
        });
    };

    const deleteHandler = (account) => {
        Alert.alert(
            'Confirmation',
            `Are you sure you want to delete ${account.name} account?`,
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        deleteAccount(account);
                    },
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    return (
        <View style={{ marginBottom: 10}}>
            <Card containerStyle={{
                padding: 0,
                borderWidth: 2,
                borderColor: '#000',
                borderRadius: 10,
                marginBottom: 6,
            }}>
                <Card containerStyle={{
                    margin: 3,
                    marginBottom: 3,
                    borderWidth: 2,
                    borderColor: '#000',
                    backgroundColor: '#00ebc7',
                    borderRadius: 10
                }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="package" type="feather" style={{ }} size={40}/>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 15 }}>Total</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{sum}</Text>
                    </View>
                </View>
            </Card>
            </Card>
            {accounts && accounts.map(account => (
                <EnhancedListItem account={account} key={account.id} onEdit={onEdit} onDelete={deleteHandler} percentage={(account.total / sum) * 100}/>
            ))}
        </View>
    );
};

const enhance = withObservables(['accounts'], (props) => ({
    accounts: props.accounts.query()
}));

const EnhancedList = enhance(List);
export default EnhancedList;
