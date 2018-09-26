import * as React from "react";
import * as IRC from "irc-framework";
import { ChatWindow } from './Components/ChatWindow';
import "antd/dist/antd.min.css";
import { Mention, Icon, Layout, Button } from "antd";

const { getGlobal, Menu, MenuItem } = window.require("electron").remote;

const { Header, Sider, Content, Footer } = Layout;

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

	constructor(props: Props) {
		super(props);
		this.state = {
			client: getGlobal("irc_client"),
			ircsettings: getGlobal("irc_settings"),
			channels: getGlobal("irc_channels")
		};
	}

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
								<Icon type="logout" theme="outlined" /> Disconnect
							</Button>
							<br />
							<Button onClick={this.logMenu} block>
								Pewpew
							</Button>
						</Sider>
						<Layout style={{ minHeight: "100%" }}>
							<Header style={{background: "#dedede", padding: "5px", lineHeight: "unset", height: "unset"}}>For topics and shit</Header>
							<Content style={{ padding: "5px" }}>
                                <ChatWindow />
								I'm an IRC client, herp derp!
							</Content>
                            <Footer style={{ background: "#dedede", padding: "5px" }}>
                                <Content>
                                    <Mention />
                                </Content>
                            </Footer>
						</Layout>
						<Sider width={200} style={{background: "#cecece", minHeight: "100%", padding: "5px"}}>
							Users lol
						</Sider>

					</Layout>

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
