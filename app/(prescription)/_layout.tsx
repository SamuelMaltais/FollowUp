import {Stack, Tabs} from "expo-router";


export default function PrescriptionLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: 'none' },
            }}
        >
            <Tabs.Screen
                name="prescription"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
