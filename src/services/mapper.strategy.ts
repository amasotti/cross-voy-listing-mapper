import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {AbstractMapper} from "@/services/AbstractMapper.ts";
import {EnglishMapper} from "@/services/EnglishMapper.ts";


export const chooseMapper = (lang: SUPPORTED_LANGUAGES): AbstractMapper => {
    switch (lang) {
        case SUPPORTED_LANGUAGES.EN:
            return new EnglishMapper();
        default:
            throw new Error(`No mapper for language ${lang}`);
    }
}