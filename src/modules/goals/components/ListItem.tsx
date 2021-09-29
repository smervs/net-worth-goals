import React from "react";
import { View } from "react-native";
import { ListItem as RNEListItem, Text } from "react-native-elements";
import { numberWithCommas } from "helpers/index";
import withObservables from '@nozbe/with-observables';
import EditButton from "modules/common/components/ListItem/EditButton";
import DeleteButton from "modules/common/components/ListItem/DeleteButton";

const calculateCompletion = (accountTotal, goalTotal) => {
    const completed = (accountTotal / goalTotal) * 100;
    return completed > 100 ? 100 : completed;
}

const ListItem = ({ goal, edit, deleteHandler, account }) => (
    <RNEListItem.Swipeable
        key={goal.id}
        leftContent={<EditButton onPress={() => edit(goal)} />}
        rightContent={<DeleteButton onPress={() => deleteHandler(goal)} />}
        bottomDivider>
        <RNEListItem.Content>
            <RNEListItem.Title>{goal.name}</RNEListItem.Title>
            <RNEListItem.Subtitle style={{ fontFamily: 'Poppins-Bold' }}>{numberWithCommas(goal.amount)}</RNEListItem.Subtitle>
        </RNEListItem.Content>
        <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold' }}>{(calculateCompletion(account?.total, goal.amount)).toFixed(2)}%</Text>
            <Text>{account && account.name}</Text>
        </View>
    </RNEListItem.Swipeable>
);

const enhance = withObservables(['goal'], (props) => ({
    goal: props.goal,
    account: props.goal.account.observe()
}));

const EnhancedListItem = enhance(ListItem);
export default EnhancedListItem;