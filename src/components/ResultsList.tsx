import * as React from 'react';
import { ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import './ResultsList.css'

const ResultsList: React.SFC<{}> = () => {
  return (
    <Row >
      <ListGroup className="list-group-wrapper">
        <ListGroupItem>Item 1</ListGroupItem>
        <ListGroupItem>Item 2</ListGroupItem>
        <ListGroupItem>...</ListGroupItem>
      </ListGroup>
    </Row>
  )
};

export default ResultsList;