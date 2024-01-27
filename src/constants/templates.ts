import {Options} from "@/types/options";
import {SUPPORTED_TEMPLATE} from "@/types/template.ts";


export const templates: Options[] = [
    {id: 1, value: SUPPORTED_TEMPLATE.SEE, label: 'See'},
    {id: 2, value: SUPPORTED_TEMPLATE.BUY, label: 'Buy'},
    {id: 3, value: SUPPORTED_TEMPLATE.DO, label: 'Do'},
    {id: 4, value: SUPPORTED_TEMPLATE.EAT, label: 'Eat'},
    {id: 5, value: SUPPORTED_TEMPLATE.DRINK, label: 'Drink'},
    {id: 6, value: SUPPORTED_TEMPLATE.SLEEP, label: 'Sleep'},
    // {id: 7, value: 'marker', label: 'Marker'},
]