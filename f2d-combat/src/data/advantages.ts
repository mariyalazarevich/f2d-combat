export interface Advantage {
  id: string;
  title: string;
  icon: string;
}

export const advantages: Advantage[] = [
  { id: 'originality', title: 'Оригинальные комплектующие', icon: 'parts' },
  { id: 'quality', title: 'Проверенное качество', icon: 'shield' },
  { id: 'delivery', title: 'Отправка по Беларуси и России', icon: 'truck' },
  { id: 'support', title: 'Активное сообщество', icon: 'headset' },
];
