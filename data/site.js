// All the real content of the site lives here. Edit this file to update the portfolio.

export const person = {
  firstName: 'Osimxon',
  lastName: 'Dadaxanov',
  age: 14,
  experienceYears: 2,
};

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------
export const email = 'osimxon992@gmail.com';
export const telegram = 'https://t.me/osimxon_00';

/** A Telegram link that opens a chat with the message already typed. */
export const telegramWith = (text) => `${telegram}?text=${encodeURIComponent(text)}`;

/** Every "Request a website" button opens this chat. */
export const requestLink = telegramWith("Hi, I'd like to request a website.");

export const contacts = [
  { label: 'Telegram', value: '@osimxon_00', href: telegram },
  { label: 'Email', value: email, href: `mailto:${email}` },
  { label: 'Instagram', value: '@dadaxanov.26', href: 'https://www.instagram.com/dadaxanov.26/' },
  { label: 'GitHub', value: 'osimxon992-png', href: 'https://github.com/osimxon992-png' },
];

// ---------------------------------------------------------------------------
// Live projects (the Work section opens each one inside a browser frame)
// ---------------------------------------------------------------------------
export const projects = [
  {
    name: 'Smena',
    url: 'https://smena-uzb.vercel.app',
    poster: '/work/smena-uzb.png',
    line: 'One-day shift jobs in Tashkent, with time, place and pay shown upfront.',
    tags: ['Marketplace', 'Jobs', 'Uzbek'],
  },
  {
    name: 'Yonida',
    url: 'https://yonida-uz.vercel.app',
    poster: '/work/yonida-uz.png',
    line: 'A landing page for nurse visits to parents whose children live far away.',
    tags: ['Landing page', 'Healthcare', 'Uzbek'],
  },
  {
    name: 'DevConnect',
    url: 'https://dev-connect-osimxon.vercel.app',
    poster: '/work/dev-connect-osimxon.png',
    line: 'A noticeboard where developers post projects, ask code questions and find teammates.',
    tags: ['Web app', 'Community', 'English'],
  },
];

// ---------------------------------------------------------------------------
// Prices (USD). The price builder adds the extras to the base price.
// ---------------------------------------------------------------------------
export const siteTypes = [
  {
    id: 'landing',
    name: 'Landing page',
    base: 40,
    days: [2, 3],
    line: 'One clear page that makes people message you.',
    unitName: 'Extra pages',
    unitPrice: 10,
    maxUnits: 2,
    gallery: true,
  },
  {
    id: 'business',
    name: 'Business website',
    base: 100,
    days: [5, 7],
    line: 'Up to 5 pages for a cafe, shop, course or studio.',
    unitName: 'Extra pages',
    unitPrice: 10,
    maxUnits: 10,
    gallery: true,
  },
  {
    id: 'app',
    name: 'Web app',
    base: 250,
    days: [10, 14],
    line: "Accounts, forms and a dashboard in React and Next.js. A big backend is priced case by case, as I'm still learning Node.js.",
    unitName: 'Extra screens',
    unitPrice: 20,
    maxUnits: 10,
    gallery: false,
  },
];

export const extras = { secondLanguage: 15, gallery: 10 };

// ---------------------------------------------------------------------------
// The website generator in the first screen: one sample site per kind of business.
// The texts are samples; a real site gets the client's own texts, photos and prices.
// ---------------------------------------------------------------------------
export const siteKinds = [
  {
    id: 'cafe',
    label: 'Cafe',
    sample: 'Nur Cafe',
    word: 'cafe',
    en: {
      tag: 'Fresh coffee and breakfast, every morning.',
      cta: 'Book a table',
      cards: ['Menu', 'Opening hours', 'Book a table'],
      bodies: ['Coffee, tea and desserts, written up with prices.', 'Days and hours, so guests know when to come.', 'A table request that reaches you in a message.'],
      widget: ['Open today', '8:00 – 22:00'],
    },
    uz: {
      tag: 'Har tong yangi qahva va nonushta.',
      cta: 'Stol band qilish',
      cards: ['Menyu', 'Ish vaqti', 'Stol band qilish'],
      bodies: ['Qahva, choy va shirinliklar narxlari bilan.', 'Kunlar va soatlar: mehmon qachon kelishini biladi.', 'Stol so‘rovi sizga xabar bo‘lib keladi.'],
      widget: ['Bugun ochiq', '8:00 – 22:00'],
    },
  },
  {
    id: 'barber',
    label: 'Barbershop',
    sample: 'Sharp Barbers',
    word: 'barbershop',
    en: {
      tag: 'Clean cuts and sharp beards.',
      cta: 'Book a visit',
      cards: ['Haircuts', 'Prices', 'Book a visit'],
      bodies: ['Every cut and beard trim, listed.', 'A clear price for each service.', 'Pick a day and send the request.'],
      widget: ['Next free slot', 'Today, 15:30'],
    },
    uz: {
      tag: 'Toza soch va aniq soqol.',
      cta: 'Yozilish',
      cards: ['Soch olish', 'Narxlar', 'Yozilish'],
      bodies: ['Har bir xizmat ro‘yxatda.', 'Har bir xizmatning aniq narxi.', 'Kunni tanlang va so‘rov yuboring.'],
      widget: ['Eng yaqin bo‘sh vaqt', 'Bugun, 15:30'],
    },
  },
  {
    id: 'clinic',
    label: 'Clinic',
    sample: 'Shifo Clinic',
    word: 'clinic',
    en: {
      tag: 'Book a doctor’s visit in a minute.',
      cta: 'Book an appointment',
      cards: ['Services', 'Doctors', 'Book an appointment'],
      bodies: ['What the clinic treats, in plain words.', 'Who you will see, and what they do.', 'Send a request for a visit.'],
      widget: ['Appointments', 'Monday to Saturday'],
    },
    uz: {
      tag: 'Bir daqiqada shifokor qabuliga yoziling.',
      cta: 'Qabulga yozilish',
      cards: ['Xizmatlar', 'Shifokorlar', 'Qabulga yozilish'],
      bodies: ['Klinika nimani davolashi, oddiy so‘zlar bilan.', 'Kim qabul qiladi va nima qiladi.', 'Qabul uchun so‘rov yuboring.'],
      widget: ['Qabul', 'Dushanbadan shanbagacha'],
    },
  },
  {
    id: 'shop',
    label: 'Shop',
    sample: 'Bozor Shop',
    word: 'shop',
    en: {
      tag: 'New arrivals, ready to order.',
      cta: 'Order now',
      cards: ['New in', 'Delivery', 'Order now'],
      bodies: ['The latest products with price and photo.', 'Where you deliver and how long it takes.', 'Customers order in one message.'],
      widget: ['Delivery', 'Across the city in a day'],
    },
    uz: {
      tag: 'Yangi tovarlar, buyurtmaga tayyor.',
      cta: 'Buyurtma berish',
      cards: ['Yangi tovarlar', 'Yetkazib berish', 'Buyurtma berish'],
      bodies: ['Yangi mahsulotlar narxi va rasmi bilan.', 'Qayerga va qancha vaqtda yetkaziladi.', 'Mijoz bitta xabarda buyurtma beradi.'],
      widget: ['Yetkazib berish', 'Shahar bo‘ylab bir kunda'],
    },
  },
  {
    id: 'course',
    label: 'Courses',
    sample: 'Bilim Center',
    word: 'learning center',
    en: {
      tag: 'Classes for every level, starting each month.',
      cta: 'Join a class',
      cards: ['Courses', 'Schedule', 'Join a class'],
      bodies: ['Each course with its teacher and price.', 'Days, times and group sizes.', 'Parents or students sign up online.'],
      widget: ['Next group', 'Starts on Monday'],
    },
    uz: {
      tag: 'Har bir daraja uchun darslar, har oy boshlanadi.',
      cta: 'Darsga yozilish',
      cards: ['Kurslar', 'Jadval', 'Darsga yozilish'],
      bodies: ['Har bir kurs o‘qituvchisi va narxi bilan.', 'Kunlar, vaqtlar va guruh hajmi.', 'Ota-ona yoki o‘quvchi onlayn yoziladi.'],
      widget: ['Yangi guruh', 'Dushanba kuni boshlanadi'],
    },
  },
];

// ---------------------------------------------------------------------------
// How a project goes, and the tools I build with
// ---------------------------------------------------------------------------
export const steps = [
  { title: 'Tell me what you need', text: 'Write on Telegram what your business does and what the site should do.' },
  { title: 'Get a price and a date', text: 'I answer with the exact price and timeline in one message.' },
  { title: 'Review a working version', text: 'You open it on your own phone and tell me what to change.' },
  { title: 'Go live', text: 'I publish the site on Vercel and send you the link.' },
];

// `mono: true` marks one-colour logos that turn white on the dark theme.
export const tools = [
  { name: 'HTML', icon: '/icons/html-5.svg' },
  { name: 'CSS', icon: '/icons/css.svg' },
  { name: 'JavaScript', icon: '/icons/javascript.svg' },
  { name: 'React', icon: '/icons/react.svg' },
  { name: 'Next.js', icon: '/icons/nextjs-icon.svg', mono: true },
  { name: 'Node.js, learning', icon: '/icons/nodejs-icon.svg' },
  { name: 'Python', icon: '/icons/python.svg' },
  { name: 'GitHub', icon: '/icons/github-icon.svg', mono: true },
  { name: 'Vercel', icon: '/icons/vercel-icon.svg', mono: true },
];
