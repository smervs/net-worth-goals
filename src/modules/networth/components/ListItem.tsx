import React from "react";
import { ListItem as RNEListItem } from "react-native-elements";
import withObservables from '@nozbe/with-observables';
import dayjs from "dayjs";
import { numberWithCommas } from "helpers/index";

const ListItem = ({ networth }) => {
    return (
        <RNEListItem key={networth.id} bottomDivider>
            <RNEListItem.Content>
                <RNEListItem.Title>{dayjs(networth.date).format('MMM D, YYYY')}</RNEListItem.Title>
                <RNEListItem.Subtitle style={{ fontFamily: 'Poppins-Bold' }}>{numberWithCommas(networth.amount)}</RNEListItem.Subtitle>
            </RNEListItem.Content>
        </RNEListItem>
    );
}

const enhance = withObservables(['networth'], (props) => ({
    goal: props.networth
}));

const EnhancedListItem = enhance(ListItem);
export default EnhancedListItem;