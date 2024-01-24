import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";

export type ListingParams = {
    [key: string]: ParamLocalLabel

}

export type ParamLocalLabel = {
    [key in SUPPORTED_LANGUAGES]: string;
}
