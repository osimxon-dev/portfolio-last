// All the real content of the site lives here. Edit this file to update the portfolio.

export const person = {
  firstName: 'Osimxon',
  lastName: 'Dadaxanov',
  age: 14,
  experienceYears: 2,
  roles: ['Web Developer', 'Frontend', 'React & Next.js'],
};

export const stack = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Python'];

export const projects = [
  {
    name: 'DevConnect',
    url: 'https://dev-connect-osimxon.vercel.app/',
    description:
      "A noticeboard for developers. Post what you're building, ask questions with code, pin a project and find teammates for the roles you're missing. Groups and job listings too.",
    tags: ['Web app', 'Community', 'English'],
  },
  {
    name: 'Smena',
    url: 'https://smena-uzb.vercel.app',
    description:
      'Single-day shift work in Tashkent: wedding halls, restaurants, warehouses, pickup points. Time, place and pay are shown upfront. Pick a shift, apply, show up.',
    tags: ['Marketplace', 'Jobs', 'Uzbek'],
  },
  {
    name: 'Yonida',
    url: 'https://yonida-uz.vercel.app/',
    description:
      'Care for parents when their children live far away. A nurse visits regularly, checks blood pressure and medicines, and sends a photo report on Telegram after every visit.',
    tags: ['Landing page', 'Healthcare', 'Uzbek'],
  },
];

// Contact links: shown in the Contact section and the footer.
export const email = 'osimxon992@gmail.com';

export const contacts = [
  { label: 'Email', value: email, href: `mailto:${email}` },
  { label: 'Telegram', value: '@osimxon_00', href: 'https://t.me/osimxon_00' },
  { label: 'Instagram', value: '@dadaxanov.26', href: 'https://www.instagram.com/dadaxanov.26/' },
  { label: 'GitHub', value: 'osimxon992-png', href: 'https://github.com/osimxon992-png' },
];
