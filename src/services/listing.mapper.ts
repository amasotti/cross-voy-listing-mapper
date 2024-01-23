import {Template} from "@/services/models/Template.ts";
import {TemplateParams} from "@/types/template.ts";
import seeMapping from "@/mapping/see.json";

export const mapSeeTemplate = (template: Template, sourceLang: string, targetLang: string): Template => {
    const mappedParams: TemplateParams = {};

    // Collect all the keys mappings where the target language value is not NOT_AVAILABLE
    const keys = Object.keys(seeMapping).filter(key => seeMapping[key][targetLang] !== 'NOT_AVAILABLE');
    console.log("Available keys: " + keys);

    for (const entry of Object.entries(template.params)) {
        console.log(Object.keys(template.params));

        for (const key of keys) {
            const foreignKey = seeMapping[key][sourceLang];
            const targetKey = seeMapping[key][targetLang];
            if (Object.keys(template.params).includes(foreignKey)) {

                mappedParams[targetKey] = template.params[foreignKey];
            }
        }
    }
    return new Template(template.type, mappedParams);
}