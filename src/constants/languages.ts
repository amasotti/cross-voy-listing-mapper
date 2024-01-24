import {Options} from "@/types/options.ts";

export enum SUPPORTED_LANGUAGES {
    IT = 'it',
    EN = 'en',
    FR = 'fr',
    DE = 'de',
    RU = 'ru',
}

export const languages: Options[] = [
    {id: 1, value: SUPPORTED_LANGUAGES.IT, label: 'Italian'},
    {id: 2, value: SUPPORTED_LANGUAGES.EN, label: 'English'},
    // {id: 3, value: 'fr', label: 'French'},
    // {id: 4, value: 'de', label: 'German'},
    // {id: 5, value: SUPPORTED_LANGUAGES.RU, label: 'Russian'},
]