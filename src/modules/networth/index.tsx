import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Screen } from "modules/common/components";
import EnhancedList from "modules/networth/components/List";
import database from "database/index";

export default function NetworthScreen() {

    return (
        <Screen>
            <ScrollView>
                <EnhancedList database={database} page={1}/>
            </ScrollView>
        </Screen>
    );
}