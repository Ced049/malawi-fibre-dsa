
const MALAWI_NODES = [
  // [name, region, longitude, latitude]
  ["Chitipa","North",33.27,-9.70],["Karonga","North",33.93,-9.93],["Rumphi","North",33.86,-11.02],
  ["Mzuzu","North",34.02,-11.46],["Nkhata Bay","North",34.30,-11.60],["Mzimba","North",33.60,-11.90],
  ["Kasungu","Central",33.48,-13.03],["Mchinji","Central",32.90,-13.80],["Ntchisi","Central",34.00,-13.37],
  ["Dowa","Central",33.93,-13.65],["Nkhotakota","Central",34.30,-12.93],["Salima","Central",34.43,-13.78],
  ["Lilongwe","Central",33.78,-13.98],["Dedza","Central",34.33,-14.38],["Ntcheu","Central",34.63,-14.82],
  ["Mangochi","South",35.25,-14.48],["Balaka","South",34.96,-14.98],["Liwonde","South",35.22,-15.07],
  ["Zomba","South",35.32,-15.38],["Blantyre","South",35.00,-15.79],["Thyolo","South",35.14,-16.07],
  ["Mulanje","South",35.50,-16.03],["Chikwawa","South",34.80,-16.03],["Nsanje","South",35.26,-16.92]
];
const MALAWI_EDGES = [
  ["Chitipa","Karonga",100],["Karonga","Rumphi",150],["Rumphi","Mzuzu",70],["Mzuzu","Nkhata Bay",50],
  ["Mzuzu","Mzimba",60],["Mzimba","Kasungu",190],["Nkhata Bay","Nkhotakota",250],["Kasungu","Mchinji",120],
  ["Kasungu","Lilongwe",125],["Kasungu","Ntchisi",70],["Ntchisi","Nkhotakota",80],["Ntchisi","Dowa",50],
  ["Dowa","Lilongwe",55],["Mchinji","Lilongwe",110],["Nkhotakota","Salima",100],["Salima","Lilongwe",110],
  ["Salima","Mangochi",140],["Lilongwe","Dedza",85],["Dedza","Ntcheu",65],["Ntcheu","Balaka",100],
  ["Balaka","Mangochi",70],["Mangochi","Liwonde",80],["Balaka","Liwonde",40],["Liwonde","Zomba",50],
  ["Zomba","Blantyre",65],["Balaka","Blantyre",125],["Blantyre","Thyolo",40],["Blantyre","Mulanje",70],
  ["Thyolo","Mulanje",50],["Blantyre","Chikwawa",50],["Chikwawa","Nsanje",90]
];
if (typeof module !== "undefined") module.exports = { MALAWI_NODES, MALAWI_EDGES };
