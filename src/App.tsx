import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
// import { connect } from 'react-redux';
import RankTable from './components/RankTable';
import ResultsList from './components/ResultsList';
import RoundDropdown from './components/RoundDropdown';




// export interface IDropdownProps {
//   rounds: string[]
// }

// export interface IRounds {
//   value: string,
//   lable: string,
//   id: number
// }

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      lastRound: false,
    };
  }

  public componentDidMount () {
    this.setState({
      lastRound: true,
    })
  }
  // tslint:disable-next-line:member-ordering
  // public static getDerivedStateFromProps(nextProps: any, prevState: any) {
  //   if(!prevState.lastRound) { 
  //     return { selectedRound: nextProps.rounds[nextProps.rounds.length - 1], lastRound: true } 
  //   }
  //   return null;
  // }

 

  public render() {
    // const { selectedRound } = this.state;
    // const { rounds, selectedRound } = this.props;
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <RoundDropdown
              // handleChange = {this.handleChange}
              // selectedRound = {selectedRound}
              // rounds = {rounds}
              // lastRound
            />
            <ResultsList>
              Round results
            </ResultsList>
            <RankTable>
              Premier League Table
            </RankTable>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
