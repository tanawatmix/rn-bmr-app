import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, Dimensions, Modal, Image } from "react-native";
import { RadioButton, Button } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const BMRCalculator = () => {
    const [isSplash, setIsSplash] = useState(true);
    const [gender, setGender] = useState("male");
    const [weight, setWeight] = useState("");
    const [heightVal, setHeightVal] = useState("");
    const [age, setAge] = useState("");
    const [bmr, setBmr] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsSplash(false);
        }, 2000);
    }, []);

    const calculateBMR = () => {
        if (!weight || !heightVal || !age) {
            alert("โปรดใส่ข้อมูลให้ครบถ้วน");
            return;
        }

        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(heightVal);
        const ageNum = parseFloat(age);

        if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum)) {
            alert("โปรดใส่ข้อมูลเป็นตัวเลขที่ถูกต้อง");
            return;
        }

        if (weightNum <= 0 || heightNum <= 0 || ageNum <= 0) {
            alert("น้ำหนัก, ส่วนสูง, และอายุต้องมากกว่า 0");
            return;
        }

        if (weightNum > 300 || heightNum > 300 || ageNum > 120) {
            alert(
                "โปรดใส่ข้อมูลที่สมเหตุสมผล (น้ำหนัก < 300 กก., ส่วนสูง < 300 ซม., อายุ < 120 ปี)"
            );
            return;
        }

        let bmrResult;
        if (gender === "male") {
            bmrResult = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
        } else {
            bmrResult = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
        }

        if (bmrResult <= 0) {
            alert("เกิดข้อผิดพลาดในการคำนวณ BMR กรุณาตรวจสอบข้อมูล");
            return;
        }

        setBmr(bmrResult.toFixed(1));
        setModalVisible(true);
    };

    const resetForm = () => {
        setGender("male");
        setWeight("");
        setHeightVal("");
        setAge("");
        setBmr(null);
        setModalVisible(false);
    };

    if (isSplash) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>BMR</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>BMR Application</Text>
            </View>

            <Image source={require("./assets/bmrlogo.png")}style={styles.showLogo}/>

            <View style={styles.form}>
                <Text style={styles.label}>เพศ</Text>
                <RadioButton.Group
                    onValueChange={(value) => setGender(value)}
                    value={gender}
                >
                    <View style={styles.radioContainer}>
                        <View style={styles.radioItem}>
                            <RadioButton value="male" color="#E91E63" />
                            <Text style={styles.radioText}>ชาย</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton value="female" color="#E91E63" />
                            <Text style={styles.radioText}>หญิง</Text>
                        </View>
                    </View>
                </RadioButton.Group>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>น้ำหนัก</Text>
                    <View style={styles.inputWrapper}>
                        {!weight && <Text style={styles.inputPrefix}>0</Text>}
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={setWeight}
                            value={weight}
                            placeholder=""
                        />
                        <Text style={styles.unit}>กก.</Text>
                    </View>
                    <View style={styles.underline} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>ส่วนสูง</Text>
                    <View style={styles.inputWrapper}>
                        {!heightVal && <Text style={styles.inputPrefix}>0</Text>}
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={setHeightVal}
                            value={heightVal}
                            placeholder=""
                        />
                        <Text style={styles.unit}>ซม.</Text>
                    </View>
                    <View style={styles.underline} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>อายุ</Text>
                    <View style={styles.inputWrapper}>
                        {!age && <Text style={styles.inputPrefix}>0</Text>}
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={setAge}
                            value={age}
                            placeholder=""
                        />
                        <Text style={styles.unit}>ปี</Text>
                    </View>
                    <View style={styles.underline} />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={calculateBMR}
                        style={styles.button}
                        labelStyle={styles.buttonText}
                    >
                        คำนวณ
                    </Button>
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.resultLabel}>ค่า BMR ของคุณ</Text>
                        <Text style={styles.resultText}>{bmr}</Text>
                        <Button
                            mode="contained"
                            onPress={resetForm}
                            style={styles.okButton}
                            labelStyle={styles.okButtonText}
                        >
                            OK
                        </Button>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default BMRCalculator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCE4EC",
        width: "100%",
        height: "100%",
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        backgroundColor: "#E91E63",
        paddingVertical: height * 0.02,
        alignItems: "center",
        width: "100%",
    },
    headerText: {
        fontSize: width * 0.06,
        fontWeight: "bold",
        color: "#FFF",
    },
    showLogo: {
        width: 150,
        height: 150,
        marginVertical: 30,
        alignSelf: "center",},
    form: {
        flex: 1,
        paddingHorizontal: width * 0.05,
    },
    label: {
        fontSize: width * 0.045,
        fontWeight: "bold",
        marginTop: height * 0.01,
        color: "#880E4F",
        alignSelf: "flex-start",
    },
    radioContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioText: {
        fontSize: width * 0.04,
        color: "#880E4F",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    inputPrefix: {
        fontSize: width * 0.045,
        color: "#888",
    },
    input: {
        flex: 1,
        fontSize: width * 0.045,
        color: "#000",
    },
    unit: {
        fontSize: width * 0.04,
        color: "#880E4F",
    },
    underline: {
        height: 1,
        backgroundColor: "#888",
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: height * 0.02,
    },
    button: {
        width: "50%",
        backgroundColor: "#E91E63",
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: width * 0.05,
        color: "#FFF",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        width: width * 0.6,
    },
    resultLabel: {
        fontSize: width * 0.05,
        fontWeight: "bold",
        color: "#000",
    },
    resultText: {
        fontSize: width * 0.1,
        fontWeight: "bold",
        color: "#E91E63",
    },
    okButton: {
        width: "40%",
        backgroundColor: "#E0E0E0",
        paddingVertical: 8,
        borderRadius: 20,
    },
    okButtonText: {
        fontSize: width * 0.04,
        color: "#000",
    },
});
