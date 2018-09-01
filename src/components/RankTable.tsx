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
  'form': ''
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
      {
        tableData.map((element: any, index: any) => {
          const dataRow: any = Object.keys(element).map((key) => {
            if(key === 'position') {
              return <td key={key}>{index + 1}</td>
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
  debugger;
  return clubs;
}

const definePosition = (clubs: any) => {
  return clubs.sort((a: any, b: any) => {
    if (a['points'] > b['points']) {
      return -1;
    }
    else if (b['points'] > a['points']) {
      return 1;
    } 
    else if (a['gd'] > b['gd']) {
        return - 1
      } 
    else if (b['gd'] > a['gd']) {
        return 1;
    } 
    else if (a['gf'] > b['gf']) {
        return - 1
    } 
    else if (b['gf'] > a['gf']) {
      return 1
    } 
    else {
      return 0;        
    }
  })
}

const defineStat = (firstTeam: any, secondTeam: any, clubs: any) => {
   const firstTeamAttr = clubs.filter((object: any) => { // ovo bi mogo u zasebnu funkciju
    return object['club name'] === firstTeam[0];
  })

  const secondTeamAttr = clubs.filter((object: any) => { // ovo bi mogo u zasebnu funkciju
    return object['club name'] === secondTeam[0];
  })

  // neutral stats
  firstTeamAttr[0]['played'] += 1;
  firstTeamAttr[0]['gf'] += firstTeam[1];
  firstTeamAttr[0]['ga'] += secondTeam[1];
  firstTeamAttr[0]['gd'] = firstTeamAttr[0]['gf'] - firstTeamAttr[0]['ga'];

  secondTeamAttr[0]['played'] += 1;
  secondTeamAttr[0]['gf'] += secondTeam[1];
  secondTeamAttr[0]['ga'] += firstTeam[1];
  secondTeamAttr[0]['gd'] = secondTeamAttr[0]['gf'] - secondTeamAttr[0]['ga'];

  const removefirstCharacter = (teamForm: any) => {
    return teamForm.substr(1);
  }

  if(firstTeamAttr[0]['form'].length === 5) {
    firstTeamAttr[0]['form'] = removefirstCharacter(firstTeamAttr[0]['form'])
  }
  if(secondTeamAttr[0]['form'].length === 5) {
    secondTeamAttr[0]['form'] = removefirstCharacter(secondTeamAttr[0]['form'])
  }

  if(firstTeam[1] > secondTeam[1]) {
    firstTeamAttr[0]['w'] += 1;
    secondTeamAttr[0]['l'] += 1;
    // form
    firstTeamAttr[0]['form'] += 'w';
    secondTeamAttr[0]['form'] += 'l';
    // points
    firstTeamAttr[0]['points'] += 3;
  } else if (secondTeam[1] > firstTeam[1]) {
    secondTeamAttr[0]['w'] += 1;
    firstTeamAttr[0]['l'] += 1;
    // form
    secondTeamAttr[0]['form'] +='w';
    firstTeamAttr[0]['form'] += 'l';
    // points
    secondTeamAttr[0]['points'] += 3;
  } else {
    secondTeamAttr[0]['d'] += 1;
    firstTeamAttr[0]['d'] += 1;
    // form
    secondTeamAttr[0]['form'] +='d';
    firstTeamAttr[0]['form'] += 'd';
    // points
    firstTeamAttr[0]['points'] += 1;
    secondTeamAttr[0]['points'] += 1;
  }
}
 // compare two arrays and give them values which u want

const defineClubStatProps = (data: any, clubs: any) => {
  data.map((roundObject: any) => {
    roundObject.matches.map((element: any) => {
      // from object give me all data needed
      const firstTeam: any = []; // this is an array in which i will store name of the club and number of goals
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
