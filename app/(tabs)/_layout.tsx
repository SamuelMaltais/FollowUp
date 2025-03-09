import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/component/colors";

export default function TabLayout() {
  return (
      <Tabs
          screenOptions={{
              tabBarActiveTintColor: "#5E83C0",
              tabBarInactiveTintColor: "#392F5a",
              tabBarStyle: {
                  backgroundColor: "#fff",
              },
              headerShown: false,
          }}
      >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="calendar"
            options={{
              title: "Calendar",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={
                    focused ? "calendar" : "calendar-outline"
                  }
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={
                    focused ? "person" : "person-outline"
                  }
                  color={color}
                  size={24}
                />
              ),
            }}
          />
    </Tabs>
  );
}
