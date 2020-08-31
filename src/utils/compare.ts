export const cardStrToValue = (card: string): number => {
  switch (card) {
    case "JACK":
      return 11;
    case "QUEEN":
      return 12;
    case "KING":
      return 13;
    case "ACE":
      return 1;
    default:
      return parseInt(card);
  }
};
export const cardCompare = (a: string, b: string): number => {
  const aValue = cardStrToValue(a);
  const bValue = cardStrToValue(b);
  if (aValue > bValue) {
    return 1;
  } else if (aValue === bValue) {
    return 0;
  } else {
    return -1;
  }
};
