export default (feed,{text,sortBy,distanceRadius})=>{
    return feed.filter((offer) => {
        const textMatch = offer.title.toLowerCase().includes(text.toLowerCase());
        console.log(offer.title,offer.distance)
        const distanceMatch = offer.distance?( offer.distance <= distanceRadius ) :(true) 
        return distanceMatch && textMatch;
      }).sort((a, b) => {
        if (sortBy === 'date') {
          return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'points') {
          return a.point < b.point ? 1 : -1;
        }
      });
}