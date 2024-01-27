import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {AbstractMapper} from "@/services/mapper/AbstractMapper.ts";
import {SUPPORTED_TEMPLATE} from "@/types/template.ts";
import {Template} from "@/services/models/Template.ts";

export class GermanMapper extends AbstractMapper {

    constructor() {
        super(SUPPORTED_LANGUAGES.DE);
    }


    async map(article: string, targetLanguage: SUPPORTED_LANGUAGES, targetTemplate: SUPPORTED_TEMPLATE): Promise<string | null> {

        const text = await this.getText(article);
        if (!text) {
            return null;
        }

        try {
            const templatesInArticle = this.parser.extractTemplatesFromText(text);
            const vCards = this.filterTemplates(templatesInArticle, SUPPORTED_TEMPLATE.VCARD);
            return vCards.join('\n')
            const wishedTemplate = this.filterVCards(vCards, targetTemplate);

        } catch (err) {
            console.log(err);
            return "Error while parsing templates."
        }





        // const wishedTemplate = this.filterTemplates(templatesInArticle, targetTemplate);
        //
        // if (wishedTemplate.length === 0) {
        //     return `No '${targetTemplate}' template found in ${article} article.`
        // }
        //
        // const templateArray = this.buildTemplateArray(wishedTemplate);
        // const mappedTemplates = this.mapTemplateArray(templateArray, targetLanguage);
        //
        // try {
        //     return this.formatTemplateArray(mappedTemplates, targetLanguage);
        // }  catch (err) {
        //     console.log(err);
        //     return null;
        // }

    }


    filterVCards(vCards: string, wishedType: SUPPORTED_TEMPLATE): Template[] {
        // Parse vCards to Template objects
        this.parser.parseTemplates(vCards);

        // Extract param type from template

        // Filter by type
    }




}