import * as React from "react";
import * as IRC from "irc-framework";
import Icon from "antd/lib/icon";
import Layout from "antd/lib/layout";
import Button from "antd/lib/button";
import "antd/dist/antd.min.css";
import { Mention } from "antd";

const { getGlobal, Menu, MenuItem } = window.require("electron").remote;

const { Sider, Content, Footer } = Layout;

const AppContext = React.createContext({
	client: null
});

type Props = {
	/* */
};
type AppState = {
	client: IRC.IrcClient;
	ircsettings: {
		server: string;
		port: number;
		nick: string;
		channel: string;
	};
	channels: [];
};

class App extends React.Component<Props, AppState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			client: getGlobal("irc_client"),
			ircsettings: getGlobal("irc_settings"),
			channels: getGlobal("irc_channels")
		};
	}
	connectToServer = () => {
		const client = this.state.client;
		const settings = this.state.ircsettings;
		if (!client.connected) {
			client.connect({
				host: settings.server,
				port: settings.port,
				nick: settings.nick
			});

			client.on("registered", () => {
				var chan = client.channel(settings.channel);
				chan.join();
				chan.say("Hey! 🍿");
			});
		}
	};
	disconnect = () => {
		const client = this.state.client;
		if (client.connected) {
			client.quit("Bye bye!");
		}
	};
	logMenu = () => {
		console.log(Menu.getApplicationMenu().items);
	};
	render() {
		return (
			<AppContext.Provider value={this.state}>
				<Layout style={{ minHeight: "100vh" }}>
					<Layout>
						<Sider
							width={200}
							style={{
								background: "#cecece",
								minHeight: "100%",
								padding: "5px"
							}}
						>
							<Button onClick={this.connectToServer} block>
								<Icon type="login" theme="outlined" /> Connect
							</Button>
							<br />
							<Button onClick={this.disconnect} block>
								<Icon type="logout" theme="outlined" />{" "}
								Disconnect
							</Button>
							<br />
							<Button onClick={this.logMenu} block>
								Pewpew
							</Button>
						</Sider>
						<Layout style={{ minHeight: "100%" }}>
							<Content style={{ padding: "5px" }}>
								I'm an IRC client, herp derp!
							</Content>
						</Layout>
					</Layout>
					<Footer style={{ background: "#999999" }}>
						<Content>
							<Mention />
						</Content>
					</Footer>
				</Layout>
			</AppContext.Provider>
		);
	}
}

export default App;

declare global {
	interface Window {
		require: any;
	}
}
