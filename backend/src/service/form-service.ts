import { AddForm, SelectDate, SelectDataCategory } from "../model/modelAddForm";
import { Schema } from "../validations/schemaZod";
import { responseDataTable } from "../model/responseTabel";
import { queries } from "../query/queries";
import { uuid } from "../application/uuid";
import { VALIDATION } from "../validations/validations";

export class formService {
    static async add(request: AddForm) {
        console.log("proses 1");
        const {
            name,
            modal,
            category,
            sell,
            nameCustomer,
            information
        }: AddForm = VALIDATION.validate(Schema.addForm, request);
        console.log("testing 3");
        console.log(uuid);
        const query =
            "INSERT INTO formData(id,name,category,modal,jual,information,nameCs) VALUES(?,?,?,?,?,?,?)";
        const data = await queries.post(query, [
            uuid,
            name,
            category,
            modal,
            sell,
            information,
            nameCustomer
        ]);

        console.log("testing selesai");
        console.log(data);

        return { data };
    }
    static async select(request: SelectDate) {
        const { date }: SelectDate = request;

        console.log("testing 3");
        const query = `
        SELECT * FROM formData WHERE DATE(at_created) =  ?`;
        const data = await queries.post(query, [date]);
        console.log("testing selesai");
        console.log(data);

        return responseDataTable(data);
    }
    static async selectCategory(request: SelectDataCategory) {
        const { dataCategory }: SelectDataCategory = request;

        console.log(dataCategory);
        console.log("testing 3");
        const query = `SELECT * FROM formData WHERE category =  ?`;
        const data = await queries.post(query, [dataCategory]);
        console.log("testing selesai");
        console.log(data);

        return responseDataTable(data);
    }
    static async today() {
        const query =
            "SELECT * FROM formData WHERE DATE(at_created) = CURDATE()";
        const data = await queries.get(query);
        console.log(responseDataTable(data));
        return responseDataTable(data);
    }
    static async yesterday() {
        const query =
            "SELECT * FROM formData WHERE DATE(at_created) = CURDATE() - INTERVAL 1 DAY";
        const data = await queries.get(query);
        console.log(responseDataTable(data));
        return responseDataTable(data);
    }
    static async inWeeks() {
        const query =
            "SELECT * FROM formData WHERE YEARWEEK(at_created, 1) = YEARWEEK(CURDATE(), 1)";
        const data = await queries.get(query);
        console.log(responseDataTable(data));
        return responseDataTable(data);
    }
    static async inMonth() {
        const query =
            "SELECT * FROM formData WHERE MONTH(at_created) = MONTH(CURDATE()) AND YEAR(at_created) = YEAR(CURDATE())";
        const data = await queries.get(query);
        console.log(responseDataTable(data));
        return responseDataTable(data);
    }
    static async lastMonth() {
        const query =
            "SELECT * FROM formData WHERE MONTH(at_created) = MONTH(CURDATE() - INTERVAL 1 MONTH)  AND YEAR(at_created) = YEAR(CURDATE() - INTERVAL 1 MONTH)";
        const data = await queries.get(query);
        console.log(responseDataTable(data));
        return responseDataTable(data);
    }
    static async oneMonth() {
        const query =
            "SELECT DAY(at_created) AS tanggal,COUNT(*) AS jumlah_transaksi FROM formData WHERE MONTH(at_created) = MONTH(CURRENT_DATE()) AND YEAR(at_created) = YEAR(CURRENT_DATE()) GROUP BY tanggal ORDER BY tanggal ASC";
        const data = await queries.get(query);
        console.log(data);
        return data;
    }
}
