import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
    const [name, setName] = React.useState<string>("");
    const [savedName, setSavedName] = React.useState<string>("");
    const OS = Platform.OS==="ios"?"iOS":"Android";
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
            <View style={styles.badge}>
            <Text style={styles.badgeText}>{`Running on ${OS}`}</Text>
            </View>
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
    },
    badge: {
        ...Platform.select({
            ios: { backgroundColor: "#007AFF" },
            android: { backgroundColor: "#3DDC84" },
        }),
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        marginBottom: 16,
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    }
})