import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Modal, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Screen } from "../common/components";
import { FAB, Icon, Input, Button } from "react-native-elements";
import List from "./components/List";
import database from "../../database";
import Account from '../../models/Account';

const accountsCollection = database.get('accounts');

export default function AccountScreen() {
    const [accounts, setAccounts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState({
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

    const getAccounts = async () => {
        const list = await accountsCollection.query().fetch();
        setAccounts(list);
        console.log(list)
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
                    Alert.alert("Modal has been closed.");
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
            <ScrollView>
                <List accounts={accounts} />
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