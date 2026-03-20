import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
      <Tabs screenOptions={{ headerShown: false }} >
        <Tabs.Screen name="home"options={{title:"Home"}} />
        <Tabs.Screen name="explore"options={{title:"Explore"}} />
        <Tabs.Screen name="settings"options={{title:"Settings"}} />
      </Tabs>
)
}