export function formatPrice(price: number): string {
  const formatted = new Intl.NumberFormat('ru-RU').format(price);

  return `${formatted} ₽`;
}
