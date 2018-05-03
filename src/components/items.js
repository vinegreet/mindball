const items = [
  {
    title: 'Ericsson Ukraine',
    year: '2015'
  },
  {
    title: 'Yoga Studio Yoga23',
    year: '2015'
  },
  {
    title: 'SEMPRO',
    year: '2015'
  },
  {
    title: 'Mindball IDCEE',
    year: '2014'
  },
  {
    title: 'Art-Picnic',
    year: '2014'
  },
  {
    title: 'Microsoft Dev Day',
    year: '2014'
  },
  {
    title: 'Festival of Science',
    year: '2014'
  },
  {
    title: 'Active Day in Gulliver',
    year: '2014'
  },
  {
    title: 'Tea Cup Champ',
    year: '2014'
  },
  {
    title: 'Mindball in Bibliotech',
    year: '2013'
  },
  {
    title: 'Mindball in Atmasfera360',
    year: '2013'
  },
  {
    title: 'VedaLife',
    year: '2013'
  }
];

export default items;

const titles = items.map(item => item.title);
const years = items.map(item => item.year);
const uniqYears = [...new Set(years)];
export { titles, years, uniqYears };