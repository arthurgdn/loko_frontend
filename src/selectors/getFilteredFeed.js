export default (feed,{text,sortBy,distanceRadius})=>{
    return feed.filter((offer) => {
        const textMatch = offer.title.toLowerCase().includes(text.toLowerCase());
        const distanceMatch = offer.distance <= distanceRadius
        return distanceMatch && textMatch;
      }).sort((a, b) => {
        if (sortBy === 'date') {
          return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'points') {
          return a.point < b.point ? 1 : -1;
        }
      });
}