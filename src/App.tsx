import * as React from "react";
import {
	GlobalAppState,
	AppContextProvider,
	AppContextConsumer
} from "./GlobalAppState";
import * as IRC from "irc-framework";
import { ChatWindow } from "./Components/ChatWindow";
import "antd/dist/antd.min.css";
import { Mention, Icon, Layout, Button } from "antd";
import { hot } from "react-hot-loader";

const electron = window.require("electron");

const { getGlobal, Menu, MenuItem } = electron.remote;
const { Header, Sider, Content, Footer } = Layout;

type Props = {
	/* */
};

function Clock(props) {
	return <div>{props.date.toString()}</div>;
}

function RenderChannelMenu(props) {
	return props.channels.map(chan => (
		<Button key={chan.name.replace("#", "")} block>
			{chan.name}
		</Button>
	));
}

class App extends React.Component<Props, GlobalAppState> {
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
				let chan = client.channel(settings.channel);
				this.setState((state, props) => {
					state.channels.push(chan);
					return {
						channels: state.channels
					};
				});
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
		console.log(this.state.channels);
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			client: getGlobal("irc_client"),
			ircsettings: getGlobal("irc_settings"),
			channels: getGlobal("irc_channels"),
			date: new Date()
		};
	}

	render() {
		return (
			<AppContextProvider value={this.state}>
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
							<br />
							<br />
							<RenderChannelMenu channels={this.state.channels} />
							<Clock date={this.state.date} />
						</Sider>
						<Layout style={{ minHeight: "100%" }}>
							<Header
								style={{
									background: "#dedede",
									padding: "5px",
									lineHeight: "unset",
									height: "unset"
								}}
							>
								For topics and shit
							</Header>
							<Content style={{ padding: "5px" }}>
								<ChatWindow />
							</Content>
							<Footer
								style={{
									background: "#dedede",
									padding: "5px"
								}}
							>
								<Content>
									<Mention />
								</Content>
							</Footer>
						</Layout>
						<Sider
							width={200}
							style={{
								background: "#cecece",
								minHeight: "100%",
								padding: "5px"
							}}
						>
							Users lol
						</Sider>
					</Layout>
				</Layout>
			</AppContextProvider>
		);
	}
}

export default hot(module)(App);

declare global {
	interface Window {
		require: any;
	}
}
