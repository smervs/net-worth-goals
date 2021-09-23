import React from "react";
import { View } from "react-native";
import { ListItem as RNEListItem, Button, Icon } from "react-native-elements";
import withObservables from '@nozbe/with-observables';

const ListItem = ({ account, onEdit, onDelete }) => (
    <RNEListItem.Swipeable
        leftContent={
            <Button
                title="Edit"
                icon={<Icon name="edit" type="feather" color="white" containerStyle={{ marginRight: 8 }} />}
                buttonStyle={{ minHeight: '100%' }}
                onPress={() => onEdit(account)}
            />
        }
        rightContent={
            <Button
                title="Delete"
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: '#ff5470' }}
                onPress={() => onDelete(account)}
            />
        }
        key={account.id} bottomDivider>
        <View style={{ height: 20, width: 20, backgroundColor: account.color }}></View>
        <RNEListItem.Content>
            <RNEListItem.Title>{account.name}</RNEListItem.Title>
            <RNEListItem.Subtitle>{account.total}</RNEListItem.Subtitle>
        </RNEListItem.Content>
    </RNEListItem.Swipeable>
);

const enhance = withObservables(['account'], (props) => ({
    account: props.account
}));

const EnhancedListItem = enhance(ListItem);
export default EnhancedListItem;
