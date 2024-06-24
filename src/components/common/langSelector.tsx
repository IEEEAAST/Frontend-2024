import { useState } from 'react';
import globe from "../../assets/navbar/globe.svg";
import arrow from "../../assets/navbar/arrow-down.svg";

export const LangSelector = () => {
    const [lang, setLang] = useState<string>("English");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const disLang: string[] = ["English", "Arabic"];

    const handleSelect = (language: string) => {
        setLang(language);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            
            <div 
                className="z-10 px-4 flex rounded-full border h-12 bg-black bg-opacity-55 text-white text-lg font-body cursor-pointer appearance-none outline-none items-center justify-between w-40"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img className="text-white" src={globe} alt="globe" width="20" />
                {lang}
                <img className="text-white" src={arrow} alt="arrow" width="20" />
            </div>
            {isOpen && (
                <div className="absolute mt-2 w-20 bg-black text-white rounded-md shadow-lg" style={{ minWidth: '10rem' }}>
                    {disLang.map((txt, index) => (
                        <div 
                            key={index}
                            onClick={() => handleSelect(txt)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                        >
                            {txt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
