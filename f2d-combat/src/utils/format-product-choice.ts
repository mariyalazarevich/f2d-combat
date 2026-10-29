export function formatProductChoice(name: string, article: string) {
  const trimmedName = name.trim();
  const trimmedArticle = article.trim();

  if (!trimmedName) {
    return trimmedArticle;
  }

  return `${trimmedName} - ${trimmedArticle}`;
}
