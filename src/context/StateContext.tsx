import { createContext, useContext, useState, ReactNode } from "react";

interface StateContextType {
    showKasiaTab: boolean,
    setShowKasiaTab: (value: boolean) => void,
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function useStateContext() {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within StateProvider');
    }
    return context;
}

const StateProvider = ( { children }: { children: ReactNode } ) => {

    const [showKasiaTab, setShowKasiaTab ] = useState(false);

    return (
        <StateContext.Provider value={{ showKasiaTab, setShowKasiaTab }}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider;