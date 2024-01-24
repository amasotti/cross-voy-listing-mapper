import {Template} from "@/services/models/Template.ts";

export enum SUPPORTED_TEMPLATE {
    SEE = 'see',
    SLEEP = 'sleep',
    DRINK = 'drink',
    EAT = 'eat',
    DO = 'do',
    BUY = 'buy',
}

export type TemplateMapper = (template: Template, sourceLang: string, targetLang: string) => Template;

export interface TemplateParams {
    [key: string]: string
}


