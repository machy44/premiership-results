import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { Provider } from "react-redux";
import RankTable  from './components/RankTable';
import ResultsList from './components/ResultsList';
import RoundDropdown from './components/RoundDropdown';
import configureStore from "./store/configureStore";

const store: any = configureStore();

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <RoundDropdown/>
            <ResultsList/>
            <RankTable/>
          </Col>
        </Row>
      </Grid>
      </Provider>
    );
  }
}

export default App;
