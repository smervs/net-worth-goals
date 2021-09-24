import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Screen } from "modules/common/components";
import { FAB, Icon, Text } from "react-native-elements";
import database from "database/index";
import EnhancedList from "modules/accounts/components/List";
import AddModal from 'modules/accounts/components/AddModal';
import EditModal from 'modules/accounts/components/EditModal';

const accountsCollection = database.get('accounts');

export default function AccountScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [updateAccount, setUpdateAccount] = useState(null);

    const editAccount = (account) => {
        setUpdateAccount(account);
        setEditModalVisible(true);
    }

    return (
        <Screen>
            <AddModal
                visible={modalVisible}
                setVisible={setModalVisible}
            />
            <EditModal
                visible={editModalVisible}
                setVisible={setEditModalVisible}
                selectedAccount={updateAccount}
            />
            <ScrollView>
                {<EnhancedList accounts={accountsCollection} onEdit={editAccount} />}
            </ScrollView>
            <FAB
                containerStyle={{ marginBottom: 60 }}
                onPress={() => setModalVisible(true)}
                title={<Icon type="font-awesome-5" name="plus" size={18} color="#fff" />}
                placement="right"
                color="#ff5470" />
        </Screen>
    );
}