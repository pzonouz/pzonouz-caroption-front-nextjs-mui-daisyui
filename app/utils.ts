export const Slugify = (str: string) =>
  str
    .toString()
    .trim()
    .toLowerCase()
    // .normalize("NFD")
    // .replace(/[\u0300-\u036f]/g, "")
    // .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(" ", "_");
