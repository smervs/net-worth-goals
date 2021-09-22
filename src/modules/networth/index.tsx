import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Screen } from "../common/components";
import List from "./components/List";
import database from "../../database";
import { Q } from '@nozbe/watermelondb';

const networthsCollection = database.get('networths');

export default function NetworthScreen() {
    const [networths, setNetworths] = useState([]);

    const refreshList = () => {
        getNetworths();
    }

    const getNetworths = async () => {
        const list = await networthsCollection.query(
            Q.unsafeSqlQuery(
                'select * from networths order by date desc'
            )
        ).unsafeFetchRaw();

        setNetworths(list);
    }

    useEffect(() => {
        getNetworths();
    }, []);

    return (
        <Screen>
            <ScrollView>
                <List networths={networths} refresh={refreshList} edit={() => {}} />
            </ScrollView>
        </Screen>
    );
}