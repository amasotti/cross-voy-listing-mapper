import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import {MediaWikiAPI} from "@/services/api/mediawiki.api.ts";


class FetchService {
    private api: MediaWikiAPI;

    constructor(private lang: SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES.EN) {
        this.api = new MediaWikiAPI(lang);
    }

    async getSourceWikitext(article: string): Promise<string> {
        const resp = await this.api.getSource(article);

        if (!resp) {
            return "";
        }

        return resp.data.source;
    }

    async getLastRevionUrl(article: string): Promise<string> {
        const resp = await this.api.getSource(article);

        if (!resp) {
            return "";
        }

        const revision = resp.data.latest.id;

        return `https://${this.lang}.wikivoyage.org/w/index.php?title=${article}&oldid=${revision}`;
    }

}

export default FetchService;