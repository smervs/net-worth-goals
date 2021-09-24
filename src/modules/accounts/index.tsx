import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Screen } from "modules/common/components";
import { FAB, Icon } from "react-native-elements";
import { Q } from '@nozbe/watermelondb';
import dayjs from "dayjs";
import database from "database/index";
import Networth from 'models/Networth';
import EnhancedList from "modules/accounts/components/List";
import AddModal from 'modules/accounts/components/AddModal';
import EditModal from 'modules/accounts/components/EditModal';

const accountsCollection = database.get('accounts');
const networthsCollection = database.get('networths');

export default function AccountScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [updateAccount, setUpdateAccount] = useState(null);

    const editAccount = (account) => {
        setUpdateAccount(account);
        setEditModalVisible(true);
    }

    const updateNetworth = async (totalNetworth) => {
        const list = await networthsCollection.query(
            Q.where('date', dayjs().format('YYYYMMDD'))
        ).fetch();

        if (list && list.length) {
            const networthModel = list[0];
            await database.write(async () => {
                await networthModel.update((networth: Networth) => {
                    networth.amount = totalNetworth;
                });
            });

        } else {
            await database.write(async () => {
                const nw = await networthsCollection.create((networth: Networth) => {
                    networth.date = dayjs().format('YYYYMMDD'),
                    networth.amount = totalNetworth
                });
            });
        }
    }

    return (
        <Screen>
            <AddModal
                visible={modalVisible}
                setVisible={setModalVisible}
                onSubmit={() => {}}
            />
            <EditModal
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                onSubmit={() => {}}
                selectedAccount={updateAccount}
            />
            <ScrollView>
                {<EnhancedList accounts={accountsCollection} onEdit={editAccount} />}
            </ScrollView>
            <FAB
                onPress={() => setModalVisible(true)}
                title={<Icon type="font-awesome-5" name="plus" size={18} color="#fff" />}
                placement="right"
                color="#00ebc7" />
        </Screen>
    );
}