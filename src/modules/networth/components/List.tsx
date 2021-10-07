import React from 'react';
import { View } from "react-native";
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import EnhancedListItem from "modules/networth/components/ListItem";

const perPage = 10;

const List = ({ networths }) => {
    return (
        <View style={{ marginTop: 6 }}>
            {networths.map(networth => (
                <EnhancedListItem key={networth.id} networth={networth} />
            ))}
        </View>
    );
};

const enhance = withObservables(['database', 'page'], ({ page, database }) => ({
    networths: database.get('networths').query(
        Q.experimentalSkip((page - 1) * perPage),
        Q.experimentalTake(perPage),
        Q.experimentalSortBy('date', 'desc')
    ).observe()
}));

const EnhancedList = enhance(List);
export default EnhancedList;