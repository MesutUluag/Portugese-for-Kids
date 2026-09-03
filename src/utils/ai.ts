import { StoryPage, templatePagesByContext } from '../data/words';

export type AiState = 'backend' | 'template' | null;
export type StoryContext =
  | 'school'
  | 'restaurant'
  | 'bank'
  | 'hospital'
  | 'cafe'
  | 'airport'
  | 'market'
  | 'aima'
  | 'bus'
  | 'pharmacy'
  | 'gas_station'
  | 'traffic';

const BACKEND_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8081/api/story'
  : 'https://portugese-for-kids-backend-784137631227.us-central1.run.app/api/story';

const CONTEXT_TOPICS: Record<StoryContext, readonly string[]> = {
  school: [
    'greeting the teacher in the morning or afternoon',
    'greeting and saying goodbye to classmates',
    'introducing yourself with your name age and where you are from',
    'answering simple classroom questions with yes no or a short answer',
    'asking what a word or instruction means',
    'asking to repeat or speak more slowly',
    'saying you are ready or have finished',
    'saying you do not understand',
    'asking for help with schoolwork',
    'asking to borrow a pencil rubber or ruler',
    'asking where a book notebook or bag is',
    'talking to a friend at break time or in the playground',
    'asking a friend to play or sit together',
    'talking at lunch about food or the day',
    'talking about feelings such as happy sad nervous or tired',
    'complimenting a classmate on their work',
    'apologising to a classmate or teacher',
    'asking what page or exercise to do',
    'saying you forgot something at home',
    'hearing a teacher command such as sit down stand up listen open your book look at the board write your name raise your hand come here line up or be quiet',
  ],
  restaurant: [
    'greeting the waiter',
    'asking for a table for a specific number of people',
    'saying you have a reservation',
    'asking for the menu',
    'asking what something on the menu is',
    'asking if a dish contains a specific ingredient',
    'asking for a recommendation from the waiter',
    'ordering a starter such as soup or salad',
    'ordering a main course such as fish chicken or pasta',
    'ordering a dessert such as ice cream or cake',
    'ordering a drink such as juice water or milk',
    'saying you are hungry or thirsty',
    'asking for more water or bread',
    'asking for a different dish because you changed your mind',
    'asking how long the food will take',
    'saying you like or do not like a dish',
    'saying the food is too hot or too cold',
    'saying the food is delicious',
    'asking for the bill',
    'asking if you can pay by card',
    'saying you have finished eating',
    'saying thank you to the waiter and goodbye',
  ],
  bank: [
    'greeting the bank teller',
    'asking where to take a number ticket to wait your turn',
    'asking how long the wait is',
    'saying you need help',
    'asking about opening and closing hours',
    'asking where the ATM is',
    'asking how to use the ATM',
    'saying you want to withdraw money',
    'saying you want to deposit money',
    'saying you want to open a bank account',
    'asking about the balance on your account',
    'asking for a receipt or bank statement',
    'asking what a word or form means',
    'asking someone to explain more slowly',
    'saying you do not understand',
    'asking where to sign a form',
    'saying thank you and goodbye',
  ],
  hospital: [
    'greeting the doctor or nurse',
    'checking in at the reception desk and giving your name',
    'saying you have an appointment',
    'asking where the waiting room is',
    'asking how long you have to wait',
    'saying your name age and date of birth',
    'saying where it hurts such as head throat stomach ear or leg',
    'describing the pain as sharp dull or constant',
    'saying you have a fever cough rash or feel sick',
    'saying you cannot sleep or eat',
    'asking the doctor a simple question about the diagnosis',
    'understanding a simple instruction from the doctor such as open your mouth or breathe deeply',
    'saying you are scared or nervous',
    'asking if you need a medicine or injection',
    'asking how many days you need to rest',
    'asking if you can go back to school',
    'asking where the pharmacy is',
    'saying thank you to the doctor or nurse and goodbye',
  ],
  cafe: [
    'greeting the barista or waiter',
    'asking for a table inside or outside',
    'ordering a coffee such as um café um galão or um meia de leite',
    'ordering a tea or hot chocolate',
    'ordering a juice such as orange or pineapple',
    'ordering a snack such as a torrada tosta mista or pastel de nata',
    'asking what is available or what the daily special is',
    'asking if something contains milk nuts or allergens',
    'asking the price of a drink or snack',
    'asking for the Wi-Fi password',
    'asking for the bill',
    'paying with cash or card',
    'asking for a receipt',
    'saying the coffee is too hot too cold or too strong',
    'complimenting the food or drink',
    'saying thank you and goodbye',
  ],
  airport: [
    'greeting at the check-in desk',
    'asking where the check-in counters are',
    'saying how many bags you are checking in',
    'saying your bag is too heavy',
    'asking where to drop off luggage',
    'asking where the security check is',
    'asking where the gate is',
    'saying you have a boarding pass on your phone or paper',
    'asking when boarding starts',
    'asking how long the flight is',
    'asking for a window or aisle seat',
    'asking where the bathroom is at the airport',
    'saying you are hungry or thirsty at the airport',
    'asking where a café or restaurant is in the airport',
    'understanding a boarding announcement over the speaker',
    'asking a flight attendant for something on the plane such as water or a blanket',
    'saying you feel sick on the plane',
    'asking where to collect luggage on arrival',
    'asking where the taxi or metro is after landing',
    'saying goodbye at the airport to a family member',
  ],
  market: [
    'greeting the shopkeeper or cashier',
    'asking where a specific product or aisle is',
    'asking where the fruit vegetables meat fish dairy or bread section is',
    'asking the price of something',
    'asking if there is a discount or offer',
    'asking for a specific fruit or vegetable by name',
    'saying how many items or how much weight you want',
    'asking if something is organic or local',
    'asking if something is fresh or when it expires',
    'saying you do not want something or changed your mind',
    'asking for a smaller or larger quantity',
    'saying something is too expensive',
    'asking if they accept card payment',
    'asking for a bag or box',
    'asking for a receipt',
    'saying you forgot something and need to go back',
    'paying and asking for change',
    'saying thank you and goodbye to the cashier',
  ],
  aima: [
    'greeting the officer at the counter',
    'saying you have an appointment and giving the date and time',
    'giving your full name and date of birth',
    'saying which country you are from and your nationality',
    'saying why you are there such as residency permit family reunification or document renewal',
    'asking where to take a number ticket',
    'asking how long the wait is',
    'asking where to hand in documents',
    'asking which documents are needed',
    'saying you have all the required documents',
    'saying a document is missing and asking what to do',
    'saying you do not understand a question or instruction',
    'asking someone to repeat or speak more slowly',
    'asking someone to write it down',
    'saying you need a translator or interpreter',
    'asking what the next step is and when to come back',
    'saying you need a form and asking where to get one',
    'asking about the status of your application',
    'saying thank you and goodbye',
  ],
  bus: [
    'greeting the bus driver',
    'asking if the bus goes to a specific place or neighbourhood',
    'asking which bus number goes to a destination',
    'asking where the nearest bus stop is',
    'asking when the next bus arrives or departs',
    'asking how often the bus runs',
    'buying a single or return ticket',
    'asking the price of a ticket',
    'asking where to validate or scan the ticket',
    'asking how many stops until your destination',
    'asking a fellow passenger if the seat is free',
    'asking the driver to stop or ring the bell',
    'saying you want to get off at the next stop',
    'asking for help because you are lost',
    'saying you took the wrong bus',
    'asking where to transfer to another bus or metro',
    'asking if the bus is running on Sunday or a holiday',
    'saying thank you to the driver when leaving',
  ],
  pharmacy: [
    'greeting the pharmacist',
    'saying you have a prescription from the doctor',
    'asking for a specific medicine by name',
    'asking if a medicine is available without a prescription',
    'asking for something for a cold cough fever headache or stomach ache',
    'asking for something for a sore throat or earache',
    'asking for a bandage plaster or antiseptic cream',
    'asking for sunscreen or insect repellent',
    'asking for vitamins or supplements for children',
    'saying where it hurts to explain what you need',
    'asking what a medicine is used for',
    'asking how many times a day to take a medicine',
    'asking if a medicine can be taken with food',
    'asking if a medicine is safe for children or babies',
    'asking about side effects',
    'asking the price of a medicine',
    'asking if they have a cheaper generic version',
    'asking if the pharmacist can recommend something',
    'saying thank you and goodbye',
  ],
  gas_station: [
    'greeting the attendant',
    'asking to fill up the tank completely',
    'asking to put a specific amount of fuel such as twenty euros worth',
    'asking which fuel type is correct for your car such as gasoline or diesel',
    'asking the price per litre of fuel',
    'saying which pump number you used when paying',
    'asking where to pay inside or at the machine',
    'asking if they accept card or only cash',
    'asking for a receipt',
    'asking where the bathroom is',
    'asking if there is a shop or café inside',
    'buying a snack drink or coffee inside the shop',
    'asking for air for the tyres and where the air pump is',
    'asking for a road map or directions to a place',
    'asking if there is a car wash',
    'asking if there is a problem with the car and where a mechanic is',
    'saying thank you and goodbye',
  ],
  traffic: [
    'asking if we are nearly there yet',
    'asking how many more minutes or kilometres until we arrive',
    'saying there is a lot of traffic or a traffic jam',
    'asking how long the journey will take',
    'saying you are bored and asking for something to do',
    'saying you need to stop urgently',
    'asking to stop for the bathroom',
    'saying you feel sick or dizzy in the car',
    'asking for some water or a snack',
    'asking where to park when arriving somewhere',
    'asking if parking is free or paid',
    'saying the car needs petrol or is almost empty',
    'asking what a road sign means',
    'asking for directions to turn left right or go straight',
    'using a GPS or map app and reading out instructions',
    'saying you missed the turn or took the wrong road',
    'saying you are lost and asking for help',
    'saying the seatbelt is on',
    'asking how fast the car is going',
    'saying you see a police car or ambulance',
  ],
};

export async function initAI(
  onStatusChange: (text: string, color: string) => void
): Promise<AiState> {
  onStatusChange('🤖 Backend AI', '#8b5cf6');
  return 'backend';
}

function parseStoryJson(raw: string): StoryPage {
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON found');
  return JSON.parse(match[0]) as StoryPage;
}

async function fetchWithTimeout(url: string, options: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

async function fetchBackendStory(
  context: StoryContext = 'school',
  previousSentence?: string,
  conversationHistory?: string[],
): Promise<StoryPage> {
  const body: Record<string, unknown> = { context };
  if (previousSentence) {
    // Reply turn: send a neutral instruction as the prompt so the sentence is not
    // duplicated in the assembled user message. The backend appends the previous
    // sentence itself via the previousSentence field.
    body.prompt = 'Continue the conversation.';
    body.previousSentence = previousSentence;
  } else {
    // First turn: pick a random topic to seed the sentence.
    const topics = CONTEXT_TOPICS[context];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    body.prompt = `Generate one sentence about ${topic}.`;
  }
  if (conversationHistory && conversationHistory.length > 0) {
    body.conversationHistory = conversationHistory;
  }
  const res = await fetchWithTimeout(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }, 25000);

  if (!res.ok) throw new Error(`Backend AI error: ${res.status}`);
  const data = await res.json() as { content?: string };
  return parseStoryJson(data.content ?? '');
}

function generateTemplateStoryPage(context: StoryContext = 'school'): StoryPage {
  const pages = templatePagesByContext[context] ?? templatePagesByContext.school;
  return pages[Math.floor(Math.random() * pages.length)];
}

export async function getNewStoryPage(
  aiState: AiState,
  onStatusChange: (text: string, color: string) => void,
  context: StoryContext = 'school',
  previousSentence?: string,
  conversationHistory?: string[],
): Promise<StoryPage> {
  if (aiState === 'backend') {
    try {
      return await fetchBackendStory(context, previousSentence, conversationHistory);
    } catch (e) {
      console.warn('Backend story failed, falling back to template:', e);
      onStatusChange('🧩 Template Engine (Backend AI failed)', '#0284c7');
    }
  }

  return generateTemplateStoryPage(context);
}
