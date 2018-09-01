export const defineRounds = (data: any) => {
  if (data.length) {
    return data.map((element: any, index: any) => {
      const round = `Round ${element.round}`;
      return { value: round, label: round, id: index + 1 }
    });
  }
}