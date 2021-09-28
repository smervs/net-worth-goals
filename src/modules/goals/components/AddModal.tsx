import React, { useState, useContext } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Input } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';
import { SubmitButton, CancelButton } from "modules/common/components/index";
import withObservables from '@nozbe/with-observables';
import { GoalContext } from "context/GoalContext";
import { add as addGoal } from "services/goal";

const AddModal = ({ accounts, visible, setVisible }) => {
    const { updateDashboard } = useContext(GoalContext);
    const [selectedAccount, setSelectedAccount] = useState();
    const [form, setForm] = useState({
        name: '',
        amount: '',
    });

    const submitForm = async () => {
        await addGoal({
            name: form.name,
            amount: Number.parseFloat(form.amount),
            accountId: selectedAccount
        });

        setForm({ name: '', amount: '' });
        setVisible(false);
        updateDashboard();
    };

    return (
        <Modal
            presentationStyle="overFullScreen"
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
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
                    <Text style={styles.inputLabel}>Account Linked</Text>
                    <View style={styles.pickerContainer}>
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
                    <CancelButton title="Cancel" onPress={() => setVisible(false)} />
                </View>
            </View>
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
    },
    inputLabel: {
        paddingHorizontal: 15,
        marginBottom: 4,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: "#6B7280"
    },
    pickerContainer: {
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10
    }
});

const enhance = withObservables(['accounts'], (props) => ({
    accounts: props.accounts.query()
}));

const EnhancedAddModal = enhance(AddModal);
export default EnhancedAddModal;
