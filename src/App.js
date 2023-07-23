import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import { GAMES_INITIAL_STATE, GamesContext, GamesDispatchContext, gamesReducer } from './context/gamesContext';
import { useReducer } from 'react';
import { Stack } from '@mui/material';
import { SettingsProvider } from './context/settingsContext';

function App() {

  const [games, gamesDispatch] = useReducer(gamesReducer, GAMES_INITIAL_STATE)

  return(
    <>
      <Header />
      <GamesContext.Provider value={games}>
        <GamesDispatchContext.Provider value={gamesDispatch}>
          <SettingsProvider>
            <Stack direction={'column'} m={'auto'} maxWidth={'30em'}>
              <Outlet />
            </Stack>
          </SettingsProvider>
        </GamesDispatchContext.Provider>
      </GamesContext.Provider>
    </>
  )
}

export default App;
