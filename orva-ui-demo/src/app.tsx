import React, { PropsWithChildren } from 'react';
import 'orva-ui/dist/style.css';
import './app.scss';

const App: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default App;
