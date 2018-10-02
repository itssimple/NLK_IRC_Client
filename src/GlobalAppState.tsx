import * as IRC from "irc-framework";
import * as React from "react";

export interface GlobalAppState {
    client: IRC.IrcClient;
    ircsettings: {
        server: string;
        port: number;
        nick: string;
        channel: string;
    };
    channels: IRC.IrcChannel[];
    date: any;
}

const AppContext = React.createContext<GlobalAppState | null>(null);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
