import React from "react";
import { View } from "react-native";
import { ListItem as RNEListItem, Button, Icon, Text } from "react-native-elements";
import withObservables from '@nozbe/with-observables';
import { numberWithCommas } from "helpers/index";
import { CircleColor } from "modules/common/components/index";

const ListItem = ({ account, onEdit, onDelete, percentage }) => (
    <RNEListItem.Swipeable
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
                    onPress={() => onEdit(account)}
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
                    containerStyle={{  }}
                    title="Delete"
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: '#ff5470', borderRadius: 8 }}
                    onPress={() => onDelete(account)}
                />
            </View>
        }
        key={account.id} bottomDivider>
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
