import SearchBar from "@/components/SearchBar";
import StatBox from "@/components/StatBox";
import { useMemo } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface SkillsListProps{
    query:string;
    onSearch:(text:string)=>void;
    name?:string;
    role?:string;
}
export default function SkillsList({query,onSearch,name,role}:SkillsListProps){
    const skills = useMemo(() => ["React", "TypeScript", "React Native", "JavaScript", "Node.js"], []); 
    const filteredSkills=skills.filter(skill=>skill.toLowerCase().includes(query.toLowerCase()));
    const header = useMemo(() => (
        <View style={styles.view}>
            <TouchableOpacity onPress={() => console.log('image clicked')}>
                <Image source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} style={styles.avatar} />
            </TouchableOpacity>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.bio}>{role}</Text>
            <View style={styles.statsRow}>
                <StatBox value="128" label="Posts" />
                <StatBox value="4.2k" label="Followers" />
                <StatBox value="312" label="Following" />
            </View>
        </View>
    ), [name,role]);

    const footer=(
            <SearchBar onSearch={onSearch} />
    )
    
    return(
        <FlatList contentContainerStyle={styles.flatListContent}
         ListHeaderComponent={header} data={filteredSkills} 
            keyExtractor={(item,index)=>item}
            renderItem={({item})=><Text style={styles.textItem}>{item}</Text>}
            ListFooterComponent={footer}
        />
    )
}

const styles=StyleSheet.create({
    avatar:{
        width:100, 
        height:100, 
        borderRadius:50
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: "center"
    },
    view:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    name:{
        fontSize:24,
        fontWeight:"800",
        color:"black"
    },
    bio:{
        fontSize:16,
        fontWeight:"400",
        color:"grey"
    },
    statsRow:{
        flexDirection:"row",
        gap: 24
    },
    textItem:{
        textAlign:"center"
    }
})