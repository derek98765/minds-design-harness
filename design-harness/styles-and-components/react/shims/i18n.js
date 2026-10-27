// Stand-in for react-i18next. The harness ships English only: `t` returns the
// key (the frontend's keys ARE the English copy) with {{vars}} filled in.
const fill = (key, opts = {}) =>
  String(key).replace(/{{\s*(\w+)\s*}}/g, (_, k) => (opts[k] ?? "").toString());

export function useTranslation() {
  return { t: fill, i18n: { language: "en", changeLanguage: () => {} } };
}

export function Trans({ i18nKey, children, values }) {
  return children ?? fill(i18nKey, values);
}
