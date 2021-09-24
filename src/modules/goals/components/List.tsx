import React from 'react';
import { Alert, View } from "react-native";
import { Button, ListItem, Icon } from "react-native-elements";
import database from "database/index";
import withObservables from '@nozbe/with-observables';

const List = ({ goals, refresh, edit }) => {
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

    return (
        <View style={{ marginTop: 6 }}>
            {goals.map(goal => (
            <ListItem.Swipeable
                containerStyle={{
                    marginHorizontal: 15,
                    marginVertical: 6,
                    borderRadius: 10,
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation: 6,
                    borderWidth: 2,
                    borderColor: '#000',
                    borderBottomWidth: 2
                }}
                key={goal.id}
                leftContent={
                    <View style={{
                        marginLeft: 15, marginRight: -6, marginVertical: 6, borderRadius: 10,
                        borderWidth: 2,
                        borderColor: '#000',
                        borderBottomColor: '#000',
                        borderBottomWidth: 2
                    }}>
                        <Button
                            title="Edit"
                            icon={<Icon name="edit" type="feather" color="white" containerStyle={{ marginRight: 8 }} />}
                            buttonStyle={{ minHeight: '100%', backgroundColor: '#3B82F6', borderRadius: 8 }}
                            onPress={() => edit(goal)}
                        />
                    </View>
                }
                rightContent={
                    <View style={{
                        marginRight: 15, marginLeft: -6, marginVertical: 6, borderRadius: 10,
                        borderWidth: 2,
                        borderColor: '#000',
                        borderBottomColor: '#000',
                        borderBottomWidth: 2
                    }}>
                        <Button
                            title="Delete"
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: '#ff5470', borderRadius: 8 }}
                            onPress={() => deleteHandler(goal)}
                        />
                    </View>
                }
                bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{goal.name}</ListItem.Title>
                    <ListItem.Subtitle>{goal.amount}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem.Swipeable>
            ))}
        </View>
    );
};

const enhance = withObservables(['goals'], (props) => ({
    goals: props.goals.query()
}));

const EnhancedList = enhance(List);
export default EnhancedList;
