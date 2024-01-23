import {Template} from "@/services/models/Template.ts";

export enum SUPPORTED_TEMPLATE {
    SEE = 'see',
    LIST = 'list',
    INFOBOX = 'infobox',
    GEO = 'geo'
}

export type TemplateMapper = (template: Template, sourceLang: string, targetLang: string) => Template;

export interface TemplateParams {
    [key: string]: string
}


