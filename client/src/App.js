import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Details from './components/Details';
import Create from './components/Create';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component= {LandingPage} />
        <Route exact path='/home' component= {Home} />
        <Route path= '/home/' component={Details}/>
        <Route path='/create' component={Create} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
