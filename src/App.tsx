import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { loadData } from "./actions/dataActions";
import RankTable  from './components/RankTable';
import ResultsList from './components/ResultsList';
import RoundDropdown from './components/RoundDropdown';

import configureStore from "./store/configureStore";

const store = configureStore();


store.dispatch(loadData());

class App extends React.Component {
  public render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <RoundDropdown/>
            <ResultsList/>
            <RankTable/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
