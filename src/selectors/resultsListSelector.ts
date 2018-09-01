export const defineResultsList = (data: any, selected: any) => {
  const roundResults = data.filter((rounds: any) => {
    return rounds.round === selected.id;
  })

  return roundResults[0];
}