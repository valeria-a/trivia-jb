import { createContext, useContext, useState } from "react"

const INITIAL_SETTINGS = {
    limit: 5,
    categories: [],
    level: "medium"
}

const SettingsContext = createContext(null)
const SettingsSetterContext = createContext(null)

export const SettingsProvider = ({children}) => {
    const [settings, setSettings] = useState(INITIAL_SETTINGS)

    return(
        <SettingsContext.Provider value={settings}>
            <SettingsSetterContext.Provider value={setSettings}>
                {children}
            </SettingsSetterContext.Provider>
        </SettingsContext.Provider>
    )
}

export const useSettings = () => {
    return useContext(SettingsContext)
}

export const useSettingsSetter = () => {
    return useContext(SettingsSetterContext)
}
