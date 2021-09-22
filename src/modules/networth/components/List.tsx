import React from 'react';
import { Alert } from "react-native";
import { Button, ListItem, Icon } from "react-native-elements";
import database from "database/index";
import dayjs from "dayjs";

export default function List({ networths, refresh, edit }) {
    const deleteNetworth = async (networth) => {
        await database.write(async () => {
            networth.destroyPermanently();
            refresh();
        });
    };

    const deleteHandler = (networth) => {
        Alert.alert(
            'Confirmation',
            `Are you sure you want to delete ${networth.date}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        deleteNetworth(networth);
                    },
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    return networths.map(networth => (
        <ListItem.Swipeable
            leftContent={
                <Button
                    title="Edit"
                    icon={<Icon name="edit" type="feather" color="white" containerStyle={{ marginRight: 8 }} />}
                    buttonStyle={{ minHeight: '100%' }}
                    onPress={() => edit(networth)}
                />
            }
            rightContent={
                <Button
                    title="Delete"
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: '#ff5470' }}
                    onPress={() => deleteHandler(networth)}
                />
            }
            key={networth.id} bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{dayjs(networth.date).format('MMM D, YYYY')}</ListItem.Title>
                <ListItem.Subtitle>{networth.amount}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem.Swipeable>
    ));
};