import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {AbstractMapper} from "@/services/mapper/AbstractMapper.ts";
import {SUPPORTED_TEMPLATE} from "@/types/template.ts";
import {Template} from "@/services/models/Template.ts";
import {mappingVCardToListingType} from "@/mapping/germanVCard.ts";

export class GermanMapper extends AbstractMapper {

    constructor() {
        super(SUPPORTED_LANGUAGES.DE);
    }


    async map(article: string, targetLanguage: SUPPORTED_LANGUAGES, targetTemplate: SUPPORTED_TEMPLATE): Promise<string | null> {

        let vCards: Template[] = [];

        // Load article
        const text = await this.getText(article);
        if (!text) {
            return null;
        }

        // Try to identify templates in article
        try {
            const templatesInArticle = this.parser.extractTemplatesFromText(text);
            const vCardsStrings = this.filterTemplates(templatesInArticle, SUPPORTED_TEMPLATE.VCARD);
            vCards = this.parseVCards(vCardsStrings);
        } catch (err) {
            console.log(err);
            return GermanMapper.PARSING_ERROR_MESSAGE;
        }


        // Filter templates by targetTemplate
        const filteredVCards = this.filterVCards(vCards, targetTemplate);
        if (filteredVCards.length === 0) {
            return `No '${targetTemplate}' template found in ${article} article.`
        }

        // Map templates to targetLanguage
        const mappedTemplates = this.mapTemplateArray(filteredVCards, targetLanguage);
        // Correct type
        for (const template of mappedTemplates) {
            template.type = targetTemplate;
        }

        // Format templates to string
        try {
            return this.formatTemplateArray(mappedTemplates, targetLanguage);
        }  catch (err) {
            console.log(err);
            return null;
        }

    }


    parseVCards(vCardsStrings: string[]): Template[] {
        const parsedTemplates = [];
        for (const vCard of vCardsStrings) {
            const template = Template.parse(vCard);
            parsedTemplates.push(template);
        }
        return parsedTemplates
    }




    filterVCards(vCards: Template[], wishedType: SUPPORTED_TEMPLATE): Template[] {
        // Parse vCards to Template objects
        const filteredTemplates = [];
        for (const vCard of vCards) {
            if (vCard.params['type']) {
                const type = vCard.params['type'].toLowerCase();
                const correspondingListingType = mappingVCardToListingType(type);
                if (correspondingListingType.toLowerCase() === wishedType) {
                    filteredTemplates.push(vCard);
                }
            } else if (vCard.params['types']) {
                const type = vCard.params['types'].toLowerCase();
                const correspondingListingType = mappingVCardToListingType(type);
                if (correspondingListingType.toLowerCase() === wishedType) {
                    filteredTemplates.push(vCard);
                }
            }
        }
        return filteredTemplates
    }




}