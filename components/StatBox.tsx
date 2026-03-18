import { StyleSheet, Text, View } from "react-native";
interface StatBoxProps{
    value:string;
    label:string;
}

export default function StatBox({value,label}:StatBoxProps){
    return(
                <View style={styles.statBox}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.label}>{label}</Text>
                </View>
    )
}

const styles=StyleSheet.create({
    value:{
        fontSize: 18, 
        fontWeight: "600"
    },
    label:{
        fontSize: 12, 
        color: "gray"
    },
    statBox:{
        alignItems:"center"
    }
})