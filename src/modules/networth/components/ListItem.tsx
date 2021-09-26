import React from "react";
import { ListItem as RNEListItem } from "react-native-elements";
import withObservables from '@nozbe/with-observables';
import dayjs from "dayjs";
import { numberWithCommas } from "helpers/index";

const ListItem = ({ networth }) => {
    return (
        <RNEListItem key={networth.id} bottomDivider
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
            }}>
            <RNEListItem.Content>
                <RNEListItem.Title>{dayjs(networth.date).format('MMM D, YYYY')}</RNEListItem.Title>
                <RNEListItem.Subtitle>{numberWithCommas(networth.amount)}</RNEListItem.Subtitle>
            </RNEListItem.Content>
        </RNEListItem>
    );
}

const enhance = withObservables(['networth'], (props) => ({
    goal: props.networth
}));

const EnhancedListItem = enhance(ListItem);
export default EnhancedListItem;