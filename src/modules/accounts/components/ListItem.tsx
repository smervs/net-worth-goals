import React from "react";
import { View } from "react-native";
import { ListItem as RNEListItem, Button, Icon, Text } from "react-native-elements";
import withObservables from '@nozbe/with-observables';

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


const ListItem = ({ account, onEdit, onDelete, percentage }) => (
    <RNEListItem.Swipeable
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
        <View style={{ height: 40, width: 40, backgroundColor: account.color, borderRadius: 20 }}></View>
        <RNEListItem.Content>
            <RNEListItem.Title>{account.name}</RNEListItem.Title>
            <RNEListItem.Subtitle>{numberWithCommas(account.total)}</RNEListItem.Subtitle>
        </RNEListItem.Content>
        <Text>{Number.parseFloat(percentage).toFixed(2)}%</Text>
    </RNEListItem.Swipeable>
);

const enhance = withObservables(['account'], (props) => ({
    account: props.account
}));

const EnhancedListItem = enhance(ListItem);
export default EnhancedListItem;
