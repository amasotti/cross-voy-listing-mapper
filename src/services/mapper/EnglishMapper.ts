import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {AbstractMapper} from "@/services/mapper/AbstractMapper.ts";
import {SUPPORTED_TEMPLATE} from "@/types/template.ts";

export class EnglishMapper extends AbstractMapper {

    constructor() {
        super();
        this.lang = SUPPORTED_LANGUAGES.EN;
    }


    async map(article: string, targetLanguage: SUPPORTED_LANGUAGES, targetTemplate: SUPPORTED_TEMPLATE): Promise<string | null> {

        const text = await this.getText(article);
        if (!text) {
            return null;
        }

        const templatesInArticle = this.parser.extractTemplatesFromText(text);
        const wishedTemplate = this.filterTemplates(templatesInArticle, targetTemplate);

        if (wishedTemplate.length === 0) {
            return `No '${targetTemplate}' template found in ${article} article.`
        }

        const templateArray = this.buildTemplateArray(wishedTemplate);
        const mappedTemplates = this.mapTemplateArray(templateArray, targetLanguage);

        try {
            return this.formatTemplateArray(mappedTemplates, targetLanguage);
        }  catch (err) {
            console.log(err);
            return null;
        }


    }




}