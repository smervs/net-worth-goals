import React from 'react';
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import dayjs from "dayjs";
import withObservables from '@nozbe/with-observables';
import { Q } from '@nozbe/watermelondb';
import { numberWithCommas } from "helpers/index";

const List = ({ networths }) => {
    return (
        <View style={{ marginTop: 6 }}>
            {networths.map(networth => (
                <ListItem key={networth.id} bottomDivider
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
                    <ListItem.Content>
                        <ListItem.Title>{dayjs(networth.date).format('MMM D, YYYY')}</ListItem.Title>
                        <ListItem.Subtitle>{numberWithCommas(networth.amount)}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
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