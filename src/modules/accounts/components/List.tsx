import React from 'react';
import { Icon, ListItem } from "react-native-elements";

export default function List({ accounts }) {
    return accounts.map(account => (
        <ListItem key={account.id} bottomDivider >
            <ListItem.Content>
                <ListItem.Title>{account.name}</ListItem.Title>
                <ListItem.Subtitle>{account.total}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem >
    ));
};