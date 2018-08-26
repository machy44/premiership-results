import * as React from 'react';
import { Row, Table } from 'react-bootstrap';

const headValues = ['Position', 'Club Name', 'Played', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Points'];

interface ITableHeader {
  headValues: string[];
}

const TableHeader: React.SFC<ITableHeader> = (props) => {
  return (
    <thead>
      <tr>
        {props.headValues.map((element, index) => <th key={index}>{element}</th>)}      
      </tr>
    </thead>
  )
}

const TableBody: React.SFC<{}> = () => {
  return (
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
    </tbody>
  )
}

const RankTable: React.SFC<{}> = () => {
  return (
    <Row className="table-wrapper">
      <Table responsive={true}>
        <TableHeader headValues={headValues}/>
        <TableBody/>
      </Table>
    </Row>
  )
}

export default RankTable;
