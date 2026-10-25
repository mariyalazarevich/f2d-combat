export interface Category {
  id: string;
  name: string;
  icon: string;
}

const categoryMeta: Category[] = [
  { id: 'all_categories', name: 'Все категории', icon: 'categories' },
  { id: 'engine', name: 'Двигатели', icon: 'engine' },
  { id: 'fuel', name: 'Топливо', icon: 'fuel' },
  { id: 'bearing', name: 'Подшипники', icon: 'bearing' },
  { id: 'chassis', name: 'Шасси и фурнитура', icon: 'chassis' },
  { id: 'tools', name: 'Инструмент', icon: 'tool' },
  { id: 'electronics', name: 'Электроника', icon: 'chip' },
  { id: 'others', name: 'Прочее', icon: 'box' },
];

export const categories: Category[] = categoryMeta;
