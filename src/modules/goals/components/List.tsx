import React, { useContext } from 'react';
import { Alert, View } from "react-native";
import database from "database/index";
import withObservables from '@nozbe/with-observables';
import ListItem from "modules/goals/components/ListItem";
import { GoalContext } from "context/GoalContext";

const List = ({ goals, refresh, edit }) => {
    const { updateTotalCompletion } = useContext(GoalContext);
    const deleteGoal = async (goal) => {
        await database.write(async () => {
            goal.destroyPermanently();
        });

        updateTotalCompletion();
        refresh();
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
                <ListItem key={goal.id} goal={goal} edit={edit} deleteHandler={deleteHandler} />
            ))}
        </View>
    );
};

const enhance = withObservables(['goals'], (props) => ({
    goals: props.goals.query()
}));

const EnhancedList = enhance(List);
export default EnhancedList;
