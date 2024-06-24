import { createContext, useContext, useState, ReactNode } from 'react';

interface LangContextProps {
    lang: string;
    setLang: (lang: string) => void;
}

const LangContext = createContext<LangContextProps | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<string>("English");

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => {
    const context = useContext(LangContext);
    if (context === undefined) {
        throw new Error("useLang must be used within a LangProvider");
    }
    return context;
};
