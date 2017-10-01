export default function makeSlug(string) {
  return string.replace(/\s+/g, '-').toLowerCase();
}
