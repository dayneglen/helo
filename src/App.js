import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import './reset.css';
import './App.css';

class App extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div className="App">
        { pathname === '/' 
        ? null
          : <Nav />
          }
        {routes}
      </div>
    );
  }
  
}

export default withRouter(App);
