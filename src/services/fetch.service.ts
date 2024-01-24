import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {API} from "@/services/api/mediawiki.api.ts";


export const getSourceWikitext = async (article: string, language: SUPPORTED_LANGUAGES): Promise<string> => {
    const api = new API(language);
    const resp = await api.getSource(article);

    if (!resp) {
        return "Error fetching source";
    }

    return resp.data.source;
}