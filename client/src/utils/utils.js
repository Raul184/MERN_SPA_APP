// Format Data-ready to work with DB Objs format
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.map(doc => {
    const { _id,description,difficulty,duration,durationWeeks,guides,imageCover,images,locations,maxGroupSize,name,price,ratingsAverage,ratingsQuantity,slug,startDates,startLocation,summary 
    } = doc;
    return {
      routeName: encodeURI(name.toLowerCase()).replace(/%20/g ,'-'),
      id: _id,
      name,
      description,
      difficulty,
      duration,
      durationWeeks,
      guides,
      imageCover,
      images,
      locations,
      maxGroupSize,
      price,
      ratingsAverage,
      ratingsQuantity,
      slug,
      startDates,
      startLocation,
      summary
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.routeName] = collection;
    return accumulator;
  }, {});
};

//FORMAT Objs to arr to display in UI
export const arrTransformer = data => Object.entries(data).map(el => el[1])