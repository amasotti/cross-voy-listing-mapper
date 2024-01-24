import {Template} from "@/services/models/Template.ts";
import {SUPPORTED_TEMPLATE, TemplateParams} from "@/types/template.ts";
import seeMapping from "@/mapping/see.json";
import sleepMapping from "@/mapping/sleep.json";
import drinkMapping from "@/mapping/drink.json";
import eatMapping from "@/mapping/eat.json";
import doMapping from "@/mapping/do.json";
import buyMapping from "@/mapping/buy.json";


const chooseMappingFile = (templateType: string): any => {
    switch (templateType) {
        case SUPPORTED_TEMPLATE.SEE:
            return seeMapping;
        case SUPPORTED_TEMPLATE.SLEEP:
            return sleepMapping;
        case SUPPORTED_TEMPLATE.DRINK:
            return drinkMapping;
        case SUPPORTED_TEMPLATE.EAT:
            return eatMapping;
        case SUPPORTED_TEMPLATE.DO:
            return doMapping;
        case SUPPORTED_TEMPLATE.BUY:
            return buyMapping;

        default:
            throw new Error('Template type not supported');
    }

}


export const mapListing = (template: Template, sourceLang: string, targetLang: string): Template => {
    const mappedParams: TemplateParams = {};

    const mappingJson = chooseMappingFile(template.type);

    // Collect all the keys mappings where the target language value is not NOT_AVAILABLE
    const keys = Object.keys(mappingJson).filter(key => mappingJson[key][targetLang] !== 'NOT_AVAILABLE');

    // @ts-ignore
    for (const entry of Object.entries(template.params)) {

        for (const key of keys) {
            const foreignKey = mappingJson[key][sourceLang];
            const targetKey = mappingJson[key][targetLang];
            if (Object.keys(template.params).includes(foreignKey)) {

                mappedParams[targetKey] = template.params[foreignKey];
            }
        }
    }
    return new Template(template.type, mappedParams);
}