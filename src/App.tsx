import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
// import { connect } from 'react-redux';
import RankTable from './components/RankTable';
import ResultsList from './components/ResultsList';
import RoundDropdown from './components/RoundDropdown';

const App: React.SFC<any> = () => (
  <Grid>
    <Row className="show-grid">
      <Col xs={12} md={12}>
        <RoundDropdown>
          Filter By Round
        </RoundDropdown>
        <ResultsList>
          Round Results
        </ResultsList>
        <RankTable>
          Premier League Table
        </RankTable>
      </Col>
    </Row>
  </Grid>
);

export default App;
