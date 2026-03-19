import useFetch from "@/hooks/useFetch";
import { User } from "@/types/user";
import { createContext, useContext } from "react";

interface UserContextType{
    users:User[];
    loading:boolean;
    error:string | null;
}

const UserContext = createContext<UserContextType>({
  users: [],
  loading: true,
  error: null,
});

export default function UserProvider({children}:{children:React.ReactNode}){
    const {data:users,loading,error}=useFetch<User[]>("https://jsonplaceholder.typicode.com/users")
    return(
        <UserContext.Provider value={{
            users: users||[] ,
            loading: loading,
            error: error
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUsers() {
  return useContext(UserContext);
}