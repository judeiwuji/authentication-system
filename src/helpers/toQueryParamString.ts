export default function toQueryParamString(query: any) {
  let converted = '';

  for (const [k, v] of Object.entries(query)) {
    if (v) {
      converted += converted ? `&${k}=${v}` : `${k}=${v}`;
    }
  }
  return converted ? `?${converted}` : '';
}
