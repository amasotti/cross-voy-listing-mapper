import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {MediaWikiAPI} from "@/services/api/mediawiki.api.ts";


export const getSourceWikitext = async (article: string, language: SUPPORTED_LANGUAGES): Promise<string> => {
    const api = new MediaWikiAPI(language);
    const resp = await api.getSource(article);

    if (!resp) {
        return "";
    }

    return resp.data.source;
}