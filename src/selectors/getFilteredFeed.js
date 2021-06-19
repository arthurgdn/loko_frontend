//This function returns the main user feed filtered using three variables
//The searched text {text}, the sorting parameter {sortBy}
// and the distance radius of offer {distanceRadius}

export default (feed, {
  text, sortBy, distanceRadius
})=>{
  return feed.filter((offer) => {
    const textMatch = offer.title.toLowerCase().includes(text.toLowerCase());
    const distanceMatch = offer.distance? offer.distance <= distanceRadius  :true;
    return distanceMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'points') {
      return a.point < b.point ? 1 : -1;
    }
  });
};