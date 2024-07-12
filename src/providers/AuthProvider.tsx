import { useState, PropsWithChildren, createContext, useContext } from "react";
import { user, bibliotecaria } from "../types";
import 'react-native-reanimated';

type AuthData = {
    session: user | bibliotecaria | null;
    setSession: React.Dispatch<React.SetStateAction<user | bibliotecaria | null>>;
}

const AuthContext =  createContext<AuthData>({
    session: null,
    setSession: () => null,
});

export default function AuthProvider({children}: PropsWithChildren) {
    const [session, setSession] = useState<user | bibliotecaria | null >(null);

    return(
        <AuthContext.Provider value={{session, setSession}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);