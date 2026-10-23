import { popularProducts } from './products';

export interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

interface CategoryMeta {
  id: string;
  name: string;
  icon: string;
}

const categoryMeta: CategoryMeta[] = [
  { id: 'all_categories', name: 'Все категории', icon: 'categories' },
  { id: 'engine', name: 'Двигатели', icon: 'engine' },
  { id: 'fuel', name: 'Топливо', icon: 'fuel' },
  { id: 'bearing', name: 'Подшипники', icon: 'bearing' },
  { id: 'chassis', name: 'Шасси и фурнитура', icon: 'chassis' },
  { id: 'tools', name: 'Инструмент', icon: 'tool' },
  { id: 'electronics', name: 'Электроника', icon: 'chip' },
  { id: 'others', name: 'Прочее', icon: 'box' },
];

function countProducts(categoryId: string): number {
  if (categoryId === 'all_categories') {
    return popularProducts.length;
  }

  return popularProducts.filter(product => product.category.includes(categoryId)).length;
}

export const categories: Category[] = categoryMeta.map(category => ({
  ...category,
  count: countProducts(category.id),
}));
