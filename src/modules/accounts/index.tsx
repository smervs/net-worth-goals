import React, { useState, useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import { Screen } from "modules/common/components";
import { FAB, Icon, Card } from "react-native-elements";
import { Q } from '@nozbe/watermelondb';
import dayjs from "dayjs";
import database from "database/index";
import Account from 'models/Account';
import Networth from 'models/Networth';
import EnhancedList from "modules/accounts/components/List";
import AddModal from 'modules/accounts/components/AddModal';
import EditModal from 'modules/accounts/components/EditModal';

const accountsCollection = database.get('accounts');
const networthsCollection = database.get('networths');

export default function AccountScreen() {
    const [sum, setSum] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [updateAccount, setUpdateAccount] = useState(null);

    const editAccount = (account) => {
        setUpdateAccount(account);
        setEditModalVisible(true);
    }

    const refreshList = () => {
        getAccounts();
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

    const getAccounts = async () => {
        const list = await accountsCollection.query().fetch();
        const totalAmount = list.reduce((prev: number, model: Account) => {
            return prev + model.total;
        }, 0);

        await updateNetworth(totalAmount);
        setSum(totalAmount);
        setAccounts(list);
    }

    useEffect(() => {
        getAccounts();
    }, []);

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
                <Card containerStyle={{ marginBottom: 15 }}>
                    <Text>Total</Text>
                    <Text>$ {sum}</Text>
                </Card>
                {accounts && <EnhancedList accounts={accounts} onEdit={editAccount} />}
            </ScrollView>
            <FAB
                onPress={() => setModalVisible(true)}
                title={<Icon type="font-awesome-5" name="plus" size={18} color="#fff" />}
                placement="right"
                color="#00ebc7" />
        </Screen>
    );
}