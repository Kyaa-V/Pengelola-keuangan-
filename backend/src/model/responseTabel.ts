export type ResponseData = {
    name: string;
    category: string;
    modal: number;
    jual: number;
    nameCs: string;
    at_created: string;
};

export const responseDataTable = (data: ResponseData[]) => {
    return data.map(item => ({
        Name: item.name,
        Category: item.category,
        Modal: item.modal,
        Jual: item.jual,
        "Nama Penjual": item.nameCs,
        at_created: new Date(item.at_created).toISOString().split("T")[0]
    }));
};
