const items = [
/*  {
    title: 'Ericsson Ukraine',
    year: '2018',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg', '3.jpg'],
    videos: ['https://www.youtube.com/watch?v=6LjtJsHoo-E']
  },*/
  {
    title: 'Ericsson Ukraine',
    year: '2015',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg', '3.jpg'],
    videos: ['https://www.youtube.com/watch?v=6LjtJsHoo-E']
  },
  {
    title: 'Yoga Studio Yoga23',
    year: '2015',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg']
  },
  {
    title: 'SEMPRO',
    year: '2015',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg']
  },
  {
    title: 'Mindball IDCEE',
    year: '2014',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg', '3.jpg'],
    videos: ['https://www.youtube.com/watch?v=6LjtJsHoo-E']
  },
  {
    title: 'Art-Picnic',
    year: '2014',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg', '3.jpg']
  },
  {
    title: 'Microsoft Dev Day',
    year: '2014',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg', '3.jpg']
  },
  {
    title: 'Festival of Science',
    year: '2014',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg', '3.jpg']
  },
  {
    title: 'Active Day in Gulliver',
    year: '2014',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
  },
  {
    title: 'Tea Cup Champ',
    year: '2014',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
  },
  {
    title: 'Mindball in Bibliotech',
    year: '2013',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
  },
  {
    title: 'Mindball in Atmasfera360',
    year: '2013',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
  },
  {
    title: 'VedaLife',
    year: '2013',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestias, explicabo maxime assumenda possimus inventore enim quis. Amet sunt nesciunt voluptates eius sed placeat vitae perspiciatis saepe quis natus, quasi, consectetur at quaerat quibusdam quidem blanditiis quia ipsam rem.',
    photos: ['1.jpg', '2.jpg']
  }
];

export default items;

const titles = items.map(item => item.title);
const years = items.map(item => item.year);
const uniqYears = [...new Set(years)];

const texts = items.map(item => item.text);
const photos = items.map(item => item.photos);
const videos = items.map(item => item.videos);

export { titles, years, uniqYears, texts, photos };