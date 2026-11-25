import { person } from '@/data/site';
import LogoMark from './LogoMark';

export default function Logo() {
  return (
    <a className="logo" href="#top" aria-label={`${person.firstName} ${person.lastName}, top of page`}>
      <LogoMark />
      <span className="logo__name">
        {person.firstName} {person.lastName}
      </span>
    </a>
  );
}
