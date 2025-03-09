import {router, Stack} from "expo-router";
import {useEffect, useState} from "react";

export default function RootLayout() {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (isConnected !== null) {
            if (isConnected) {
                router.push("/(tabs)");
            } else {
                router.push("/(auth)/login");
            }
        }
    }, [isConnected]);

    return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(prescription)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
