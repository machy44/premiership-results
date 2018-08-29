import * as React from 'react';
import { Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import './RankTable.css'

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
};

// interface ITableHeader {
//   tableHeaders: string[];
// }

const TableHeader: React.SFC<any> = ({tableHeaders}) => {
  return (
    <thead>
      <tr>
        {Object.keys(tableHeaders).map((element, index) => <th key={index}>{element}</th>)}      
      </tr>
    </thead>
  )
}

const TableBody: React.SFC<any> = ({ tableData }) => {
  return (
    <tbody>
      {
        tableData.map((element: any, index: any) => {
          const dataRow: any = Object.keys(element).map((key) => {
            return <td key={key}>{element[key]}</td>;
          })
          return <tr key={index}>{dataRow}</tr>
        }
        )
      }
    </tbody>
  )
}

const RankTable: React.SFC<any> = ({clubs, children}) => {
  return (
    <Row className="table-wrapper">
    <h4 className="table-title">{children}</h4>
      <Table responsive={true} hover={true}>
        <TableHeader 
          tableHeaders={statAttributes}
        />
        { clubs && clubs.length
          ? <TableBody
              tableData = {clubs}/>
          : <TableBody
              tableData = {[]}
            /> 
        }
      </Table>
    </Row>
  )
}

const defineClubsAndAttrs = (data: any) => {
  const clubs: any = []
  data[0].matches.forEach((element: any) => {
    for(const key in element) {
      if (element.hasOwnProperty(key)) {
        // all attributes where data gonna be kept
        clubs.push({...statAttributes, 'club name': key});
      }
    }
  });
  return clubs;
}

// const defineClubStatProps = (clubs: any) => {
//   return clubs.map(element => {
//     return element { 'jure': 'boban'}
//   })
// }

// export default RankTable;
// selected selected = {value: "Round 6", label: "Round 6", id: 6}
// const defineClubsStats = (data: any, selected: any) => {
//   // tslint:disable-next-line:no-console
//   // tslint:disable-next-line:prefer-const
//   // let clubsStats: any=[];
//   for(let i=0; i < selected.id; i++) {
//     // tslint:disable-next-line:no-console
//     console.log('matches', data[i].matches.forEach((element: any) => {
//       // tslint:disable-next-line:no-console
//       console.log('element in forEach', element);
//       for (const key in element) {
//         if (element.hasOwnProperty(key)) {
//             // do stuff
//           // tslint:disable-next-line:no-console
//           console.log('element', element);
//           // tslint:disable-next-line:no-console
//           console.log('key', key);
//           // tslint:disable-next-line:no-console
//           console.log('element[key]', element[key]);
//         }
//     }
     
//     }));
//     // tslint:disable-next-line:no-console
//     // console.log('matches Object keys', Object.keys(data[i].matches));
//   }
//   // tslint:disable-next-line:no-console
//   console.log('selected defineClubsStats', selected);
//   return data;
// }

const mapStateToProps =(state: any) => {
  // const { data, selected } = state;
  const { data } = state;
  if (!data.length){ return {} };
  const clubs: any = defineClubsAndAttrs(data);
  // computing data
  // const clubsWithStatProps: any = defineClubStatProps(clubs);
  // tslint:disable-next-line:no-console
  console.log('clubs', clubs);
  // const clubsStats: any = defineClubsStats(data, selected);
  return { 
    // clubsStats
    clubs
  }
}

export default connect(mapStateToProps, null)(RankTable);
