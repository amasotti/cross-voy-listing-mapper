import {Template} from "@/services/models/Template.ts";
import {TemplateParams} from "@/types/template.ts";
import seeMapping from "@/mapping/listing.json";

export const mapSeeTemplate = (template: Template, sourceLang: string, targetLang: string): Template => {
    const mappedParams: TemplateParams = {};

    for (const [_, value] of Object.entries(template.params)) {

        // Collect all the keys mappings where the target language value is not NOT_AVAILABLE
        const keys = Object.keys(seeMapping).filter(key => seeMapping[key][targetLang] !== 'NOT_AVAILABLE');

        for (const key of keys) {
            if (Object.keys(template.params).includes(key)) {
                mappedParams[seeMapping[key][targetLang]] = value || '';
            }
        }
    }
    return new Template(template.type, mappedParams);
}