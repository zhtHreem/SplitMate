export interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: 'Home', href: '/home' },
  { label: 'About', href: '/aboutus' },
  { label: 'Contact', href: '/contact' },
];

export default navLinks;
