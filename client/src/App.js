import React from 'react';
import Main from './modules/Main';
import { AppContextProvider } from './modules/Main/context/Context';

function App() {
  return (
    <AppContextProvider>
      {' '}
      <Main />
    </AppContextProvider>
  );
}

export default App;
