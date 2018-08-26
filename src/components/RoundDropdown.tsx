import * as React from 'react';
import { ButtonGroup, DropdownButton, MenuItem, Row } from 'react-bootstrap';
import './RoundDropdown.css';

const RoundDropdown: React.SFC<{}> = () => {
  return (
    <Row className="button-group-wrapper">
      <ButtonGroup justified={true} style={{ width: "25%" }}>
        <DropdownButton
          bsStyle={'primary'}
          title={'round'}
          key={'round'}
          id={`dropdown-basic`}>
        <MenuItem eventKey="1">Action</MenuItem>
        {/* <MenuItem eventKey="2">Another action</MenuItem> */}
        {/* <MenuItem eventKey="3">Active Item</MenuItem> */}
      </DropdownButton>
    </ButtonGroup>
  </Row>
  )
}

export default RoundDropdown;