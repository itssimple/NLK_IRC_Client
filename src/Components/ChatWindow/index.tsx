import * as React from "react";
import { GlobalAppState, AppContextConsumer } from "../../GlobalAppState";
type Props = {
	/* */
};

export class ChatWindow extends React.Component<Props, GlobalAppState> {
	constructor(props: Props) {
		super(props);
		this.onChatStreamReceived = this.onChatStreamReceived.bind(this);
	}

	onChatStreamReceived(x) {}

	render() {
		return (
			<div className={"chatWindow"}>
				<AppContextConsumer>
					{context =>
						context && <div>{context.ircsettings.channel}</div>
					}
				</AppContextConsumer>
			</div>
		);
	}
}
