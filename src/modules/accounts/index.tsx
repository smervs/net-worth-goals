import React, { useState, useEffect } from 'react';
import { View, Text, Modal, ScrollView, StyleSheet } from 'react-native';
import { Screen } from "../common/components";
import { FAB, Icon, Input, Button, Card } from "react-native-elements";
import List from "./components/List";
import database from "../../database";
import Account from '../../models/Account';

const accountsCollection = database.get('accounts');

export default function AccountScreen() {
    const [sum, setSum] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [form, setForm] = useState({
        name: '',
        total: 0.0,
    });
    const [updateAccount, setUpdateAccount] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        total: 0.0,
    });

    const submitForm = async () => {
        await database.write(async () => {
            const newAccount = await accountsCollection.create((account: Account) => {
                account.name = form.name,
                account.total = +form.total,
                account.color = ''
            });
        });

        setForm({ name: '', total: 0.0 });
        setModalVisible(false);
        getAccounts();
    };

    const updateForm = async () => {
        await database.write(async () => {
            await updateAccount.update((account: Account) => {
                account.name = editForm.name,
                account.total = +editForm.total,
                account.color = ''
            });
        });

        setEditForm({ name: '', total: 0.0 });
        setEditModalVisible(false);
        getAccounts();
    };

    const editAccount = (account) => {
        setEditForm({
            name: account.name,
            total: account.total
        });
        setUpdateAccount(account);
        setEditModalVisible(true);
    }

    const refreshList = () => {
        getAccounts();
    }

    const getAccounts = async () => {
        const list = await accountsCollection.query().fetch();

        setSum(list.reduce((prev: number, model: Account) => {
            return prev + model.total;
        }, 0));

        setAccounts(list);
    }

    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <Screen>
            <Modal
                presentationStyle="overFullScreen"
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>New Account</Text>
                        <Input
                            label="Name"
                            placeholder="Name"
                            value={form.name}
                            onChangeText={value => setForm((prev) => ({...prev, name: value}))}
                        />
                        <Input
                            keyboardType='numeric'
                            label="Current Balance"
                            placeholder="Current Balance"
                            value={form.total.toString()}
                            onChangeText={value => setForm((prev) => ({ ...prev, total: value }))}
                        />
                        <Button title="Save" onPress={submitForm} />
                        <Button
                            containerStyle={{ marginTop: 10 }}
                            title="Cancel"
                            type="outline"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
            <Modal
                presentationStyle="overFullScreen"
                animationType="fade"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => {
                    setEditModalVisible(!editModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Edit Account</Text>
                        <Input
                            label="Name"
                            placeholder="Name"
                            value={editForm.name}
                            onChangeText={value => setEditForm((prev) => ({ ...prev, name: value }))}
                        />
                        <Input
                            keyboardType='numeric'
                            label="Current Balance"
                            placeholder="Current Balance"
                            value={editForm.total.toString()}
                            onChangeText={value => setEditForm((prev) => ({ ...prev, total: value }))}
                        />
                        <Button title="Update" onPress={updateForm} />
                        <Button
                            containerStyle={{ marginTop: 10 }}
                            title="Cancel"
                            type="outline"
                            onPress={() => setEditModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
            <ScrollView>
                <Card containerStyle={{ marginBottom: 15 }}>
                    <Text>Total</Text>
                    <Text>$ {sum}</Text>
                </Card>
                <List accounts={accounts} refresh={refreshList} edit={editAccount} />
            </ScrollView>
            <FAB
                onPress={() => setModalVisible(true)}
                title={<Icon type="font-awesome-5" name="plus" size={18} color="#fff" />}
                placement="right"
                color="#00ebc7" />
        </Screen>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    modalView: {
        width: "90%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    modalTitle: {
        marginBottom: 15,
        fontSize: 18,
        textAlign: 'center',
    }
});