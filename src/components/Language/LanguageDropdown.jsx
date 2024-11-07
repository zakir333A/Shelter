import React, { useEffect, useState, useContext } from 'react';
import './LanguageDropdown.css';
import { MainContext } from "../Context";

const locales = ["az-AZ", "ru-RU", "en-GB"]; 

function getFlagSrc(countryCode) {
    return /^[A-Z]{2}$/.test(countryCode)
        ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
        : "";
}

const LanguageDropdown = () => {
    const { lang, setLang } = useContext(MainContext); 
    const [selectedLocale, setSelectedLocale] = useState(locales[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [availableLocales, setAvailableLocales] = useState([]);

    useEffect(() => {
      
        const storedLang = localStorage.getItem('selectedLang');
        if (storedLang) {
            setSelectedLocale(storedLang);
            setLang(storedLang);
        } else {
            
            const browserLang = new Intl.Locale(navigator.language).language;
            for (const locale of locales) {
                const localeLang = new Intl.Locale(locale).language;
                if (localeLang === browserLang) {
                    setSelectedLocale(locale);
                    setLang(locale);
                    localStorage.setItem('selectedLang', locale); 
                    break;
                }
            }
        }
    }, [setLang]);

    useEffect(() => {
        updateAvailableLocales(selectedLocale);

        if (selectedLocale.slice(0, 2) !== lang) {
            setLang(selectedLocale.slice(0, 2));
        }
    }, [selectedLocale, lang, setLang]);

    const updateAvailableLocales = (locale) => {
        const intlLocale = new Intl.Locale(locale);
        const langName = new Intl.DisplayNames([locale], {
            type: "language",
        }).of(intlLocale.language);

        const otherLocales = locales.filter((loc) => loc !== locale);
        const localeList = otherLocales.map((otherLocale) => {
            const otherIntlLocale = new Intl.Locale(otherLocale);
            const otherLangName = new Intl.DisplayNames([otherLocale], {
                type: "language",
            }).of(otherIntlLocale.language);

            return {
                value: otherLocale,
                name: otherLangName,
                flag: getFlagSrc(otherIntlLocale.region),
            };
        });
        setAvailableLocales(localeList);
    };

    const handleLocaleChange = (locale) => {
        setSelectedLocale(locale);
        setLang(locale); 
        localStorage.setItem('selectedLang', locale); 
        updateAvailableLocales(locale);
        setDropdownOpen(false);
    };

    const intlLocale = new Intl.Locale(selectedLocale);
    const langName = new Intl.DisplayNames([selectedLocale], {
        type: "language",
    }).of(intlLocale.language);

    return (
        <div className="dropdown" tabIndex="0">
            <button
                id="dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <img src={getFlagSrc(intlLocale.region)} alt="" />
                {langName}
                <span className="arrow-down"></span>
            </button>
            {dropdownOpen && (
                <ul className="dropdown-content" id="dropdown-content">
                    {availableLocales.map((locale) => (
                        <li key={locale.value} onMouseDown={() => handleLocaleChange(locale.value)}>
                            {locale.name}
                            <img src={locale.flag} alt={locale.name} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageDropdown;
