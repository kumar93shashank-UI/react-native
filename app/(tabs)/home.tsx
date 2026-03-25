import { useUsers } from "@/context/UserContext";
import { User } from "@/types/user";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface UserCardProps{
    user:User;
    onPress:()=>void;
}
const UserCard=React.memo(({user, onPress}:UserCardProps)=>{
    return(
        <TouchableOpacity style={styles.userCard} onPress={onPress}>

                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </TouchableOpacity>
    )
})

export default function Home(){
    const { users, loading, error } = useUsers();
    const router=useRouter();
    const renderItem = useCallback(({ item }: { item: User }) => (
        <UserCard
            user={item}
            onPress={() => router.push(`/profile?name=${item.name}&role=${item.company.name}`)}
        />
    ), [router]);
    return(
        loading?<View style={styles.container}><Text>Loading...</Text></View>:
        error?<View style={styles.container}><Text>Error Occured</Text></View>:
                <View style={styles.container}>
                    <FlatList
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                        data={users}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: "800",
        color: "black"
    },
    email: {
        fontSize: 16,
        fontWeight: "400",
        color: "grey"
    },
    userCard: {
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
    }
})