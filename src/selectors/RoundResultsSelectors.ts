export const giveRoundsTillSelected = (data: any, selected: any) => {
  const roundsTillSelected = data.filter((rounds: any) => {
    return rounds.round === selected.id;
  })

  return roundsTillSelected[0];
}