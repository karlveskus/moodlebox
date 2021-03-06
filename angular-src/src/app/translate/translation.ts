import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_TRANS } from './lang-en';
import { LANG_ET_TRANS } from './lang-et';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all translations
const dictionary = {
    'en': LANG_EN_TRANS,
    'et': LANG_ET_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary },
];