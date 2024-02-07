import { Stack } from "expo-router";


function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="welcomeScreen" />
        </Stack>
    )
}

export default AuthLayout;