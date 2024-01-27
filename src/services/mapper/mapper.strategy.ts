import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {AbstractMapper} from "@/services/mapper/AbstractMapper.ts";
import {EnglishMapper} from "@/services/mapper/EnglishMapper.ts";
import {GermanMapper} from "@/services/mapper/GermanMapper.ts";


export const chooseMapper = (lang: SUPPORTED_LANGUAGES): AbstractMapper => {
    switch (lang) {
        case SUPPORTED_LANGUAGES.EN:
            return new EnglishMapper();
        case SUPPORTED_LANGUAGES.DE:
            return new GermanMapper();
        default:
            throw new Error(`No mapper for language ${lang}`);
    }
}