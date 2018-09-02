import * as React from 'react';
import { Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { 
  arrangeDataToSelectedRound,
  defineClubsPosition,
  defineClubStatProps,
  defineClubsWithAttrs,
} from '../selectors/rankTableSelectors';
import './RankTable.css'

// blueprint of stats which will be collected for every club
const statAttributes = {
  'position': 0,
  // tslint:disable-next-line:object-literal-sort-keys
  'club name': '',
  'played': 0,
  'w': 0,
  'd': 0,
  'l': 0,
  'gf': 0,
  'ga': 0,
  'gd': 0,
  'points': 0,
  'form': '',
};

// interface ITableHeader {
//   tableHeaders: string[];
// }

const TableHeader: React.SFC<any> = ({tableHeaders}) => {
  return (
    <thead>
      <tr>
        {Object.keys(tableHeaders).map((element, index) => <th key={index} className="text-uppercase">{element}</th>)}      
      </tr>
    </thead>
  )
}

const TableBody: React.SFC<any> = ({ tableData }) => {
  return (
    <tbody>
      { tableData.map((element: any, index: any) => {
          const dataRow: any = Object.keys(element).map((key) => {
            if (key === 'position') {
              return <td key={key}>{index + 1}</td>
            }
            return <td key={key}>{element[key]}</td>;
          })
          return <tr key={index}>{dataRow}</tr>
        })
      }
    </tbody>
  )
}

class RankTable extends React.Component<any, any> {

  // same as in the Rounddropdown component -> don-t rerender if the same round is selected
  public shouldComponentUpdate(nextProps: any) {
    if(this.props.selected && this.props.selected.id === nextProps.selected.id) {
      return false;
    }
    return true;
  }

  public render() {
    const { clubs, children } = this.props;
    return (
      <Row>
        <h4 className="table-title">{children}</h4>
        <Table responsive={true} hover={true}>
          <TableHeader
            tableHeaders={statAttributes}
          />
          {clubs && clubs.length
            ? <TableBody
              tableData={clubs} />
            : <TableBody
              tableData={[]}
            />
          }
        </Table>
      </Row>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { data, selected } = state;
  // on first render there is no data
  if (!data.length){ return {} };
  const dataToSelectedRound = arrangeDataToSelectedRound(data, selected.id);
  const clubs: any = defineClubsWithAttrs(data, statAttributes);
  defineClubStatProps(dataToSelectedRound, clubs);
  defineClubsPosition(clubs);
  return {
    clubs,
    selected,
  }
}

export default connect(mapStateToProps, null)(RankTable);
