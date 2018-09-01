import * as React from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import './RoundDropdown.css';
// tslint:disable-next-line:ordered-imports
import { selectRound } from "../actions/roundActions";
// tslint:disable:no-console

export interface IRounds {
  value: string,
  lable: string,
  id: number
}

class RoundDropdown extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state={
      defaultValue: true,// only for setup default value of Select component 
      selectedState: '', // need for rerender Select component cause I had a problem with updating select input
    }
    // tslint:disable-next-line:no-unused-expression
  }

  public componentDidUpdate() {
    const { rounds } = this.props;
    const { defaultValue } = this.state; 
    // I needed this part of code cause Select Component didnt't set defaultValue if selected is not part of RoundDropdown component state.
    // For some reason Select component didn't rerender if selected Value is only put in redux store. I don't know why.
    if (rounds && defaultValue) {
      this.handleChange(rounds[rounds.length -1])
      this.setState({
        defaultValue: false,
        selectedState: rounds[rounds.length -1],
      })
    }
  }

  // public shouldComponentUpdate(nextProps: any) { 
  //   if(nextProps.selectedRound === this.props.selectedRound) { // if same round is selected don't rerender
  //     return false;
  //   }
  //   return true;
  // }

  public handleChange = (selectedRound: any) => {
    // I needed this part of code cause Select Component didnt't set defaultValue if selected is not part of RoundDropdown component state.
    // For some reason Select component didn't rerender if selected Value is only put in redux store. I don't know why.
    this.setState({ selectedState: selectedRound });
    this.props.selectRound(selectedRound);
  }
  public render() {
    const { rounds, children } = this.props;
    const {selectedState} = this.state
    return (
      <Row className="button-group-wrapper">
      <h4 className="select-round-title">{children}</h4>
        <Select
          className="select-round-field"
          isSearchable={true}
          value={selectedState}
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
