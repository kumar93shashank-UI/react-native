import { StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps{
    onSearch:(text:string)=>void;
}
export default function SearchBar({onSearch}:SearchBarProps){
    return (
        <View style={styles.container}>
        <TextInput placeholder="Search skills..." onChangeText={(text)=>onSearch(text)} style={styles.input}/>
        </View> 
    )
}

const styles=StyleSheet.create({
    container:{
        alignItems:"center",    
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        padding: 10,
        width: "80%"
    }
})