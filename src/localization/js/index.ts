export const getLocalization = async (locale: string): Promise<Localization> => {
  try {
    return import(/* webpackChunkName: 'js-localization' */ `./${locale}.json`);
  } catch {
    console.warn("Localization language not supported", locale);
    return import(/* webpackChunkName: 'js-localization-en' */ `./en.json`);
  }
};
