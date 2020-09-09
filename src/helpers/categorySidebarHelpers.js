export function filterByCategory(categoryFilter, allModules) {
  return categoryFilter === 'all' ?
    allModules :
    allModules.filter(({ moduleCategories }) =>
      moduleCategories.find(({ id }) => id === parseInt(categoryFilter, 10)));
}

export function filterBySearchInput(searchInput, allModules) {
  return !searchInput ?
    allModules.filter(({ name, description }) =>
      name.toLowerCase().includes(searchInput.toLowerCase()) ||
        description.toLowerCase().includes(searchInput.toLowerCase()))
    :
    allModules;
}
