export class LanguageService {
  public static languages = {
    'en': {
      file: 'en',
      language: 'English'
    },
    'en-US': {
      file: 'en',
      language: 'English'
    },
    'es': {
      file: 'es',
      language: 'Espanõl'
    },
    'pt-BR': {
      file: 'pt-BR',
      language: 'Português (BR)'
    },
  }

  public static navigatorLanguage() {
    if (LanguageService.isValid(navigator.language))
      return LanguageService.languages[navigator.language].file;
    else
      return 'en';
  }

  public static isValid(languageKey) : boolean {
    return LanguageService.languages[languageKey] != undefined;
  }
}
