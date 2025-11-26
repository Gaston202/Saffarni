const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./Models/Destination');
const Restaurant = require('./Models/Restaurant');
const Place = require('./Models/Place');
const Hotel = require('./Models/Hotel');

dotenv.config();

const destinationsData = [
  {
    id: 'sidi-bou-said-carthage',
    title: 'Sidi Bou Said & Carthage',
    location: 'Tunis, Tunisia',
    image: 'https://lp-cms-production.imgix.net/2024-07/GettyRF498116298.jpg?auto=format,compress&q=72&fit=crop',
    rating: 4.9,
    reviews: 542,
    description: 'Discover the blue and white streets of Sidi Bou Said and explore the ancient ruins of Carthage.',
    price: 500,
    currency: 'TND',
    duration: 3,
    travelStyles: ['Culture', 'Historical'],
    preferences: ['Monuments', 'Historical'],
    coordinates: { lat: 36.8794, lng: 10.3300 }
  },
  {
    id: 'sahara-adventure-tozeur',
    title: 'Sahara Adventure & Tozeur',
    location: 'Tozeur, Tunisia',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 389,
    description: 'Explore golden Sahara dunes, visit mountain oases and discover Star Wars filming locations.',
    price: 950,
    currency: 'TND',
    duration: 5,
    travelStyles: ['Adventure', 'Nature'],
    preferences: ['Mountains', 'Adventure'],
    coordinates: { lat: 33.9167, lng: 8.1333 }
  },
  {
    id: 'cultural-istanbul',
    title: 'Cultural Istanbul',
    location: 'Istanbul, Turkey',
    image: 'https://cdn2.civitatis.com/turquia/estambul/galeria/vista-panoramica-istambul.jpg',
    rating: 4.7,
    reviews: 621,
    description: 'Discover the bridge between East and West with majestic mosques, bustling bazaars and delicious cuisine.',
    price: 3850,
    currency: 'TND',
    duration: 6,
    travelStyles: ['Culture', 'Historical', 'Shopping'],
    preferences: ['Monuments', 'Historical', 'Shopping'],
    coordinates: { lat: 41.0082, lng: 28.9784 }
  },
  {
    id: 'luxury-dubai-experience',
    title: 'Luxury Dubai Experience',
    location: 'Dubai, UAE',
    image: 'https://www.investindubai.gov.ae/-/media/gathercontent/poi/b/burj-khalifa/fallback-image/burj-khalifa-det-3.jpg',
    rating: 4.8,
    reviews: 458,
    description: 'Experience modern luxury with iconic skyscrapers, world-class shopping and golden beaches.',
    price: 2450,
    currency: 'TND',
    duration: 5,
    travelStyles: ['Luxury', 'Shopping', 'Beach'],
    preferences: ['Shopping', 'Sea'],
    coordinates: { lat: 25.2048, lng: 55.2708 }
  },
  {
    id: 'santorini-sunset',
    title: 'Santorini Sunset Experience',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 723,
    description: 'Enjoy breathtaking sunsets, white-washed buildings, and crystal-clear waters in this iconic Greek island.',
    price: 2200,
    currency: 'TND',
    duration: 4,
    travelStyles: ['Relax', 'Beach', 'Culture'],
    preferences: ['Sea', 'Monuments'],
    coordinates: { lat: 36.3932, lng: 25.4615 }
  },
  {
    id: 'alps-mountain-retreat',
    title: 'Alps Mountain Retreat',
    location: 'Swiss Alps, Switzerland',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 456,
    description: 'Experience pristine mountain landscapes, hiking trails, and cozy alpine villages.',
    price: 2800,
    currency: 'TND',
    duration: 7,
    travelStyles: ['Adventure', 'Nature'],
    preferences: ['Mountains', 'Adventure'],
    coordinates: { lat: 46.5197, lng: 9.8385 }
  },
  {
    id: 'paris-culture',
    title: 'Paris Cultural Journey',
    location: 'Paris, France',
    image: 'https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/shutterstock_2118458942_ss_non-editorial_jnjpwq?_a=BAVAZGE70',
    rating: 4.7,
    reviews: 892,
    description: 'Explore world-famous museums, iconic monuments, and charming streets of the City of Light.',
    price: 3200,
    currency: 'TND',
    duration: 5,
    travelStyles: ['Culture', 'Historical', 'Shopping'],
    preferences: ['Monuments', 'Historical', 'Shopping'],
    coordinates: { lat: 48.8566, lng: 2.3522 }
  },
  {
    id: 'bali-tropical',
    title: 'Bali Tropical Paradise',
    location: 'Bali, Indonesia',
    image: 'https://cdn.sanity.io/images/nxpteyfv/goguides/15486940194b45347ac5037248d2363d27dec5ad-1600x1066.jpg',
    rating: 4.9,
    reviews: 634,
    description: 'Relax on pristine beaches, explore ancient temples, and enjoy tropical island vibes.',
    price: 2100,
    currency: 'TND',
    duration: 6,
    travelStyles: ['Relax', 'Beach', 'Culture'],
    preferences: ['Sea', 'Monuments'],
    coordinates: { lat: -8.3405, lng: 115.0920 }
  }
];

// Helper function to convert price string to number
const priceToNumber = (priceStr) => {
  if (typeof priceStr === 'number') return priceStr;
  const priceMap = { '$': 50, '$$': 150, '$$$': 300, '$$$$': 500 };
  return priceMap[priceStr] || 150;
};

const destinationDetailsData = {
  'sidi-bou-said-carthage': {
    restaurants: [
      {
        name: 'Café des Nattes',
        type: 'Café',
        rating: 4.8,
        price: '100 TND',
        description: 'Traditional Tunisian café with mint tea and stunning views',
        address: 'Sidi Bou Said, Tunisia',
        image: 'https://media01.stockfood.com/largepreviews/MjE3MDU4MTYyMg==/70018762-Cafe-de-Nattes-Sidi-Bou-Said-Tunesia.jpg'
      },
      {
        name: 'Dar Zarrouk',
        type: 'Restaurant',
        rating: 4.6,
        price: '150 TND',
        description: 'Fine dining with Mediterranean cuisine and sea views',
        address: 'Sidi Bou Said, Tunisia',
        image: 'https://www.darzarrouk.tn/wp-content/uploads/2025/06/banner-la-carte.webp'
      },
      {
        name: 'Le Resto',
        type: 'Restaurant',
        rating: 4.5,
        price: '200 TND',
        description: 'Local Tunisian dishes in a charming setting',
        address: 'Carthage, Tunisia',
        image: 'https://www.jetsetmagazine.net//__admin/__admin_medias/modules/listes/article_1544/accvilladidon.jpg'
      }
    ],
    hotels: [
      {
        name: 'Dar Said Hotel',
        location: 'Sidi Bou Said, Tunisia',
        rating: 4.7,
        price: 250,
        description: 'Luxurious boutique hotel with traditional architecture',
        address: 'Sidi Bou Said, Tunisia',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/24/d9/7c/hotel-dar-said.jpg',
        amenities: ['Wifi', 'Pool', 'Restaurant'],
        reviews: 120,
        availableRooms: 15
      },
      {
        name: 'Villa Didon',
        location: 'Carthage, Tunisia',
        rating: 4.9,
        price: 450,
        description: '5-star hotel with panoramic sea views',
        address: 'Carthage, Tunisia',
        image: 'https://images.trvl-media.com/lodging/2000000/1460000/1455700/1455623/6f9f70dd.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
        amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa'],
        reviews: 89,
        availableRooms: 8
      },
      {
        name: 'Hotel Belvedere Fourati',
        location: 'Tunis, Tunisia',
        rating: 4.4,
        price: 150,
        description: 'Comfortable hotel with modern amenities',
        address: 'Tunis, Tunisia',
        image: 'https://www.resabo.com/cr.fwk/images/hotels/Hotel-4640-20230914-030251.jpg',
        amenities: ['Wifi', 'Parking'],
        reviews: 234,
        availableRooms: 45
      }
    ],
    places: [
      {
        name: 'Sidi Bou Said Village',
        type: 'Historic Site',
        rating: 4.9,
        description: 'Famous blue and white village with stunning architecture',
        address: 'Sidi Bou Said, Tunisia',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
      },
      {
        name: 'Carthage Archaeological Site',
        type: 'Historic Site',
        rating: 4.8,
        description: 'Ancient Roman ruins and archaeological museum',
        address: 'Carthage, Tunisia',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop'
      },
      {
        name: 'Bardo Museum',
        type: 'Museum',
        rating: 4.7,
        description: 'World-famous museum with Roman mosaics',
        address: 'Tunis, Tunisia',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
      },
      {
        name: 'Ennejma Ezzahra Palace',
        type: 'Palace',
        rating: 4.6,
        description: 'Beautiful palace with traditional architecture and gardens',
        address: 'Sidi Bou Said, Tunisia',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop'
      }
    ]
  },
  'sahara-adventure-tozeur': {
    restaurants: [
      {
        name: 'Restaurant Le Petit Prince',
        type: 'Restaurant',
        rating: 4.5,
        price: '$$',
        description: 'Traditional Tunisian cuisine in the desert',
        address: 'Tozeur, Tunisia',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop'
      },
      {
        name: 'Dar Chraiet',
        type: 'Restaurant',
        rating: 4.6,
        price: '$$',
        description: 'Local dishes with desert atmosphere',
        address: 'Tozeur, Tunisia',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop'
      }
    ],
    hotels: [
      {
        name: 'Dar Tozeur',
        location: 'Tozeur, Tunisia',
        rating: 4.7,
        price: 280,
        description: 'Traditional desert hotel with authentic architecture',
        address: 'Tozeur, Tunisia',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
        amenities: ['Wifi', 'Restaurant', 'Parking'],
        reviews: 95,
        availableRooms: 12
      },
      {
        name: 'Hotel Ras El Ain',
        location: 'Tozeur, Tunisia',
        rating: 4.5,
        price: 180,
        description: 'Comfortable hotel near the desert',
        address: 'Tozeur, Tunisia',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop',
        amenities: ['Wifi', 'Parking'],
        reviews: 156,
        availableRooms: 30
      }
    ],
    places: [
      {
        name: 'Sahara Desert Dunes',
        type: 'Natural Site',
        rating: 4.9,
        description: 'Experience the golden sand dunes and camel rides',
        address: 'Sahara Desert, Tunisia',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop'
      },
      {
        name: 'Star Wars Filming Locations',
        type: 'Tourist Attraction',
        rating: 4.8,
        description: 'Visit the iconic filming locations from Star Wars',
        address: 'Tozeur, Tunisia',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop'
      },
      {
        name: 'Mountain Oases',
        type: 'Natural Site',
        rating: 4.7,
        description: 'Explore beautiful mountain oases and palm groves',
        address: 'Tozeur, Tunisia',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop'
      }
    ]
  },
  'cultural-istanbul': {
    restaurants: [
      {
        name: '360 Istanbul',
        type: 'Fine Dining',
        rating: 4.8,
        price: '$$$$',
        description: 'Rooftop restaurant with panoramic city views',
        address: 'Istanbul, Turkey',
        image: 'https://360istanbul.com/wp-content/uploads/2025/02/11.jpg'
      },
      {
        name: 'Hamdi Restaurant',
        type: 'Restaurant',
        rating: 4.7,
        price: '$$$',
        description: 'Traditional Turkish cuisine with Bosphorus views',
        address: 'Istanbul, Turkey',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdiyDnoBxoP1kOGAvekLvu0-v3IsBEwX66vw&s'
      },
      {
        name: 'Karaköy Güllüoğlu',
        type: 'Bakery',
        rating: 4.9,
        price: '$',
        description: 'Famous for Turkish baklava and desserts',
        address: 'Istanbul, Turkey',
        image: 'https://c8.alamy.com/comp/CC8PN6/karakoy-gulluoglu-a-famous-baklava-shop-in-istanbul-turkey-CC8PN6.jpg'
      }
    ],
    hotels: [
      {
        name: 'Four Seasons Hotel Istanbul',
        location: 'Istanbul, Turkey',
        rating: 4.9,
        price: 650,
        description: '5-star luxury hotel in historic building',
        address: 'Istanbul, Turkey',
        image: 'https://www.americanexpress.com/en-us/travel/discover/photos/100289/121166/1600/BOP_1368.jpg?ch=560',
        amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa', 'Gym'],
        reviews: 342,
        availableRooms: 25
      },
      {
        name: 'Pera Palace Hotel',
        location: 'Istanbul, Turkey',
        rating: 4.8,
        price: 580,
        description: 'Historic hotel with Ottoman architecture',
        address: 'Istanbul, Turkey',
        image: 'https://content.r9cdn.net/rimg/kimg/2f/50/189458f02dc52ac5.jpg?width=1366&height=768&crop=true',
        amenities: ['Wifi', 'Restaurant', 'Spa'],
        reviews: 289,
        availableRooms: 18
      },
      {
        name: 'Radisson Blu Hotel & Spa',
        location: 'Istanbul, Turkey',
        rating: 5,
        price: 600,
        description: 'Boutique hotel in the heart of Sultanahmet',
        address: 'Istanbul, Turkey',
        image: 'https://content.r9cdn.net/rimg/kimg/90/a7/dd77ba428b34f231.jpg?width=1366&height=768&crop=true',
        amenities: ['Wifi', 'Restaurant'],
        reviews: 412,
        availableRooms: 35
      }
    ],
    places: [
      {
        name: 'Hagia Sophia',
        type: 'Historic Site',
        rating: 4.9,
        description: 'Iconic Byzantine architecture and history',
        address: 'Istanbul, Turkey',
        image: 'https://cdn-imgix.headout.com/media/images/db8d8e671a6ca9af5cffcc208f8a7846-11984-Istanbul-HistorianGuidedTourofHagiaSophia-10.jpg?auto=format&w=702.4499999999999&h=401.4&q=90&ar=7%3A4&crop=faces&fit=crop'
      },
      {
        name: 'Blue Mosque',
        type: 'Mosque',
        rating: 4.8,
        description: 'Stunning Ottoman mosque with beautiful tiles',
        address: 'Istanbul, Turkey',
        image: 'https://cdn-imgix.headout.com/media/images/fd89223056e350ae524f6c6120198677-Bluemosqueistanbul.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&ar=16%3A9&crop=faces&fit=crop'
      },
      {
        name: 'Grand Bazaar',
        type: 'Market',
        rating: 4.7,
        description: 'One of the world\'s oldest and largest covered markets',
        address: 'Istanbul, Turkey',
        image: 'https://galatagreenlandhotel.com/wp-content/uploads/2025/07/Grand-Bazaar-1024x576.jpg'
      },
      {
        name: 'Topkapi Palace',
        type: 'Palace',
        rating: 4.8,
        description: 'Former Ottoman sultans\' palace and museum',
        address: 'Istanbul, Turkey',
        image: 'https://cdn-imgix.headout.com/media/images/195d841ddf7a05564be5706fed1a2332-13472-Istanbul-SkiptheLineGuidedTourofTopkapiPalace-01.jpg?auto=format&q=90&crop=faces&fit=crop'
      },
      {
        name: 'Bosphorus Cruise',
        type: 'Tour',
        rating: 4.7,
        description: 'Scenic boat tour between Europe and Asia',
        address: 'Istanbul, Turkey',
        image: 'https://sultaniacruise.com/wp-content/uploads/2025/02/sultanialuxury-1-1920x1440.jpg'
      }
    ]
  },
  'luxury-dubai-experience': {
    restaurants: [
      {
        name: 'At.mosphere',
        type: 'Fine Dining',
        rating: 4.9,
        price: '$$$$',
        description: 'World\'s highest restaurant in Burj Khalifa',
        address: 'Dubai, UAE',
        image: 'https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/14/9jJXshM1-At.mosphere.jpg'
      },
      {
        name: 'Pierchic',
        type: 'Fine Dining',
        rating: 4.8,
        price: '$$$$',
        description: 'Seafood restaurant on a pier with sea views',
        address: 'Dubai, UAE',
        image: 'https://d1ih9tlfsfrtid.cloudfront.net/O7TBRUmdQZS31QYYmPoD_Onda-4.jpg'
      },
      {
        name: 'Al Hadheerah',
        type: 'Restaurant',
        rating: 4.7,
        price: '$$$',
        description: 'Desert dining experience with entertainment',
        address: 'Dubai, UAE',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/60/f1/f1/al-hadheerah-largejpg.jpg'
      }
    ],
    hotels: [
      {
        name: 'Burj Al Arab',
        location: 'Dubai, UAE',
        rating: 4.9,
        price: 2200,
        description: 'Iconic 7-star luxury hotel',
        address: 'Dubai, UAE',
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/675859513.jpg?k=cbb19bcc2fd1ab8b431d538e96cd0372c4738a46c69d9204d60649dcac98d843&o=',
        amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa', 'Gym', 'Parking'],
        reviews: 567,
        availableRooms: 15
      },
      {
        name: 'Atlantis The Palm',
        location: 'Dubai, UAE',
        rating: 4.8,
        price: 850,
        description: 'Luxury resort with waterpark and aquarium',
        address: 'Dubai, UAE',
        image: 'https://www.sovereign.com/-/media/Bynder/Sovereign-properties/United-Arab-Emirates/Dubai/Atlantis-the-Palm/Facilities/atlantis-palm-2025-main-pool-004-116853-hybris.jpg?rev=9045ce1185b14c50ae980e5d79d77440&hash=DBE326EB0B6292C68DBFCFD015B47E9F',
        amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa', 'Gym', 'Parking'],
        reviews: 723,
        availableRooms: 45
      },
      {
        name: 'Armani Hotel Dubai',
        location: 'Dubai, UAE',
        rating: 4.7,
        price: 950,
        description: 'Designer hotel in Burj Khalifa',
        address: 'Dubai, UAE',
        image: 'https://www.traveltodubai.ae/wp-content/uploads/2025/10/Armani-Hotel-Dubai.jpg',
        amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa', 'Gym'],
        reviews: 445,
        availableRooms: 28
      }
    ],
    places: [
      {
        name: 'Burj Khalifa',
        type: 'Landmark',
        rating: 4.9,
        description: 'World\'s tallest building with observation deck',
        address: 'Dubai, UAE',
        image: 'https://d2csxpduxe849s.cloudfront.net/media/42BB6A60-DC5B-4A0B-87CC3E8C248CB543/C8B8C53F-D4FB-47AD-BC8F1EAB4D570E00/webimage-3D0ADACC-95C6-4E46-917F764AC40B7B27.png'
      },
      {
        name: 'Dubai Mall',
        type: 'Shopping',
        rating: 4.8,
        description: 'One of the world\'s largest shopping malls',
        address: 'Dubai, UAE',
        image: 'https://media.admiddleeast.com/photos/6666a0658f4d59b9cc452255/16:9/w_2560%2Cc_limit/Dubai%2520mall%2520expansion%25201.jpeg'
      },
      {
        name: 'Palm Jumeirah',
        type: 'Landmark',
        rating: 4.7,
        description: 'Artificial island in the shape of a palm tree',
        address: 'Dubai, UAE',
        image: 'https://ggfx-primestay.s3.eu-west-2.amazonaws.com/x/750x500/palm_jumeirah_banner_6c9ac20d50.webp'
      },
      {
        name: 'Dubai Fountain',
        type: 'Attraction',
        rating: 4.8,
        description: 'Musical fountain show with lights',
        address: 'Dubai, UAE',
        image: 'https://www.dubai.it/en/wp-content/uploads/sites/142/dancing-fountains-dubai.jpg'
      }
    ]
  },
  'santorini-sunset': {
    restaurants: [
      {
        name: 'Ambrosia Restaurant',
        type: 'Fine Dining',
        rating: 4.8,
        price: '$$$$',
        description: 'Romantic restaurant with sunset views',
        address: 'Oia, Santorini, Greece',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/96/e6/37/beefbar-santorini-views.jpg?w=400&h=-1&s=1'
      },
      {
        name: 'Metaxi Mas',
        type: 'Restaurant',
        rating: 4.7,
        price: '$$$',
        description: 'Traditional Greek cuisine',
        address: 'Santorini, Greece',
        image: 'https://santorini-metaximas.gr/wp/wp-content/uploads/2018/03/metaxi-mas-ELEF9273.jpg'
      }
    ],
    hotels: [
      {
        name: 'Katikies Hotel',
        location: 'Oia, Santorini, Greece',
        rating: 4.9,
        price: 750,
        description: 'Luxury hotel with infinity pool and sea views',
        address: 'Oia, Santorini, Greece',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/20/c3/03/therasia-restaurant.jpg?w=900&h=500&s=1',
        amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa'],
        reviews: 234,
        availableRooms: 10
      },
      {
        name: 'Grace Hotel Santorini',
        location: 'Santorini, Greece',
        rating: 4.8,
        price: 680,
        description: 'Boutique hotel with stunning caldera views',
        address: 'Santorini, Greece',
        image: 'https://images.trvl-media.com/lodging/6000000/5010000/5005600/5005550/92159b9e.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
        amenities: ['Wifi', 'Pool', 'Restaurant'],
        reviews: 189,
        availableRooms: 12
      }
    ],
    places: [
      {
        name: 'Oia Sunset Viewpoint',
        type: 'Viewpoint',
        rating: 4.9,
        description: 'Best spot to watch the famous Santorini sunset',
        address: 'Oia, Santorini, Greece',
        image: 'https://media.istockphoto.com/id/541132240/photo/oia-at-sunset.jpg?s=612x612&w=0&k=20&c=kql4X3tMkOmYsa4PX45WK7-vHzpOk__IeAaHiz4VfyA='
      },
      {
        name: 'Red Beach',
        type: 'Beach',
        rating: 4.7,
        description: 'Unique red sand beach with dramatic cliffs',
        address: 'Santorini, Greece',
        image: 'https://www.cestee.com/images/97/87/19787-920w.webp'
      },
      {
        name: 'Ancient Thera',
        type: 'Historic Site',
        rating: 4.6,
        description: 'Ancient ruins with panoramic views',
        address: 'Santorini, Greece',
        image: 'https://santorinibesttours.com/sites/default/files/styles/open_graph/public/2024-06/achient-thira-santorini--opt.jpg?itok=4bKH0kvQ'
      }
    ]
  },
  'alps-mountain-retreat': {
    restaurants: [
      {
        name: 'Restaurant Le Mont-Blanc',
        type: 'Restaurant',
        rating: 4.7,
        price: '$$$',
        description: 'Alpine cuisine with mountain views',
        address: 'Swiss Alps, Switzerland',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop'
      }
    ],
    hotels: [
      {
        name: 'The Chedi Andermatt',
        location: 'Andermatt, Switzerland',
        rating: 4.8,
        price: 920,
        description: '5-star alpine luxury resort',
        address: 'Andermatt, Switzerland',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
        amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa', 'Gym'],
        reviews: 156,
        availableRooms: 8
      },
      {
        name: 'Hotel Bellevue',
        location: 'Swiss Alps, Switzerland',
        rating: 4.6,
        price: 420,
        description: 'Cozy mountain hotel with traditional charm',
        address: 'Swiss Alps, Switzerland',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        amenities: ['Wifi', 'Restaurant'],
        reviews: 203,
        availableRooms: 22
      }
    ],
    places: [
      {
        name: 'Matterhorn',
        type: 'Mountain',
        rating: 4.9,
        description: 'Iconic mountain peak and hiking trails',
        address: 'Zermatt, Switzerland',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
      },
      {
        name: 'Jungfraujoch',
        type: 'Mountain',
        rating: 4.8,
        description: 'Top of Europe with glacier views',
        address: 'Swiss Alps, Switzerland',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
      }
    ]
  },
  'paris-culture': {
    restaurants: [
      {
        name: 'Le Jules Verne',
        type: 'Fine Dining',
        rating: 4.8,
        price: '$$$$',
        description: 'Michelin-starred restaurant in Eiffel Tower',
        address: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop'
      },
      {
        name: 'L\'As du Fallafel',
        type: 'Restaurant',
        rating: 4.7,
        price: '$',
        description: 'Famous falafel in the Marais district',
        address: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop'
      }
    ],
    hotels: [
      {
        name: 'The Ritz Paris',
        location: 'Paris, France',
        rating: 4.9,
        price: 1100,
        description: 'Iconic 5-star luxury hotel',
        address: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
        amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa', 'Gym'],
        reviews: 456,
        availableRooms: 12
      },
      {
        name: 'Hotel des Invalides',
        location: 'Paris, France',
        rating: 4.6,
        price: 380,
        description: 'Charming boutique hotel near attractions',
        address: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
        amenities: ['Wifi', 'Restaurant'],
        reviews: 312,
        availableRooms: 28
      }
    ],
    places: [
      {
        name: 'Eiffel Tower',
        type: 'Landmark',
        rating: 4.9,
        description: 'Iconic iron lattice tower',
        address: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop'
      },
      {
        name: 'Louvre Museum',
        type: 'Museum',
        rating: 4.8,
        description: 'World\'s largest art museum',
        address: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop'
      },
      {
        name: 'Notre-Dame Cathedral',
        type: 'Cathedral',
        rating: 4.7,
        description: 'Medieval Catholic cathedral',
        address: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop'
      }
    ]
  },
  'bali-tropical': {
    restaurants: [
      {
        name: 'Locavore',
        type: 'Fine Dining',
        rating: 4.8,
        price: '$$$',
        description: 'Modern Indonesian cuisine',
        address: 'Ubud, Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop'
      }
    ],
    hotels: [
      {
        name: 'Four Seasons Resort Bali',
        location: 'Bali, Indonesia',
        rating: 4.9,
        price: 850,
        description: 'Luxury beachfront resort',
        address: 'Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
        amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa', 'Gym'],
        reviews: 278,
        availableRooms: 20
      },
      {
        name: 'Villa Sungai',
        location: 'Ubud, Bali, Indonesia',
        rating: 4.7,
        price: 520,
        description: 'Private villa with pool and rice field views',
        address: 'Ubud, Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
        amenities: ['Wifi', 'Pool', 'Restaurant'],
        reviews: 134,
        availableRooms: 5
      }
    ],
    places: [
      {
        name: 'Tanah Lot Temple',
        type: 'Temple',
        rating: 4.8,
        description: 'Iconic sea temple on a rock formation',
        address: 'Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop'
      },
      {
        name: 'Tegallalang Rice Terraces',
        type: 'Natural Site',
        rating: 4.7,
        description: 'Stunning rice terraces with scenic views',
        address: 'Ubud, Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop'
      }
    ]
  }
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Destination.deleteMany({});
    await Restaurant.deleteMany({});
    await Place.deleteMany({});
    console.log('Cleared existing data');

    // Insert destinations
    const insertedDestinations = await Destination.insertMany(destinationsData);
    console.log(`Inserted ${insertedDestinations.length} destinations`);

    // Insert restaurants, hotels, and places for all destinations
    let totalRestaurants = 0;
    let totalHotels = 0;
    let totalPlaces = 0;

    for (const destId of destinationsData.map(d => d.id)) {
      const details = destinationDetailsData[destId];
      
      if (details) {
        // Insert restaurants
        if (details.restaurants && details.restaurants.length > 0) {
          const restaurants = details.restaurants.map(r => ({
            ...r,
            destinationId: destId
          }));
          await Restaurant.insertMany(restaurants);
          totalRestaurants += restaurants.length;
          console.log(`Inserted ${restaurants.length} restaurants for ${destId}`);
        }

        // Insert hotels
        if (details.hotels && details.hotels.length > 0) {
          const hotels = details.hotels.map(h => ({
            ...h,
            destinationId: destId
          }));
          await Hotel.insertMany(hotels);
          totalHotels += hotels.length;
          console.log(`Inserted ${hotels.length} hotels for ${destId}`);
        }

        // Insert places
        if (details.places && details.places.length > 0) {
          const places = details.places.map(p => ({
            ...p,
            destinationId: destId
          }));
          await Place.insertMany(places);
          totalPlaces += places.length;
          console.log(`Inserted ${places.length} places for ${destId}`);
        }
      }
    }

    console.log(`\nTotal inserted: ${totalRestaurants} restaurants, ${totalHotels} hotels, ${totalPlaces} places`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

