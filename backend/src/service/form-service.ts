import {
    AddForm,
    SelectDate,
    SelectDataCategory,
    SelectCustom,
    Hutang,
    UpdateHutang
} from "../model/modelAddForm";
import { Schema } from "../validations/schemaZod";
import { responseDataTable } from "../model/responseTabel";
import { queries } from "../query/queries";
import { v4 as uuidv4 } from "uuid";
import { VALIDATION } from "../validations/validations";

export class formService {
    static async updatehutang(request: UpdateHutang) {
        console.log("proses 1");
        const { id, status }: UpdateHutang = request;
        console.log("testing 3");
        const query = "UPDATE hutang SET Status = ? WHERE Id = ?";
        const data = await queries.post(query, [status, id]);

        console.log("testing selesai");
        console.log(data);

        return { data };
    }
    static async hutang(request: Hutang) {
        console.log("proses 1");
        const { name, mount, object }: Hutang = VALIDATION.validate(
            Schema.hutang,
            request
        );
        console.log("testing 3");
        const newUuid = uuidv4();
        console.log(newUuid);
        const query =
            "INSERT INTO hutang(Id,Transaksi,Name,Hutang) VALUES(?,?,?,?)";
        const data = await queries.post(query, [newUuid, object, name, mount]);

        console.log("testing selesai");
        console.log(data);

        return { data };
    }
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
        const newUuid = uuidv4();
        console.log(newUuid);
        const query =
            "INSERT INTO formData(id,name,category,modal,jual,information,nameCs) VALUES(?,?,?,?,?,?,?)";
        const data = await queries.post(query, [
            newUuid,
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
    static async selectcustom(request: SelectCustom) {
        const { date, category }: SelectCustom = request;

        console.log("testing 3");
        const query = ` SELECT * FROM formData WHERE category = ? AND
        DATE(at_created) = ?`;
        const data = await queries.post(query, [category, date]);
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
    static async gethutang() {
        const query =
            "SELECT Id, Transaksi, Name, Hutang, Status,DATE_FORMAT(Date, '%Y-%m-%d') AS date FROM hutang WHERE Status = 'Belum lunas'";
        const data = await queries.get(query);
        console.log(data);
        return data;
    }
    static async gethutanglunas() {
        const query =
            "SELECT Id, Transaksi, Name, Hutang, Status,DATE_FORMAT(Date, '%Y-%m-%d') AS date FROM hutang WHERE Status = 'Lunas'";
        const data = await queries.get(query);
        console.log(data);
        return data;
    }
}
