import React from 'react';
import { Alert } from "react-native";
import { Button, ListItem, Icon } from "react-native-elements";
import database from "database/index";

export default function List({ goals, refresh, edit }) {
    const deleteGoal = async (goal) => {
        await database.write(async () => {
            goal.destroyPermanently();
            refresh();
        });
    };

    const deleteHandler = (goal) => {
        Alert.alert(
            'Confirmation',
            `Are you sure you want to delete ${goal.name} goal?`,
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        deleteGoal(goal);
                    },
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    return goals.map(goal => (
        <ListItem.Swipeable
            key={goal.id}
            leftContent={
                <Button
                    title="Edit"
                    icon={<Icon name="edit" type="feather" color="white" containerStyle={{ marginRight: 8 }} />}
                    buttonStyle={{ minHeight: '100%' }}
                    onPress={() => edit(goal)}
                />
            }
            rightContent={
                <Button
                    title="Delete"
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: '#ff5470' }}
                    onPress={() => deleteHandler(goal)}
                />
            }
            bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{goal.name}</ListItem.Title>
                <ListItem.Subtitle>{goal.amount}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem.Swipeable>
    ));
};