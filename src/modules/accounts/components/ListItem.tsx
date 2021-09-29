import React from "react";
import { ListItem as RNEListItem, Text } from "react-native-elements";
import withObservables from '@nozbe/with-observables';
import { numberWithCommas } from "helpers/index";
import { CircleColor } from "modules/common/components/index";
import EditButton from "modules/common/components/ListItem/EditButton";
import DeleteButton from "modules/common/components/ListItem/DeleteButton";

const ListItem = ({ account, onEdit, onDelete, percentage }) => (
    <RNEListItem.Swipeable
        key={account.id}
        leftContent={<EditButton onPress={() => onEdit(account)} />}
        rightContent={<DeleteButton onPress={() => onDelete(account)} />}
        bottomDivider>
        <CircleColor color={account.color} />
        <RNEListItem.Content>
            <RNEListItem.Title style={{ fontFamily: 'Poppins-Regular' }}>{account.name}</RNEListItem.Title>
            <RNEListItem.Subtitle style={{ fontFamily: 'Poppins-Bold' }}>{numberWithCommas(account.total)}</RNEListItem.Subtitle>
        </RNEListItem.Content>
        <Text>{Number.parseFloat(percentage).toFixed(2)}%</Text>
    </RNEListItem.Swipeable>
);

const enhance = withObservables(['account'], (props) => ({
    account: props.account
}));

const EnhancedListItem = enhance(ListItem);
export default EnhancedListItem;
