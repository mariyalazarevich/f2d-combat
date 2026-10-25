export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface ContactItem {
  id: string;
  label: string;
  value: string;
  href: string;
  note?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'О нас', href: '#about' },
  { id: 'catalog', label: 'Каталог', href: '#catalog' },
  { id: 'order', label: 'Оформить заказ', href: '#order' },
];

export const contacts: ContactItem[] = [
  {
    id: 'phone',
    label: 'Телефон',
    value: '+7 (900) 000-00-00',
    href: 'tel:+79000000000',
    note: 'ежедневно с 9:00 до 18:00 (МСК)',
  },
  {
    id: 'email',
    label: 'Почта',
    value: 'info@f2d-combat.ru',
    href: 'mailto:info@f2d-combat.ru',
  }
];

export const socialLinks: SocialLink[] = [
  { id: 'telegram', label: 'Telegram', href: '#', icon: 'telegram' },
  { id: 'youtube', label: 'YouTube', href: '#', icon: 'youtube' },
  { id: 'vk', label: 'ВКонтакте', href: '#', icon: 'vk' },
];
