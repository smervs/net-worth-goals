import React from "react";
import { View } from "react-native";
import { ListItem as RNEListItem, Text, Button, Icon } from "react-native-elements";
import { numberWithCommas } from "helpers/index";
import withObservables from '@nozbe/with-observables';

const ListItem = ({ goal, edit, deleteHandler, account }) => {
    return (
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
            <RNEListItem.Content>
                <RNEListItem.Title>{goal.name}</RNEListItem.Title>
                <RNEListItem.Subtitle>{numberWithCommas(goal.amount)}</RNEListItem.Subtitle>
            </RNEListItem.Content>
            <View style={{ alignItems: 'flex-end' }}>
                <Text>{((account.total / goal.amount) * 100).toFixed(2)}%</Text>
                <Text>{account && account.name}</Text>
            </View>
        </RNEListItem.Swipeable>
    );
}

const enhance = withObservables(['goal'], (props) => ({
    goal: props.goal,
    account: props.goal.account.observe()
}));

const EnhancedListItem = enhance(ListItem);
export default EnhancedListItem;