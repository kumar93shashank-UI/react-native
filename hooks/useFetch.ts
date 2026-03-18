import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch<T>(url:string){
    const [data,setData]=useState<T|null>(null);
    const [loading,setLoading]=useState<boolean>(true);
    const [error,setError]=useState<string | null>(null);
    useEffect(()=>{
        const fetchData= async()=>{
            try{
                const response= await axios.get(url);
                setData(response.data);
                setLoading(false);
                
            }catch(error){
                setError("Failed to fetch data");
                setLoading(false);  
            }
        }
        fetchData();
    },[url])
    return {data,loading,error}
}