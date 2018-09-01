import * as React from 'react';
import { ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { defineResultsList} from '../selectors/resultsListSelector';
import './ResultsList.css'

const resultDisplay = (match: any) => {
  // return Object.keys(result);
  const teams: any = [];
  const result: any = [];
  for (const key in match) {
    if (match.hasOwnProperty(key)) {
      // tslint:disable-next-line:no-console
        teams.push(<span>{key}</span>);
        result.push(<span>{match[key]}</span>);
    }
  }
  return (<div>
            <span style={{ display: "inline-block", width: '40%', textAlign: "right", marginLeft: 10 }}>{teams[0]}</span>
              <span style={{ display: "inline-block", width: '10%' }}>{result[0]}<span style={{padding: '0 10%'}}>&#45;</span>{result[1]}</span>
              <span style={{ display: "inline-block", width: '40%', textAlign: "left", marginRight: 10 }}>{teams[1]}</span>
          </div>)
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

const mapStateToProps = (state: any) => {
  const { data, selected } = state;
  const roundResults: any = defineResultsList(data, selected);
  return {
    roundResults
  }
}

export default connect(mapStateToProps, null)(ResultsList);