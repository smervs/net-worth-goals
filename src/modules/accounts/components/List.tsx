import React from 'react';
import { Alert } from "react-native";
import { Button, ListItem, Icon } from "react-native-elements";
import database from "../../../database";

export default function List({ accounts, refresh, edit }) {
    const deleteAccount = async (account) => {
        await database.write(async () => {
            account.destroyPermanently();
            refresh();
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

    return accounts.map(account => (
        <ListItem.Swipeable
            leftContent={
                <Button
                    title="Edit"
                    icon={<Icon name="edit" type="feather" color="white" containerStyle={{ marginRight: 8 }} />}
                    buttonStyle={{ minHeight: '100%' }}
                    onPress={() => edit(account)}
                />
            }
            rightContent={
                <Button
                    title="Delete"
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: '#ff5470' }}
                    onPress={() => deleteHandler(account)}
                />
            }
            key={account.id} bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{account.name}</ListItem.Title>
                <ListItem.Subtitle>{account.total}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem.Swipeable>
    ));
};