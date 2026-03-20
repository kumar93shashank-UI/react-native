import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/usersSlice";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Explore(){
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.users);
    const router = useRouter();
useEffect(() => {
  dispatch(fetchUsers());
}, []);
    return(
        <View style={styles.container}>
            {loading ? <Text>Loading Explore Screen...</Text> :
                error ? <Text>Error Occurred</Text> :
                    <FlatList data={users} keyExtractor={(item, index) => `${item.id}`} renderItem={({ item }) =>
                        <TouchableOpacity style={styles.userCard} onPress={() => router.push(`/profile?name=${item.name}&role=${item.company.name}`)}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.email}>{item.email}</Text>
                        </TouchableOpacity>
                    } />
            }
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    userCard: {
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
    },
        name:{
        fontSize:24,
        fontWeight:"800",
        color:"black"
    },
    email:{
        fontSize:16,
        fontWeight:"400",
        color:"grey"
    }
})