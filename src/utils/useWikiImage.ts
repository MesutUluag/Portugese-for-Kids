import { useEffect, useState } from 'react';

// Module-level cache: term → URL string (or null when Wikipedia has no image)
// Using a sentinel value so we can distinguish "not yet fetched" from "fetched, no image"
const FETCHED_NO_IMAGE = '__NO_IMAGE__';
const cache: Record<string, string | typeof FETCHED_NO_IMAGE> = {};

/**
 * Maps the Word.en value to the best Wikipedia article title for that concept.
 * Needed because the raw en string is often unparseable ("to sit", "big / large",
 * "thank you (m)") or points to a wrong/missing article ("table" → no image).
 */
const WIKI_ARTICLE: Record<string, string> = {
  // ── Core verbs ──────────────────────────────────────────────────────────────
  'to be': 'Person',
  'to be (state)': 'Person',
  'to have': 'Gift',
  'to go': 'Walking',
  'to come': 'Walking',
  'to do / make': 'Cooking',
  'to speak / talk': 'Microphone',
  'to say / tell': 'Microphone',
  'to eat': 'Pizza',
  'to drink': 'Drinking_straw',
  'to sleep': 'Sleep',
  'to wake up': 'Alarm_clock',
  'to see / watch': 'Human_eye',
  'to hear / listen': 'Ear',
  'to read': 'Library',
  'to write': 'Ballpoint_pen',
  'to study': 'Classroom',
  'to work': 'Desk_job',
  'to play': 'Playground',
  'to run': 'Running',
  'to walk': 'Walking',
  'to swim': 'Swimming',
  'to sing': 'Singing',
  'to dance': 'Dancing',
  'to draw': 'Crayon',
  'to buy': 'Shopping',
  'to give': 'Gift',
  'to help': 'Volunteering',
  'to like': 'Hugging',
  'to want': 'Birthday_cake',
  'can / to be able to': 'Arm_wrestling',
  'to know': 'Student',
  'to open': 'Door',
  'to close': 'Door',
  'to start': 'Starting_blocks',
  'to finish': 'Gold_medal',
  'to arrive': 'Bus_station',
  'to leave': 'Luggage',
  'to enter': 'Door',
  'to sit': 'Chair',
  'to ask': 'Conversation',
  'to answer': 'Conversation',
  'to think': 'Brain',
  'to bring': 'Backpack',
  'to stay': 'Camping',
  'to return': 'Home',
  // ── Family ──────────────────────────────────────────────────────────────────
  'father': 'Father',
  'mother': 'Mother',
  'son': 'Boy',
  'daughter': 'Girl',
  'brother': 'Boy',
  'sister': 'Girl',
  'grandfather': 'Old_age',
  'grandmother': 'Senescence',
  'uncle': 'Grandparent',
  'aunt': 'Grandparent',
  'cousin (m)': 'Grandparent',
  'cousin (f)': 'Grandparent',
  'baby': 'Infant',
  'family': 'Nuclear_family',
  'friend (m)': 'Friendship',
  'friend (f)': 'Friendship',
  // ── Animals ─────────────────────────────────────────────────────────────────
  'dog': 'Dog',
  'cat': 'Cat',
  'fish': 'Fish',
  'bird': 'Bird',
  'rabbit': 'Domestic_rabbit',
  'horse': 'Domestic_horse',
  'cow': 'Cattle',
  'pig': 'Domestic_pig',
  'sheep': 'Sheep',
  'chicken': 'Chicken',
  'duck': 'Duck',
  'lion': 'Lion',
  'elephant': 'African_elephant',
  'giraffe': 'Giraffe',
  'monkey': 'Barbary_macaque',
  'bear': 'Brown_bear',
  'frog': 'Common_frog',
  'turtle': 'Green_sea_turtle',
  // ── Food & drink ────────────────────────────────────────────────────────────
  'water': 'Tap_water',
  'milk': 'Milk',
  'juice': 'Juice',
  'bread': 'Bread',
  'rice': 'Cooked_rice',
  'soup': 'Soup',
  'meat': 'Meat',
  'fruit': 'Fruit',
  'apple': 'Apple',
  'banana': 'Banana',
  'orange': 'Orange_(fruit)',
  'carrot': 'Carrot',
  'potato': 'Potato',
  'egg': 'Egg_(food)',
  'cheese': 'Cheese',
  'cake': 'Cake',
  'coffee': 'Coffee',
  'lunch': 'School_lunch',
  'dinner': 'Dinner',
  'breakfast': 'Breakfast',
  // ── Colours — use iconic same-colour objects for child clarity ───────────────
  'red': 'Tomato',
  'blue': 'Blue_jay',
  'green': 'Leaf',
  'yellow': 'Banana',
  'white': 'White_(color)',
  'black': 'Black_cat',
  'pink': 'Flamingo',
  'orange (colour)': 'Pumpkin',
  'purple': 'Lavender',
  // ── Body ────────────────────────────────────────────────────────────────────
  'head': 'Human_face',
  'eye': 'Human_eye',
  'nose': 'Nose',
  'mouth': 'Mouth',
  'ear': 'Ear',
  'hand': 'Hand',
  'foot': 'Human_foot',
  'arm': 'Human_arm',
  'leg': 'Human_leg',
  'hair': 'Human_hair',
  // ── Home ────────────────────────────────────────────────────────────────────
  'house / home': 'House',
  'door': 'Door',
  'window': 'Window',
  'bed': 'Bed',
  'table': 'Dining_table',
  'chair': 'Chair',
  'kitchen': 'Kitchen',
  'bedroom': 'Bedroom',
  'bathroom': 'Bathroom',
  'garden': 'Garden',
  // ── School ──────────────────────────────────────────────────────────────────
  'school': 'Primary_school',
  'teacher (m)': 'Teacher',
  'teacher (f)': 'Teacher',
  'student (m)': 'Student',
  'student (f)': 'Student',
  'book': 'Book',
  'notebook': 'Spiral_notebook',
  'pencil': 'Pencil',
  'pen': 'Pen',
  'backpack': 'Backpack',
  // ── Places ──────────────────────────────────────────────────────────────────
  'city / town': 'City',
  'street': 'Street',
  'park': 'Park',
  'beach': 'Beach',
  'supermarket': 'Supermarket',
  'hospital': 'Hospital',
  'restaurant': 'Restaurant',
  'shop / store': 'Retail',
  // ── Transport ───────────────────────────────────────────────────────────────
  'car': 'Car',
  'bus': 'Bus',
  'train': 'Train',
  'aeroplane': 'Airplane',
  'bicycle': 'Bicycle',
  'boat': 'Boat',
  // ── Adjectives ──────────────────────────────────────────────────────────────
  'big / large': 'Elephant',
  'small / little': 'Mouse',
  'beautiful / pretty': 'Butterfly',
  'ugly': 'Warthog',
  'good': 'Laughing',
  'bad': 'Crying',
  'new': 'Incandescent_light_bulb',
  'old': 'Wrinkle',
  'fast / quick': 'Cheetah',
  'slow': 'Sloth',
  'hot / warm': 'Fire',
  'cold': 'Ice',
  'happy': 'Laughing',
  'sad': 'Crying',
  'tired': 'Yawn',
  'hungry': 'Fasting',
  'thirsty': 'Drinking_water',
  'sick': 'Common_cold',
  'healthy': 'Physical_exercise',
  'tall': 'Giraffe',
  'short': 'Miniature_Dachshund',
  'easy': 'Puzzle',
  'difficult': "Rubik's_cube",
  // ── Time ────────────────────────────────────────────────────────────────────
  'today': 'Calendar',
  'tomorrow': 'Calendar',
  'yesterday': 'Calendar',
  'morning': 'Morning',
  'afternoon': 'Afternoon',
  'night / evening': 'Night_sky',
  'day': 'Calendar',
  'week': 'Calendar',
  'month': 'Calendar',
  'year': 'Year',
  'hour / time': 'Clock',
  // ── Weather ─────────────────────────────────────────────────────────────────
  'sun': 'Sun',
  'rain': 'Rain',
  'snow': 'Snow',
  'wind': 'Wind',
  'cloud': 'Cumulus_cloud',
  'weather': 'Weather',
  // ── Common phrases ───────────────────────────────────────────────────────────
  'hello': 'Wave_(gesture)',
  'goodbye': 'Wave_(gesture)',
  'thank you (m)': 'Handshake',
  'thank you (f)': 'Handshake',
  'please': 'Namaste',
  'sorry / excuse me': 'Namaste',
  'yes': 'Thumbs_up',
  'no': 'Stop_sign',
  'okay / alright': 'Thumbs_up',
  'excuse me': 'Namaste',
};

function wikiArticleForTerm(en: string): string {
  // 1. Check curated override map first
  if (en in WIKI_ARTICLE) return WIKI_ARTICLE[en];
  // 2. Fall back to first word — handles any unlisted term gracefully
  return en.split(/[\s/]/)[0];
}

export function useWikiImage(term: string): string | null {
  // Derive stable initial value from cache so we never call setUrl unnecessarily on mount
  const initialUrl = (() => {
    if (!term) return null;
    const cached = cache[term];
    if (cached === undefined) return null;
    return cached === FETCHED_NO_IMAGE ? null : cached;
  })();

  const [url, setUrl] = useState<string | null>(initialUrl);

  useEffect(() => {
    if (!term) return;

    // Already cached — update state only if value actually differs (avoids re-render loop)
    if (term in cache) {
      const resolved = cache[term] === FETCHED_NO_IMAGE ? null : (cache[term] as string);
      // Use functional form so this is a no-op when value hasn't changed
      setUrl(prev => (prev === resolved ? prev : resolved));
      return;
    }

    const keyword = wikiArticleForTerm(term);

    let cancelled = false;

    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(keyword)}`,
      { headers: { Accept: 'application/json' } },
    )
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        const imgUrl: string | null = data?.thumbnail?.source ?? null;
        cache[term] = imgUrl ?? FETCHED_NO_IMAGE;
        setUrl(imgUrl);
      })
      .catch(() => {
        if (cancelled) return;
        cache[term] = FETCHED_NO_IMAGE;
        setUrl(null);
      });

    return () => { cancelled = true; };
  }, [term]);

  return url;
}
