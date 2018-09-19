// @flow
import React, { Component } from 'react';
import './App.css';
import * as IRC from "irc-framework";
const { getGlobal } = window.require("electron").remote;

const AppContext = React.createContext({
   client: null
});

type Props = { /* */ };
type AppState = {
    client: IRC.IrcClient
}

class App extends Component<Props, AppState> {
    constructor(props : Props) {
        super(props);
        this.state = {
            client: getGlobal('irc_client')
        };
    };
    connectToServer = () => {
        const client = this.state.client;
        if(!client.connected) {
            client.connect({
               host: null,
                port: 6667,
                nick: null
            });

            client.on('registered', () => {
                var chan = client.channel(null);
                chan.join();
                chan.say('Hey! 🍿');
            });
        }
    };
    disconnect = () => {
        const client = this.state.client;
        if(client.connected) {
           console.log(client);
           client.quit('Bye bye!');
        }
    };
  render() {
    return (
        <AppContext.Provider value={this.state}>
      <div className="App">
        <header className="App-header">
            <button onClick={this.connectToServer}>Connect to IRC</button><br />
            <button onClick={this.disconnect}>Disconnect!</button>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

      </div>
        </AppContext.Provider>
    );
  }
}

export default App;
