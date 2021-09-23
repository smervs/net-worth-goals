import React from 'react';
import { Alert, View } from "react-native";
import { Button, ListItem, Icon } from "react-native-elements";
import database from "database/index";
import EnhancedListItem from "modules/accounts/components/ListItem";
import withObservables from '@nozbe/with-observables';

const List = ({ accounts, onEdit }) => {
    const deleteAccount = async (account) => {
        await database.write(async () => {
            account.destroyPermanently();
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

    return accounts && accounts.map(account => (
        <EnhancedListItem account={account} key={account.id} onEdit={onEdit} onDelete={deleteHandler} />
    ));
};

const enhance = withObservables(['accounts'], (props) => ({
    accounts: props.accounts.query()
}));

const EnhancedList = enhance(List);
export default EnhancedList;
