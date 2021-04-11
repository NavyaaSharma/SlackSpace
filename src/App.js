import logo from './logo.svg';
import './App.css';
import {Sidebar} from './components/Sidebar/Sidebar'
import Message from './/components/Message/Message'
import { Grid } from 'semantic-ui-react';

function App() {
  return (
    <Grid columns="equal">
      <Sidebar />
      <Grid.Column className="messagepanel">
        <Message />
      </Grid.Column>

      <Grid.Column width={3}>
        <span>

        </span>
      </Grid.Column>
    </Grid>
  );
}

export default App;
