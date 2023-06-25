const generateSubBoundingBoxesOfCountry = (
  topLeft: [number, number],
  bottomRight: [number, number],
  maxArea = 1,
): [number, number][][] => {
  const [topLeftLong, topLeftLat] = topLeft;
  const [bottomRightLong, bottomRightLat] = bottomRight;

  const subBoundingBoxes: [number, number][][] = [];

  const longSpan = bottomRightLong - topLeftLong;
  const latSpan = topLeftLat - bottomRightLat;

  const maxSideLength = Math.sqrt(maxArea);

  // Calculate the number of sub-squares horizontally and vertically
  const numHorizontal = Math.ceil(longSpan / maxSideLength);
  const numVertical = Math.ceil(latSpan / maxSideLength);

  // Calculate the side length of each sub-square
  const subSquareLong = longSpan / numHorizontal;
  const subSquareLat = latSpan / numVertical;

  // Iterate through each sub-square
  for (let i = 0; i < numHorizontal; i++) {
    for (let j = 0; j < numVertical; j++) {
      // Calculate the coordinates of the current sub-square
      const subSquareTopLeft: [number, number] = [topLeftLong + i * subSquareLong, topLeftLat - j * subSquareLat];

      const subSquareBottomRight: [number, number] = [
        subSquareTopLeft[0] + subSquareLong,
        subSquareTopLeft[1] - subSquareLat,
      ];

      // Add the sub-square to the list if its area is 10km² or less
      if (subSquareLong * subSquareLat <= 10) {
        subBoundingBoxes.push([subSquareTopLeft, subSquareBottomRight]);
      }
    }
  }

  return subBoundingBoxes;
};

export default generateSubBoundingBoxesOfCountry;
