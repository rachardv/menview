export const restaurants = [
  {
    name: 'Renaissance',
    location: 'Simon Fraser University',
    dishcount: 1,
    lat: 49.275344,
    long: -122.915344,
    alpha: 1
  },
  {
    name: 'Starbucks',
    location: 'Simon Fraser University',
    dishcount: 1,
    lat: 49.275644,
    long: -122.917553,
    alpha: 1
  },
  {
    name: 'McDonald\'s',
    location: 'University of British Columbia',
    dishcount: 2,
    lat: 49.276791,
    long: -122.916791,
    alpha: 1
  }
];

export const menus = {
  'Renaissance': {
    menu: [
      {
        name: 'Fancy Tea',
        description: 'Because why not?',
        cost: 3,
        rating: 4.3,
        isrc: '../../assets/tea-fs8.png'
      }
    ]
  },
  'Starbucks': {
    menu: [
      {
        name: 'Overpriced Coffee',
        description: 'For all the other students that aren\'t using Angular for their demo site.',
        cost: 6,
        rating: 2.1,
        isrc: '../../assets/coffee-fs8.png'
      }
    ]
  },
  'McDonald\'s': {
    menu: [
      {
        name: 'Burger',
        description: 'If only the food matched the pictures.',
        cost: 5,
        rating: 4.7,
        isrc: '../../assets/burger-fs8.png'
      },
      {
        name: 'Fries',
        description: 'At least SFU has an A&W on-campus.',
        cost: 2,
        rating: 3.5,
        isrc: '../../assets/fries-fs8.png'
      }
    ]
  }
}
