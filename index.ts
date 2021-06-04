const array = [
  {
    id: 1,
    title: "first",
  },
  {
    id: 2,
    title: "2",
  },
  {
    id: 3,
    title: "3",
  },
  {
    id: 4,
    title: "4",
  },
  {
    id: 5,
    title: "5",
  },
  {
    id: 6,
    title: "6",
  },
];

console.log(array);

const newArray = array.map(element => ({ ...element, desc: "desc" + element.id }))

console.log(newArray);


