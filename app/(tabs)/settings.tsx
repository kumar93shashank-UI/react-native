import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useEffect } from "react";
import { Alert, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
    const [name, setName] = React.useState<string>("");
    const [savedName, setSavedName] = React.useState<string>("");
    const [profileImage, setProfileImage] = React.useState<string|null>(null);
    const [location, setLocation] = React.useState<{latitude: number, longitude: number}|null>(null);

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
    async function pickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission denied");
            return;
        }
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.canceled) {
                setProfileImage(result.assets[0].uri);
            }
    }
    async function getLocation() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission denied");
            return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
    }

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
            <TouchableOpacity onPress={pickImage} style={styles.btn}>
                <Text style={styles.btnText}>Pick Image</Text>
            </TouchableOpacity>
            {profileImage && <Image source={{ uri: profileImage }} style={styles.avatar} />}
            <TouchableOpacity onPress={getLocation} style={styles.btn}>
                <Text style={styles.btnText}>Fetch Location</Text>
            </TouchableOpacity>
            {location && <Text>Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}</Text>}
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
    },
    avatar:{
        width: 100,
        height: 100,
        borderRadius: 50,
    }
})