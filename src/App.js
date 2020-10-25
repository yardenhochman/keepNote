import './App.css';
import { RecoilRoot } from 'recoil';
import { StylesProvider } from '@material-ui/core/styles';
import MainPage from './pages'

function App() {
  return (
    <StylesProvider injectFirst>
      <RecoilRoot>
      <MainPage />
      </RecoilRoot>
    </StylesProvider>
  );
}

export default App;







