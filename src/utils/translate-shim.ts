export function useTranslation(ns?: string) {
  return {
    t: (key: string) => key,
    lang: 'ar',
  };
}

export const setLanguage = async (lang: string) => {
  return true;
};

export default useTranslation;
