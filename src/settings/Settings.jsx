import { Button, FormControl, InputLabel, MenuItem, Select, Slider, Stack } from "@mui/material";
import { useSettings, useSettingsSetter } from "../context/settingsContext";
import { useState } from "react";
import { Widgets } from "@mui/icons-material";
const Settings = () => {

    const settings = useSettings()
    const setSettings = useSettingsSetter()

    const [tempLevel, setTempLevel] = useState(settings.level)
    const [tempLimit, setTempLimit] = useState(settings.limit)

    const handleSave = () => {
        setSettings({
            ...settings,
            level: tempLevel,
            limit: tempLimit
        })
    }

    const handleCancel = () => {
        setTempLevel(settings.level)
        setTempLimit(settings.limit)
    }

    return(
        <>
            <h3>Settings</h3>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tempLevel}
                label="Level"
                onChange={(e) => setTempLevel(e.target.value)}
                >
                <MenuItem value={'easy'}>Easy</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'hard'}>Hard</MenuItem>
                </Select>



            </FormControl>

            <FormControl>

            <InputLabel>{tempLimit}</InputLabel>
                <Slider min={5} max={50} value={tempLimit}
                    onChange={(e) => setTempLimit(e.target.value)}/>
            </FormControl>

            <Stack direction='row' 
                    spacing={'1em'} 
                    justifyContent={'end'} 
                    mt={'1em'}>
                    <Button variant='contained' onClick={handleSave}>SAVE</Button>
                    <Button variant='contained' onClick={handleCancel}>CANCEL</Button>
                </Stack>
        </>
    )
}

export default Settings;