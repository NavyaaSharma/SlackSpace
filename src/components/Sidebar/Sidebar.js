import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserInfo from "./UserInfo/UserInfo";
import Channels from "./Channels/Channels";

import "./Sidebar.css";

export const Sidebar = () => {
    return (<Menu vertical fixed="left" borderless size="large" className="side_bar" icon='labeled' vertical inverted>
        <UserInfo />
        <Channels />
    </Menu>
    )
}