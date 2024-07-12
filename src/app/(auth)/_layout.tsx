import { Stack } from "expo-router";
import 'react-native-reanimated';


function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="onboardingScreen" />
        </Stack>
    )
}

export default AuthLayout;