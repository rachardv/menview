export const restaurants = [
  {
    "name": "Renaissance",
    "lat": 49.275344,
    "lon": -122.915344,
    "address": "Simon Fraser University",
    "description": "",
    "rating": 0
  },
  {
    "name": "Starbucks",
    "lat": 49.275644,
    "lon": -122.917553,
    "address": "Simon Fraser University",
    "description": "",
    "rating": 0
  },
  {
    "name": "McDonald\'s",
    "lat": 49.276791,
    "lon": -122.916791,
    "address": "University of British Columbia",
    "description": "",
    "rating": 0
  },
  {
    "name": "test1",
    "lat": 49.277900,
    "lon": -122.917900,
    "address": "University of British Columbia",
    "description": "",
    "rating": 0
  },
  {
    "name": "test2",
    "lat": 49.275741,
    "lon": -122.916741,
    "address": "University of British Columbia",
    "description": "",
    "rating": 0
  },
  {
    "name": "test3",
    "lat": 49.275761,
    "lon": -122.915761,
    "address": "University of British Columbia",
    "description": "",
    "rating": 0
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
