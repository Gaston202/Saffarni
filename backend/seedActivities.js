const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Activity = require('./Models/Activity');
const Destination = require('./Models/Destination');

dotenv.config();

const activitiesData = [
  // Sidi Bou Said & Carthage activities
  {
    title: 'Guided Tour of Sidi Bou Said Village',
    description: 'Explore the charming blue and white streets of Sidi Bou Said with a local guide. Learn about the history and architecture of this iconic village.',
    price: 75,
    duration: '3 hours',
    category: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    destinationTitle: 'Sidi Bou Said & Carthage'
  },
  {
    title: 'Carthage Archaeological Tour',
    description: 'Visit the ancient ruins of Carthage, one of the most important historical sites in North Africa. Includes museum visit.',
    price: 85,
    duration: '4 hours',
    category: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    destinationTitle: 'Sidi Bou Said & Carthage'
  },
  {
    title: 'Traditional Tunisian Cooking Class',
    description: 'Learn to prepare traditional Tunisian dishes in a local kitchen. Includes lunch and recipe book.',
    price: 95,
    duration: '5 hours',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    destinationTitle: 'Sidi Bou Said & Carthage'
  },
  {
    title: 'Sunset Boat Cruise',
    description: 'Romantic sunset cruise along the Tunis coast with drinks and snacks. Perfect for couples and families.',
    price: 65,
    duration: '2 hours',
    category: 'relaxation',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    destinationTitle: 'Sidi Bou Said & Carthage'
  },

  // Sahara Adventure & Tozeur activities
  {
    title: 'Desert Camel Trekking Adventure',
    description: 'Experience a traditional camel trek through the golden Sahara dunes. Includes desert lunch and sunset viewing.',
    price: 120,
    duration: 'Full day',
    category: 'adventure',
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop',
    destinationTitle: 'Sahara Adventure & Tozeur'
  },
  {
    title: 'Star Wars Filming Locations Tour',
    description: 'Visit the iconic Star Wars filming locations in Tozeur. See the sets used in the original trilogy.',
    price: 95,
    duration: '5 hours',
    category: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1535016120754-fd58615602d0?w=800&h=600&fit=crop',
    destinationTitle: 'Sahara Adventure & Tozeur'
  },
  {
    title: 'Mountain Oasis Trek',
    description: 'Hike through beautiful mountain oases and palm groves. Learn about local flora and ecology.',
    price: 85,
    duration: '6 hours',
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    destinationTitle: 'Sahara Adventure & Tozeur'
  },
  {
    title: 'Desert Jeep Safari',
    description: 'Thrilling jeep ride through Sahara dunes with a professional driver. Includes photography stops and lunch.',
    price: 135,
    duration: 'Full day',
    category: 'adventure',
    imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
    destinationTitle: 'Sahara Adventure & Tozeur'
  },

  // Istanbul activities
  {
    title: 'Hagia Sophia & Blue Mosque Tour',
    description: 'Explore two of Istanbul\'s most iconic landmarks with expert guide. Includes Ottoman history insights.',
    price: 65,
    duration: '4 hours',
    category: 'culture',
    imageUrl: 'https://cdn-imgix.headout.com/media/images/db8d8e671a6ca9af5cffcc208f8a7846-11984-Istanbul-HistorianGuidedTourofHagiaSophia-10.jpg?auto=format&w=702.4499999999999&h=401.4&q=90&ar=7%3A4&crop=faces&fit=crop',
    destinationTitle: 'Cultural Istanbul'
  },
  {
    title: 'Grand Bazaar Shopping Experience',
    description: 'Navigate the largest covered market with a local guide. Learn haggling tips and shop for souvenirs.',
    price: 55,
    duration: '3 hours',
    category: 'food',
    imageUrl: 'https://galatagreenlandhotel.com/wp-content/uploads/2025/07/Grand-Bazaar-1024x576.jpg',
    destinationTitle: 'Cultural Istanbul'
  },
  {
    title: 'Bosphorus Sunset Cruise',
    description: 'Magical sunset cruise between Europe and Asia. Includes dinner and drinks on the water.',
    price: 85,
    duration: '4 hours',
    category: 'relaxation',
    imageUrl: 'https://sultaniacruise.com/wp-content/uploads/2025/02/sultanialuxury-1-1920x1440.jpg',
    destinationTitle: 'Cultural Istanbul'
  },
  {
    title: 'Turkish Hammam & Spa Experience',
    description: 'Authentic Turkish bath experience with massage and wellness treatments. Relax and rejuvenate.',
    price: 75,
    duration: '3 hours',
    category: 'relaxation',
    imageUrl: 'https://images.unsplash.com/photo-1544226278-ca3e0cad00da?w=800&h=600&fit=crop',
    destinationTitle: 'Cultural Istanbul'
  },
  {
    title: 'Turkish Cuisine & Cooking Class',
    description: 'Learn to prepare authentic Turkish dishes. Includes market tour and 3-course meal.',
    price: 95,
    duration: '5 hours',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561913?w=800&h=600&fit=crop',
    destinationTitle: 'Cultural Istanbul'
  },

  // Dubai activities
  {
    title: 'Burj Khalifa Sky Experience',
    description: 'Visit the world\'s tallest building. Includes both the 124th and 125th floor observation decks.',
    price: 110,
    duration: '3 hours',
    category: 'culture',
    imageUrl: 'https://d2csxpduxe849s.cloudfront.net/media/42BB6A60-DC5B-4A0B-87CC3E8C248CB543/C8B8C53F-D4FB-47AD-BC8F1EAB4D570E00/webimage-3D0ADACC-95C6-4E46-917F764AC40B7B27.png',
    destinationTitle: 'Luxury Dubai Experience'
  },
  {
    title: 'Desert Safari & Dune Bashing',
    description: 'Thrilling 4x4 ride through red dunes, camel ride, and traditional desert camp dinner.',
    price: 125,
    duration: 'Full day',
    category: 'adventure',
    imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
    destinationTitle: 'Luxury Dubai Experience'
  },
  {
    title: 'Luxury Shopping Tour',
    description: 'VIP tour of Dubai\'s finest shopping destinations including Dubai Mall and Gold Souk.',
    price: 95,
    duration: '5 hours',
    category: 'culture',
    imageUrl: 'https://media.admiddleeast.com/photos/6666a0658f4d59b9cc452255/16:9/w_2560%2Cc_limit/Dubai%2520mall%2520expansion%25201.jpeg',
    destinationTitle: 'Luxury Dubai Experience'
  },
  {
    title: 'Spa & Wellness Retreat',
    description: 'World-class spa treatments including massage, facial, and sauna. Luxurious relaxation experience.',
    price: 180,
    duration: '4 hours',
    category: 'relaxation',
    imageUrl: 'https://images.unsplash.com/photo-1544226278-ca3e0cad00da?w=800&h=600&fit=crop',
    destinationTitle: 'Luxury Dubai Experience'
  },
  {
    title: 'Yacht Cruise & Beach Club',
    description: 'Luxury yacht cruise with swimming, snorkeling, and drinks. Beach club access included.',
    price: 150,
    duration: '5 hours',
    category: 'relaxation',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    destinationTitle: 'Luxury Dubai Experience'
  },

  // Santorini activities
  {
    title: 'Sunset in Oia Village',
    description: 'Watch the famous Santorini sunset from the best viewpoint in Oia. Includes wine tasting.',
    price: 70,
    duration: '3 hours',
    category: 'relaxation',
    imageUrl: 'https://media.istockphoto.com/id/541132240/photo/oia-at-sunset.jpg?s=612x612&w=0&k=20&c=kql4X3tMkOmYsa4PX45WK7-vHzpOk__IeAaHiz4VfyA=',
    destinationTitle: 'Santorini Sunset Experience'
  },
  {
    title: 'Volcanic Island & Hot Springs Tour',
    description: 'Boat trip to volcanic islands with swimming in natural hot springs. Includes lunch.',
    price: 85,
    duration: '6 hours',
    category: 'adventure',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    destinationTitle: 'Santorini Sunset Experience'
  },
  {
    title: 'Greek Cooking Class & Wine Tasting',
    description: 'Learn to prepare Greek cuisine and taste local wines. Includes 3-course meal with wine pairing.',
    price: 95,
    duration: '5 hours',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561913?w=800&h=600&fit=crop',
    destinationTitle: 'Santorini Sunset Experience'
  },
  {
    title: 'Red Beach Adventure',
    description: 'Visit the unique red sand beach with dramatic cliffs. Swimming and snorkeling included.',
    price: 65,
    duration: '4 hours',
    category: 'nature',
    imageUrl: 'https://www.cestee.com/images/97/87/19787-920w.webp',
    destinationTitle: 'Santorini Sunset Experience'
  },

  // Swiss Alps activities
  {
    title: 'Matterhorn Hiking Adventure',
    description: 'Guided hiking tour to Mount Matterhorn viewpoints. Various difficulty levels available.',
    price: 130,
    duration: 'Full day',
    category: 'adventure',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    destinationTitle: 'Alps Mountain Retreat'
  },
  {
    title: 'Jungfraujoch Glacier Experience',
    description: 'Train to Top of Europe. Experience glaciers, ice palace, and panoramic mountain views.',
    price: 145,
    duration: 'Full day',
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    destinationTitle: 'Alps Mountain Retreat'
  },
  {
    title: 'Alpine Spa & Wellness',
    description: 'Mountain resort spa with natural hot springs, massages, and wellness treatments.',
    price: 110,
    duration: '4 hours',
    category: 'relaxation',
    imageUrl: 'https://images.unsplash.com/photo-1544226278-ca3e0cad00da?w=800&h=600&fit=crop',
    destinationTitle: 'Alps Mountain Retreat'
  },
  {
    title: 'Swiss Alpine Cheese & Wine Tour',
    description: 'Visit traditional cheese farms and local wineries. Tasting and lunch included.',
    price: 95,
    duration: '5 hours',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561913?w=800&h=600&fit=crop',
    destinationTitle: 'Alps Mountain Retreat'
  },

  // Paris activities
  {
    title: 'Louvre Museum Tour',
    description: 'Skip-the-line guided tour of the world\'s greatest art museum. Expert guide shares insider knowledge.',
    price: 85,
    duration: '4 hours',
    category: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    destinationTitle: 'Paris Cultural Journey'
  },
  {
    title: 'Eiffel Tower & Seine River Cruise',
    description: 'Summit access to Eiffel Tower with evening Seine river cruise. Dinner included.',
    price: 120,
    duration: '5 hours',
    category: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    destinationTitle: 'Paris Cultural Journey'
  },
  {
    title: 'French Cooking Class',
    description: 'Learn authentic French cuisine techniques in a professional kitchen. 3-course meal and wine.',
    price: 110,
    duration: '5 hours',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561913?w=800&h=600&fit=crop',
    destinationTitle: 'Paris Cultural Journey'
  },
  {
    title: 'Parisian Cafe & Pastry Tour',
    description: 'Explore historic cafes and patisseries. Taste croissants, macarons, and local coffee.',
    price: 65,
    duration: '3 hours',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1539707588454-54c7a7b1d5c4?w=800&h=600&fit=crop',
    destinationTitle: 'Paris Cultural Journey'
  },

  // Bali activities
  {
    title: 'Tanah Lot Temple & Sunset',
    description: 'Visit iconic sea temple at sunset. Includes cultural ceremony and refreshments.',
    price: 55,
    duration: '3 hours',
    category: 'culture',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    destinationTitle: 'Bali Tropical Paradise'
  },
  {
    title: 'Rice Terraces & Village Tour',
    description: 'Hike through stunning rice terraces, meet local farmers, and learn about traditional farming.',
    price: 65,
    duration: '4 hours',
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    destinationTitle: 'Bali Tropical Paradise'
  },
  {
    title: 'Balinese Spa & Massage Retreat',
    description: 'Traditional Balinese massage, herbal treatments, and wellness therapies. Coconut water included.',
    price: 75,
    duration: '3 hours',
    category: 'relaxation',
    imageUrl: 'https://images.unsplash.com/photo-1544226278-ca3e0cad00da?w=800&h=600&fit=crop',
    destinationTitle: 'Bali Tropical Paradise'
  },
  {
    title: 'Surfing Lessons at Beach Clubs',
    description: 'Learn surfing from professional instructors. Beach lunch and drinks included.',
    price: 85,
    duration: '4 hours',
    category: 'adventure',
    imageUrl: 'https://images.unsplash.com/photo-1579402425046-01c6b98e937e?w=800&h=600&fit=crop',
    destinationTitle: 'Bali Tropical Paradise'
  },
  {
    title: 'Balinese Cooking Class',
    description: 'Cook traditional Balinese dishes in local kitchen. Market tour and 3-course meal included.',
    price: 95,
    duration: '5 hours',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561913?w=800&h=600&fit=crop',
    destinationTitle: 'Bali Tropical Paradise'
  }
];

const seedActivities = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log('Connected to MongoDB');

    // Get all destinations from database
    const destinations = await Destination.find({});
    console.log(`Found ${destinations.length} destinations`);

    // Clear existing activities
    await Activity.deleteMany({});
    console.log('Cleared existing activities');

    // Map destination titles to IDs
    const destMap = {};
    destinations.forEach(dest => {
      destMap[dest.title] = dest._id;
    });

    // Prepare activities with correct destination IDs
    const activitiesWithIds = activitiesData.map(activity => ({
      title: activity.title,
      description: activity.description,
      price: activity.price,
      duration: activity.duration,
      category: activity.category,
      imageUrl: activity.imageUrl,
      destinationId: destMap[activity.destinationTitle]
    })).filter(activity => activity.destinationId); // Filter out activities with no matching destination

    console.log(`Inserting ${activitiesWithIds.length} activities`);

    // Insert activities
    const inserted = await Activity.insertMany(activitiesWithIds);
    console.log(`Successfully inserted ${inserted.length} activities`);

    // Count by category
    const categories = {};
    inserted.forEach(act => {
      categories[act.category] = (categories[act.category] || 0) + 1;
    });

    console.log('\nActivities by category:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });

    console.log('\nDatabase seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedActivities();
