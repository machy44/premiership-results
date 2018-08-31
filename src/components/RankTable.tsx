import * as React from 'react';
import { Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import './RankTable.css'
// tslint:disable:no-console
// tslint:disable:no-debugger
/* tslint:disable:no-string-literal */
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
  // 'form'
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
            if(key === 'position') {
              return <td key={key}><span>{index + 1}&#183;</span></td>
            }
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

const definePosition = (clubs: any) => {
  return clubs.sort((a: any, b: any) => {
    if (a['points'] > b['points']) {
      return -1;
    }
    else if (b['points'] > a['points']) {
      return 1;
    } else { // same points
      if (a['gd'] > b['gd']) {
        return - 1
      } else if (b['gd'] > a['gd']) {
        return 1;
      } else {
        if (a['gf'] > b['gf']) {
          return - 1
        } if (b['gf'] > a['gf']) {
          return 1
        } else {
          return 0;
        }
      }
    }
  })
}

const defineStat = (firstTeam: any, secondTeam: any, clubs: any) => {
  // console.log('firstTeam', firstTeam);
  // console.log('secondTeam', secondTeam);
  // const [ firstTeamAttr, secondTeamAttr ] = clubs.filter((object: any) => { // ovo bi mogo u zasebnu funkciju
  //   return Object.keys(object).map(key => {
  //     return object[key] === firstTeam[0] || object[key] === secondTeam[0]
  //   })
  // });
   const firstTeamAttr = clubs.filter((object: any) => { // ovo bi mogo u zasebnu funkciju
    return object['club name'] === firstTeam[0];
  })

  const secondTeamAttr = clubs.filter((object: any) => { // ovo bi mogo u zasebnu funkciju
    return object['club name'] === secondTeam[0];
  })

  // give me points
  firstTeamAttr[0]['played'] += 1;
  firstTeamAttr[0]['gf'] += firstTeam[1];
  firstTeamAttr[0]['ga'] += secondTeam[1];
  firstTeamAttr[0]['gd'] = firstTeamAttr[0]['gf'] - firstTeamAttr[0]['ga'];

  secondTeamAttr[0]['played'] += 1;
  secondTeamAttr[0]['gf'] += secondTeam[1];
  secondTeamAttr[0]['ga'] += firstTeam[1];
  secondTeamAttr[0]['gd'] = secondTeamAttr[0]['gf'] - secondTeamAttr[0]['ga'];

  if(firstTeam[1] > secondTeam[1]) {
    firstTeamAttr[0]['w'] += 1;
    secondTeamAttr[0]['l'] += 1;
    // points
    firstTeamAttr[0]['points'] += 3;
  } else if (secondTeam[1] > firstTeam[1]) {
    secondTeamAttr[0]['w'] += 1;
    firstTeamAttr[0]['l'] += 1;
    // points
    secondTeamAttr[0]['points'] += 3;
  } else {
    secondTeamAttr[0]['d'] += 1;
    firstTeamAttr[0]['d'] += 1;

    firstTeamAttr[0]['points'] += 1;
    secondTeamAttr[0]['points'] += 1;
  }
  // console.log('firstTeamAttr', firstTeamAttr);
  // console.log('secondTeamAttr', secondTeamAttr);
}
 // compare two arrays and give them values which u want

const defineClubStatProps = (data: any, clubs: any) => {
  data.map((roundObject: any) => {
    roundObject.matches.map((element: any) => {
      console.log('element', element)
      // from object give me all data needed
      const firstTeam: any = []; // ovo je array di cu imat ime tima i broj golova
      const secondTeam: any = []
      let count = 0;
      Object.keys(element).map(key => {
        if(count === 0) {
          firstTeam.push(key, element[key]);
          count += 1;
        } else {
          secondTeam.push(key, element[key]);
        }
      })
      defineStat(firstTeam, secondTeam, clubs)
    }
    )
  })
}

const arrangeDataToSelectedRound = (data: any, id: any) => {
  return data.filter((element: any) => element.round <= id);
}

const mapStateToProps = (state: any) => {
  const { data, selected } = state;
  if (!data.length){ return {} };
  const clubs: any = defineClubsAndAttrs(data);
  const dataToSelectedRound = arrangeDataToSelectedRound(data, selected.id)
  defineClubStatProps(dataToSelectedRound, clubs);
  definePosition(clubs);
  return { 
    clubs
  }
}

export default connect(mapStateToProps, null)(RankTable);
