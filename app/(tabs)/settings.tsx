import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
    const [name, setName] = React.useState<string>("");
    const [savedName, setSavedName] = React.useState<string>("");
    useEffect(() => {
        const fetchUserName = async () => {
            const storedName: string | null = await AsyncStorage.getItem("userName");
            if (storedName) {
                setSavedName(storedName);
            }
        }
        fetchUserName();
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.name}>Settings Screen</Text>
            <TextInput placeholder="Type something..." style={styles.btn1}
                onChangeText={(text: string) => setName(text)}
            />
            <TouchableOpacity onPress={async () => {
                await AsyncStorage.setItem("userName", name);
                setSavedName(name);
            }} style={styles.btn}>
                <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
            {savedName && <Text>Welcome, {savedName}!</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    btn: {
        marginTop: 20,
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5
    },
    btn1: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        width: "80%"
    },
    btnText:{
        color: "#fff",
    }
})