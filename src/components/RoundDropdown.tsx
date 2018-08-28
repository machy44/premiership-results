import * as React from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import './RoundDropdown.css';
// tslint:disable-next-line:ordered-imports
import { selectRound } from "../actions/roundActions";

export interface IRounds {
  value: string,
  lable: string,
  id: number
}

class RoundDropdown extends React.Component<any, any> {

  public handleChange = (selectedRound: any) => {
    // this.setState({ selectedRound });
    this.props.selectRound(selectedRound);
  }
  public render() {
    const { rounds, selectedRound } = this.props;
    return (
      <Row className="button-group-wrapper">
        <Select
          className="select-round-field"
          isSearchable={true}
          value={selectedRound}
          onChange={this.handleChange}
          options={rounds}
        />
      </Row>
    )
  }
}

const defineRounds = (data: any) => {
  if (data.length) {
    return data.map((element: any, index: any) => {
      const round = `Round ${element.round}`;
      return { value: round, label: round, id: index + 1 }
    });
  }
}

const mapStateToProps = (state: any) => {
  const { data, selectedRound } = state;
  const rounds: any = defineRounds(data);
  return { rounds, selectedRound };
}

const mapDisptachToProps = (dispatch: any) => {
  return{
    selectRound: (selectedRound: any) => { dispatch(selectRound(selectedRound)) }
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(RoundDropdown);
