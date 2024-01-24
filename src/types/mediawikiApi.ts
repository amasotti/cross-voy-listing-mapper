

export interface GetPageResponse {
        id: number;
        key: string;
        title: string;
        latest: {
            id: number;
            timestamp: string;
        };
        content_model: string;
        license: {
            url: string;
            title: string;
        };
        source: string;
}
