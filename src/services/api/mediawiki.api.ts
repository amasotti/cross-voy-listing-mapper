import {SUPPORTED_LANGUAGES} from "@/constants/languages.ts";
import axios, {AxiosResponse} from "axios";
import {GetPageResponse} from "@/types/mediawikiApi.ts";


export class MediaWikiAPI {
    baseUrl: string = '';
    headers = {
        'Api-User-Agent': 'Cross-voy-listing-mapper (https://toolsadmin.wikimedia.org/tools/id/cross-voy-listing-mapper)'
    }

    constructor(lang: string = SUPPORTED_LANGUAGES.IT) {
        this.baseUrl = `https://${lang}.wikivoyage.org/w/rest.php/v1/page`;
    }

    getSource = async (article: string): Promise<AxiosResponse<GetPageResponse>|null> => {

        try {
            const url = `${this.baseUrl}/${article}`;
            const response = await axios.get(url);
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}