import React from 'react';
import { ListItem } from "react-native-elements";
import dayjs from "dayjs";
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';

const List = ({ networths }) => {
    return networths.map(networth => (
        <ListItem key={networth.id} bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{dayjs(networth.date).format('MMM D, YYYY')}</ListItem.Title>
                <ListItem.Subtitle>{networth.amount}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    ));
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