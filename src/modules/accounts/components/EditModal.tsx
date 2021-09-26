import React, { useState, useEffect } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Text, Input } from "react-native-elements";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import database from "database/index";
import Account from "models/Account";
import { sync as syncNetworth } from "services/networth";
import { ColorPicker, SubmitButton, CancelButton } from "modules/common/components/index";

const GestureHandlerWrapper = gestureHandlerRootHOC(
    ({ children }) => <View style={styles.centeredView}>{children}</View>,
);

export default function EditModal({ visible, setVisible, selectedAccount }) {
    const [form, setForm] = useState({ name: '', total: '' });
    const [color, setColor] = useState(selectedAccount ? selectedAccount.color : '#FF7700');

    const updateForm = async () => {
        await database.write(async () => {
            await selectedAccount.update((account: Account) => {
                account.name = form.name;
                account.total = Number.parseFloat(form.total);
                account.color = color;
            });
        });

        setVisible(false);
        syncNetworth();
    };

    useEffect(() => {
        if (selectedAccount) {
            setForm({
                name: selectedAccount.name,
                total: selectedAccount.total
            });

            setColor(selectedAccount.color);
        }
    }, [selectedAccount]);

    return (
        <Modal
            presentationStyle="overFullScreen"
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(!visible)}
        >
            <GestureHandlerWrapper>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Edit Account</Text>
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
                        value={form.total.toString()}
                        onChangeText={value => setForm((prev) => ({ ...prev, total: value }))}
                    />
                    <View style={{ marginTop: 10, height: 12, width: "100%" }}>
                        <ColorPicker color={color} onColorChange={(c) => setColor(c)} />
                    </View>
                    <SubmitButton title="Update" onPress={updateForm} />
                    <CancelButton title="Cancel" onPress={() => setVisible(false)} />
                </View>
            </GestureHandlerWrapper>
        </Modal>
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
    modalTitle: {
        marginBottom: 15,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold'
    }
});