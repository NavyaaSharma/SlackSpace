import React from 'react';
import {Segment, Input, Header, Icon} from 'semantic-ui-react';

const MessageHeader=()=>{
    return (<Segment clearing>
        <Header floated="left" fluid="true" as="h2">
            <span>
                Channel
            </span>
            <Header.Subheader> 30 users</Header.Subheader>
        </Header>
        <Header floated="right">
            <Input
                name="search"
                icon="search"
                placeholder="Search Messages"
                size="mini"
                
            />
        </Header>
    </Segment>)
    
}
export default MessageHeader;