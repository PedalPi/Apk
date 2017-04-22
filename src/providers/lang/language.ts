export class LanguageService {
  public static languages = {
    'en': 'English',
    'en-US': 'English',
    'es': 'Espanõl',
    'pt-BR': 'Português (BR)'
  }

  public static navigatorLanguage() {
    if (LanguageService.isValid(navigator.language))
      return navigator.language;
    else
      return 'en';
  }

  public static isValid(languageKey) : boolean {
    return LanguageService.languages[languageKey] != undefined;
  }
}
