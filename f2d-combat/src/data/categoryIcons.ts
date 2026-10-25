import allCategoriesIcon from '../assets/all_categories.svg';
import bearingIcon from '../assets/bearing.svg';
import chassisIcon from '../assets/chassis.svg';
import electronicsIcon from '../assets/electronics.svg';
import engineIcon from '../assets/engine.svg';
import fuelIcon from '../assets/fuel.svg';
import othersIcon from '../assets/others.svg';
import toolsIcon from '../assets/tools.svg';

export const categoryIcons: Record<string, string> = {
  all_categories: allCategoriesIcon,
  bearing: bearingIcon,
  chassis: chassisIcon,
  electronics: electronicsIcon,
  engine: engineIcon,
  fuel: fuelIcon,
  others: othersIcon,
  tools: toolsIcon,
};

export function getCategoryIcon(categoryId: string) {
  return categoryIcons[categoryId] ?? allCategoriesIcon;
}
