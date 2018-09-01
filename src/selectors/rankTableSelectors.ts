/* tslint:disable:no-string-literal */
export const defineClubsWithAttrs = (data: any, statAttributes: any) => {
  const clubs: any = []
  data[0].matches.forEach((element: any) => {
    for (const key in element) {
      if (element.hasOwnProperty(key)) {
        // all attributes where stats gonna be kept
        clubs.push({ ...statAttributes, 'club name': key });
      }
    }
  });
  return clubs;
}

export const arrangeDataToSelectedRound = (data: any, id: any) => {
  return data.filter((element: any) => element.round <= id);
}

export const defineClubsPosition = (clubs: any) => {
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

const defineStats = (firstTeam: any, secondTeam: any, clubs: any) => {
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

  // if there
  const removefirstCharacter = (teamForm: any) => {
    return teamForm.substr(1);
  }

  if(firstTeamAttr[0]['form'].length === 5) {
    firstTeamAttr[0]['form'] = removefirstCharacter(firstTeamAttr[0]['form']);
  }
  if(secondTeamAttr[0]['form'].length === 5) {
    secondTeamAttr[0]['form'] = removefirstCharacter(secondTeamAttr[0]['form']);
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

export const defineClubStatProps = (data: any, clubs: any) => {
  data.map((roundObject: any) => {
    roundObject.matches.map((element: any) => {
      // this is an arrays in which will be stored name of the club and number of goals for comparison
      const firstTeam: any = [];
      const secondTeam: any = [];
      let count = 0;
      Object.keys(element).map(key => {
        if (count === 0) {
          firstTeam.push(key, element[key]);
          count += 1;
        } else {
          secondTeam.push(key, element[key]);
        }
      })
      defineStats(firstTeam, secondTeam, clubs);
    })
  })
}