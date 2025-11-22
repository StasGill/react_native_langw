import { useAppSelector } from "../store/hooks";
import { translations } from "../constants/translations";

export function useTranslation() {
  const { sourceLanguage } = useAppSelector((state) => state.user);
  return translations[sourceLanguage] || translations.en;
}
