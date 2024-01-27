export enum SUPPORTED_TEMPLATE {
    SEE = 'see',
    SLEEP = 'sleep',
    DRINK = 'drink',
    EAT = 'eat',
    DO = 'do',
    BUY = 'buy',
    VCARD = 'vcard',
}

export interface TemplateParams {
    [key: string]: string
}


