import UserProvider from "@/context/UserContext";
import { store } from "@/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <UserProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </UserProvider>
        </Provider>)
}
