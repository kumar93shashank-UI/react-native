import { UserContextType } from "@/types/UserContextType";
import { createContext } from "react";

const UserContext = createContext<UserContextType>({
  users: [],
  loading: true,
  error: null,
});

export default UserContext;