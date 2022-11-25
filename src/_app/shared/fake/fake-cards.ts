import { nanoid } from 'nanoid'

import { LookingFor } from '@@/domain/profiles'

const NAMES = [
  'Venera',
  'Sofiya',
  'Ekaterina',
  'Ema',
  'Nika ',
  'Larisa',
  'Vladěna',
  'Anastazie',
  'Romana',
  'Alina',
  'Dana',
  'Jarmila',
  'Lizaveta',
  'Martina',
  'Selena',
]

const LOCATIONS = [
  'Santiago',
  'Bucharest',
  'Havana',
  'Mandalay',
  'Quanzhou',
  'San Antonio',
  'Tbilisi',
  'London',
]

const TAGS = [
  'SelfCare',
  'Calligraphy',
  'Meditation',
  'Sushi',
  'Hockey',
  'Basketball',
  'HomeWorkout',
  'Manga',
  'Makeup',
  'Aquarium',
  'Instagram',
  'MartialArts',
  'Marvel',
  'Jogging',
  'Running',
  'Travel',
  'Languages',
  'Movies',
  'Gym',
  'SocialNetworks',
  'SkinCare',
  'Cricket',
  'Skateboard',
  'Vegan',
  'KPop',
  'Photography',
  'Reading',
  'Vocals',
  'Volleyball',
  'Sports',
  'Poetry',
  'StandUp',
  'Coffee',
  'Dota2',
  'Karaoke',
  'Fortnite',
  'Pubg',
  'Diving',
  'NFT',
  'AlcoholicTrip',
  'Baseball',
  'Ballet',
  'Feminism',
  'Quests',
  'Shopping',
  'Food',
  'Clothes',
  'Memes',
  'CountryMusic',
  'Motorsports',
  'Football',
  'ACapella',
  'Investment',
  'GalleryOfArts',
  'Hiking',
  'Mountains',
  'Bowing',
  'Talkiiing',
  'Fishing',
  'IceCream',
  'Skates',
  'Parties',
  'Skiing',
  'Snowboarding',
  'Pilates',
  'Clubs',
  'Broadway',
  'Cheerleading',
  'Choir',
  'AutoRacing',
  'BikeRacing',
  'Content',
  'Cybersports',
  'Concerts',
  'RockClimbing',
  'Bakery',
  'Camping',
  'Blogging',
  'Collecting',
  'RussianRap',
  'RussianRock',
  'Automobiles',
  'Startups',
  'BubbleTea',
  'Series',
  'Songwriting',
  'Tattoos',
  'Drawing',
  'SupSurfing',
  'Surfing',
  'Bambindon',
  'Bowling',
  'ActiveLifestyle',
  'Fashion',
  'Anime',
  'Astrology',
  'MBTI',
  'Entrepreneurship',
  'Cooking',
  'Fencing',
  'Soccer',
  'Arts',
  'DIY',
  'Politics',
  'Museums',
  'OutdoorWorkouts',
  'TikTok',
  'Activism',
  'Picnic',
  'Twitch',
  'Comedy',
  'Music',
  'Triathlon',
  'Netflix',
  'Disney',
  'RealEstate',
  'Podcasts',
  'Rave',
  'BBQ',
  'BBC',
  'CraftBeer',
  'Swimming',
  'Cryptocurrency',
  'ColdTea',
  'Drums',
  'Tea',
  'TableGames',
  'Quiz',
  'Volunteering',
  'TableTennis',
  'RollerSkating',
  'Wine',
  'Linux',
  'DungeonsAndDragons',
  'ElectronicMusic',
  'Yoga',
  'Boxing',
  'Ramen',
]

const random = (to: number) => Math.floor(Math.random() * to)

const getRandomFrom = <T>(arr: T[]) => arr.at(random(arr.length))!

const getRandomTags = () => {
  const highlightedCount = random(2) + 1

  return Array.from({ length: 5 }, (_, i) => ({
    tag: getRandomFrom(TAGS),
    isHighlighted: i < highlightedCount,
  }))
}

export const getFakeCard = () => ({
  id: nanoid(5),
  coverImageUrl: `https://picsum.photos/720/1280?${nanoid(5)}`,
  name: getRandomFrom(NAMES),
  age: random(5) + 18,
  location: getRandomFrom(LOCATIONS),
  tags: getRandomTags(),
  lookingFor: getRandomFrom(Object.values(LookingFor)) as LookingFor,
})
