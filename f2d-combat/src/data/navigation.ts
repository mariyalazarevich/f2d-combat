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
    value: '+375 (29) 648-88-79',
    href: 'tel:+375296488879',
    note: 'ежедневно с 9:00 до 18:00 (МСК)',
  },
  {
    id: 'email',
    label: 'Почта',
    value: 'mr.f2dcombat@mail.ru',
    href: 'mailto:mr.f2dcombat@mail.ru',
  }
];

export const socialLinks: SocialLink[] = [
  { id: 'vk', label: 'ВКонтакте', href: 'https://m.vk.ru/f2d_combat', icon: 'vk' },
];
