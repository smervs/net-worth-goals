import React, { useState, useContext } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Text, Input } from "react-native-elements";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { sync as syncNetworth } from "services/networth";
import { ColorPicker, SubmitButton, CancelButton } from "modules/common/components/index";
import { GoalContext } from "context/GoalContext";
import { add as addAccount } from "services/account";

const GestureHandlerWrapper = gestureHandlerRootHOC(
    ({ children }) => <View style={styles.centeredView}>{children}</View>,
);

export default function AddModal({ visible, setVisible }) {
    const { updateDashboard } = useContext(GoalContext);
    const [form, setForm] = useState({ name: '', total: '' });
    const [color, setColor] = useState('#FF7700');

    const submitForm = async () => {
        await addAccount({
            name: form.name,
            total: Number.parseFloat(form.total),
            color: color
        });

        setForm({ name: '', total: '' });
        setVisible(false);
        syncNetworth();
        updateDashboard();
    };

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
                        value={form.total.toString()}
                        onChangeText={value => setForm((prev) => ({ ...prev, total: value }))}
                    />
                    <View style={{ marginTop: 10, height: 12, width: "100%" }}>
                        <ColorPicker color={color} onColorChange={(c) => setColor(c)} />
                    </View>
                    <SubmitButton title="Save" onPress={submitForm} />
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
        borderWidth: 2,
        borderColor: '#000',
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