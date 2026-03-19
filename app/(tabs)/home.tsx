import { useUsers } from "@/context/UserContext";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Home(){
    // const {data:users,loading,error}=useFetch<User[]>("https://jsonplaceholder.typicode.com/users")
    const { users, loading, error } = useUsers();
    const router=useRouter();

    return(
        loading?<View style={styles.container}><Text>Loading...</Text></View>:
        error?<View style={styles.container}><Text>Error Occured</Text></View>:
                <View style={styles.container}>
                    <FlatList data={users} keyExtractor={(item) => `${item.id}`} renderItem={({ item }) => (
                        <TouchableOpacity style={styles.userCard} onPress={() =>router.push(`/profile?name=${item.name}&role=${item.company.name}`)}>

                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                    </TouchableOpacity>)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    userCard: {
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
    }
})