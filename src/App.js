import React, { Component } from 'react';
import { WardrobeCatalogue } from './components/WardrobeCatalogue';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <WardrobeCatalogue />
            </div>
        );
    }
}

export default App;
