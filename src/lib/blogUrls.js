export function categorySlug(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function blogPath(page = 1, category = "All") {
  if (category && category !== "All") {
    return `/blog/category/${categorySlug(category)}`;
  }
  return page > 1 ? `/blog/page/${page}` : "/blog";
}