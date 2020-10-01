export const color = (num) => {
  //if (num > 0) return "red";
  //else return "blue";
  if (num > 0) return `rgb(${255 - num},0,0)`;
  else if (num === 0) return `rgb(255,255,255)`;
  else return `rgb(0,${255 - num},0)`;
};
