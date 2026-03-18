import { User } from "./user";

export interface UserContextType{
    users:User[];
    loading:boolean;
    error:string | null;
}