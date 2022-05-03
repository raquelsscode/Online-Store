export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const requestJson = await request.json();
  const result = requestJson;
  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const requestJson = await request.json();
  const result = requestJson;
  return result;
}

export async function getProductById(id) {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  const request = await fetch(endpoint);
  const requestJson = await request.json();
  const result = requestJson;
  return result;
}
