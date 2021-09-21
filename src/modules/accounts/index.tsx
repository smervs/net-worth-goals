import React, { useState, useEffect } from 'react';
import { View, Text, Modal, ScrollView, StyleSheet } from 'react-native';
import { Screen } from "../common/components";
import { FAB, Icon, Input, Button, Card } from "react-native-elements";
import List from "./components/List";
import database from "../../database";
import Account from '../../models/Account';
import { SliderHuePicker } from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Q } from '@nozbe/watermelondb';
import dayjs from "dayjs";
import Networth from '../../models/Networth';

const GestureHandlerWrapper = gestureHandlerRootHOC(
    ({ children }) => <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "flex-start",
        alignItems: "center"
    }}>{children}</View>,
);

const accountsCollection = database.get('accounts');
const networthsCollection = database.get('networths');

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
    const [color, setColor] = useState('#FF7700');
    const [picker, setPicker] = useState();

    const changeColor = (colorHsvOrRgb, resType) => {
        if (resType === 'end') {
            setColor(tinycolor(colorHsvOrRgb).toHexString());
        }
    }

    const submitForm = async () => {
        await database.write(async () => {
            await accountsCollection.create((account: Account) => {
                account.name = form.name,
                account.total = +form.total,
                account.color = color
            });
        });

        setForm({ name: '', total: 0.0 });
        setModalVisible(false);
        await getAccounts();
    };

    const updateForm = async () => {
        await database.write(async () => {
            await updateAccount.update((account: Account) => {
                account.name = editForm.name,
                account.total = +editForm.total,
                account.color = color
            });
        });

        setEditForm({ name: '', total: 0.0 });
        setEditModalVisible(false);
        await getAccounts();
    };

    const editAccount = (account) => {
        setEditForm({
            name: account.name,
            total: account.total
        });
        setColor(account.color);
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
            <Modal
                presentationStyle="overFullScreen"
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <GestureHandlerWrapper>
                {/* <View style={styles.centeredView}> */}
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
                        <View style={{marginTop: 10, height: 12, width: "100%"}}>
                            <SliderHuePicker
                                ref={view => { setPicker(view); }}
                                oldColor={color}
                                trackStyle={[{ height: 12, width: "100%" }]}
                                thumbStyle={{
                                    width: 20,
                                    height: 20,
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    shadowColor: 'black',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2
                                    },
                                    shadowRadius: 2,
                                    shadowOpacity: 0.35}}
                                useNativeDriver={false}
                                onColorChange={changeColor}
                            />
                        </View>
                        <Button title="Save" onPress={submitForm} containerStyle={{ marginTop: 30 }} />
                        <Button
                            containerStyle={{ marginTop: 10 }}
                            title="Cancel"
                            type="outline"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                {/* </View> */}
                </GestureHandlerWrapper>
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
                <GestureHandlerWrapper>
                {/* <View style={styles.centeredView}> */}
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
                        <View style={{ marginTop: 10, height: 12, width: "100%" }}>
                            <SliderHuePicker
                                ref={view => { setPicker(view); }}
                                oldColor={color}
                                trackStyle={[{ height: 12, width: "100%" }]}
                                thumbStyle={{
                                    width: 20,
                                    height: 20,
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    shadowColor: 'black',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2
                                    },
                                    shadowRadius: 2,
                                    shadowOpacity: 0.35
                                }}
                                useNativeDriver={false}
                                onColorChange={changeColor}
                            />
                        </View>
                        <Button title="Update" onPress={updateForm} containerStyle={{ marginTop: 30 }} />
                        <Button
                            containerStyle={{ marginTop: 10 }}
                            title="Cancel"
                            type="outline"
                            onPress={() => setEditModalVisible(false)}
                        />
                    </View>
                {/* </View> */}
                </GestureHandlerWrapper>
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