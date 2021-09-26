import React from 'react';
import { View } from "react-native";
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import EnhancedListItem from "modules/networth/components/ListItem";

const List = ({ networths }) => {
    return (
        <View style={{ marginTop: 6 }}>
            {networths.map(networth => (
                <EnhancedListItem key={networth.id} networth={networth} />
            ))}
        </View>
    );
};

const enhance = withObservables(['database'], ({ database }) => ({
    networths: database.get('networths').query(
        Q.unsafeSqlQuery(
            'select * from networths order by date desc'
        )
    ).observe()
}));

const EnhancedList = enhance(List);
export default EnhancedList;