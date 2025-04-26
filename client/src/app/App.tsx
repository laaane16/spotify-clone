import { FC } from 'react';
import './styles/index.scss';
import Router from './provider/router/ui/Router';

const App: FC = () => (
  <div className="app appDarkTheme">
    <Router />
  </div>
);

export default App;
