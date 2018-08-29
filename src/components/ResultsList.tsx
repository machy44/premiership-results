import * as React from 'react';
import { ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import './ResultsList.css'

const resultDisplay = (result: any) => {
  // return Object.keys(result);
  const prettyDisplay: any = [];
  let count: any = 1;
  for (const key in result) {
    if (result.hasOwnProperty(key)) {
      // tslint:disable-next-line:no-console
      if (count === 1) {
        prettyDisplay.push(
          <span key={key}>
            <span>{key}</span>
            <span style={{ paddingLeft: 10 }}>{result[key]}</span>
            &#45;
          </span>);
        count += 1;
      }
      else {
        prettyDisplay.push(
          <span key={key}>
            <span>{result[key]}</span>
            <span style={{ paddingLeft: 10 }}>{key}</span>
          </span>);
      }
    }
  }
  return prettyDisplay;
}

const ResultsList: React.SFC<any> = ({ roundResults, children }) => {
  // tslint:disable-next-line:no-console
  // console.log('roundResults', roundResults);
  return (
    <Row >
      <h4 className="result-list-title">{children}</h4>
      <ListGroup className="list-group-wrapper" style={{ textAlign: 'center' }}>
        {roundResults
          ? roundResults.matches.map((element: any, index: any) => {
            // tslint:disable-next-line:no-console
            // console.log('ListGroupItem element', element);
            return <ListGroupItem key={index}>{resultDisplay(element)}</ListGroupItem>
          })
          : null
        }
      </ListGroup>
    </Row>
  )
};

const defineResultsList = (data: any, selected: any) => {
  const roundResults = data.filter((rounds: any) => {
    return rounds.round === selected.id;
  })

  return roundResults[0];
}

const mapStateToProps = (state: any) => {
  const { data, selected } = state;
  const roundResults: any = defineResultsList(data, selected);
  return {
    roundResults
  }
}

export default connect(mapStateToProps, null)(ResultsList);