export const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

export const transformData = obj => {
  const postCode = obj['post code'];
  const stateAbbreviation = obj.places[0]['state abbreviation'];
  const placeName = obj.places[0]['place name'];

  return {
    postCode,
    stateAbbreviation,
    placeName
  }
}