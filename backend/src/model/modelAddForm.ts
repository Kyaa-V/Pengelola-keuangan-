export interface AddForm {
    name: string;
    modal: number;
    sell: number;
    category: string;
    nameCustomer: string;
    status: string;
    hutang?: string;
    namePerson?: string;
    information?: string;
}
export interface SelectDate {
    date: string;
}
export interface SelectCustom {
    date: string;
    category: string;
}
export interface SelectDataCategory {
    dataCategory: string;
}
export interface Hutang {
    name: string;
    mount: number;
    object: string;
}
export interface UpdateHutang {
    id: string;
    status: number;
}
