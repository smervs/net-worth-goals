import React, { useState, useEffect } from 'react';
import { View, Text, Modal, ScrollView, StyleSheet } from 'react-native';
import { Screen } from "modules/common/components";
import { FAB, Icon, Input, Button } from "react-native-elements";
import database from "database/index";
import Goal from 'models/Goal';
import { Picker } from '@react-native-picker/picker';
import EnhancedList from "modules/goals/components/List";
import { SubmitButton, CancelButton } from "modules/common/components/index";

const goalsCollection = database.get('goals');
const accountsCollection = database.get('accounts');

export default function GoalScreen() {
    const [selectedAccount, setSelectedAccount] = useState();
    const [accounts, setAccounts] = useState([]);
    const [goals, setGoals] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [form, setForm] = useState({
        name: '',
        amount: '',
    });
    const [updateGoal, setUpdateGoal] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        amount: '',
    });

    const submitForm = async () => {
        await database.write(async () => {
            const data = await goalsCollection.create((goal: Goal) => {
                goal.name = form.name;
                goal.amount = Number.parseFloat(form.amount);
                goal.account.id = selectedAccount;
            });
        });

        setForm({ name: '', amount: '' });
        setModalVisible(false);
        getGoals();
    };

    const updateForm = async () => {
        await database.write(async () => {
            await updateGoal.update((goal: Goal) => {
                goal.name = editForm.name,
                goal.amount = Number.parseFloat(editForm.amount);
                goal.account.id = selectedAccount;
            });
        });

        setEditForm({ name: '', amount: '' });
        setEditModalVisible(false);
        getGoals();
    };

    const editGoal = async (goal) => {
        const account = await goal.account.fetch();
        setEditForm({
            name: goal.name,
            amount: goal.amount
        });
        if (account)
            setSelectedAccount(account.id);
        setUpdateGoal(goal);
        setEditModalVisible(true);
    }

    const refreshList = () => {
        getGoals();
    }

    const getGoals = async () => {
        const list = await goalsCollection.query().fetch();

        setGoals(list);
    }

    const getAccounts = async () => {
        const list = await accountsCollection.query().fetch();
        setAccounts(list);
    }

    useEffect(() => {
        // getGoals();
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
                            onChangeText={value => setForm((prev) => ({ ...prev, name: value }))}
                        />
                        <Input
                            keyboardType='numeric'
                            label="Current Balance"
                            placeholder="Current Balance"
                            value={form.amount.toString()}
                            onChangeText={value => setForm((prev) => ({ ...prev, amount: value }))}
                        />
                        <Text style={{ paddingHorizontal: 15, marginBottom: 4,
                            fontSize: 16, fontWeight: 'bold', color: "#6B7280" }}>Account Linked</Text>
                        <View style={{
                            borderColor: '#000',
                            borderWidth: 2,
                            borderRadius: 10
                        }}>
                        <Picker
                            selectedValue={selectedAccount}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedAccount(itemValue)
                            }>
                            {accounts.map(account => (
                                <Picker.Item key={account.id} label={account.name} value={account.id} />
                            ))}
                        </Picker>
                        </View>
                        <SubmitButton title="Save" onPress={submitForm} />
                        <CancelButton title="Cancel" onPress={() => setModalVisible(false)} />
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
                            value={editForm.amount.toString()}
                            onChangeText={value => setEditForm((prev) => ({ ...prev, amount: value }))}
                        />
                        <Text style={{ paddingHorizontal: 15, marginBottom: 4,
                            fontSize: 16, fontWeight: 'bold', color: "#6B7280" }}>Account Linked</Text>
                        <View style={{
                            borderColor: '#000',
                            borderWidth: 2,
                            borderRadius: 10
                        }}>
                        <Picker
                            selectedValue={selectedAccount}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedAccount(itemValue)
                            }>
                            {accounts.map(account => (
                                <Picker.Item key={account.id} label={account.name} value={account.id} />
                            ))}
                        </Picker>
                        </View>
                        <SubmitButton title="Update" onPress={updateForm} />
                        <CancelButton title="Cancel" onPress={() => setEditModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            <ScrollView>
                <EnhancedList goals={goalsCollection} refresh={refreshList} edit={editGoal} />
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