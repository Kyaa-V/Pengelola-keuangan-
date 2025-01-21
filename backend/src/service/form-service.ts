import {
    AddForm,
    SelectDate,
    SelectDataCategory,
    SelectCustom,
    Hutang,
    UpdateHutang,
    Modal
} from "../model/modelAddForm";
import { Schema } from "../validations/schemaZod";
import { responseDataTable } from "../model/responseTabel";
import { queries } from "../query/queries";
import { v4 as uuidv4 } from "uuid";
import { VALIDATION } from "../validations/validations";

export class formService {
    static async modal(request: Modal) {
        console.log("proses 1");
        const { modal }: Modal = request;
        console.log("testing 3");
        const query = "INSERT INTO expend (modal) VALUES (?)";
        const data = await queries.post(query, [modal]);

        console.log("testing selesai");
        console.log(data);

        return { data };
    }
    static async updatehutang(request: UpdateHutang) {
        console.log("proses 1");
        const { id, status }: UpdateHutang = request;
        console.log("testing 3");
        const query = "UPDATE formData SET Status = ? WHERE Id = ?";
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
        try {
            console.log("Proses dimulai");

            const {
                name,
                modal,
                category,
                sell,
                hutang,
                namePerson,
                nameCustomer,
                information
            }: AddForm = VALIDATION.validate(Schema.addForm, request);

            const newUuid = uuidv4();
            console.log("Generated UUID:", newUuid);
            console.log(hutang);
            let query, values;
            if (hutang) {
                query = `
                INSERT INTO formData(id, name, category, modal, jual,
                information, nameCs, Status,namePerson)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                values = [
                    newUuid,
                    name,
                    category,
                    modal,
                    sell,
                    information,
                    nameCustomer,
                    "Belum lunas",
                    namePerson
                ];
            } else {
                query = `
                INSERT INTO formData(id, name, category, modal, jual, information, nameCs)
                VALUES(?, ?, ?, ?, ?, ?, ?)`;
                values = [
                    newUuid,
                    name,
                    category,
                    modal,
                    sell,
                    information,
                    nameCustomer
                ];
            }

            const data = await queries.post(query, values);

            console.log("Proses selesai");
            console.log("Hasil:", data);

            return { data };
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            throw error;
        }
    }

    static async select(request: SelectDate) {
        const { date }: SelectDate = request;

        console.log("testing 3");
        const query = `
        SELECT * FROM formData WHERE DATE(at_created) =  ? AND Status = 'Lunas'`;
        const data = await queries.post(query, [date]);
        console.log("testing selesai");
        console.log(data);

        return responseDataTable(data);
    }
    static async selectcustom(request: SelectCustom) {
        const { date, category }: SelectCustom = request;

        console.log("testing 3");
        const query = ` SELECT * FROM formData WHERE category = ? AND
        DATE(at_created) = ? AND Status = 'Lunas'`;
        const data = await queries.post(query, [category, date]);
        console.log("testing selesai");
        console.log(data);

        return responseDataTable(data);
    }
    static async selectCategory(request: SelectDataCategory) {
        const { dataCategory }: SelectDataCategory = request;

        console.log(dataCategory);
        console.log("testing 3");
        const query = `SELECT * FROM formData WHERE category =  ? AND Status = 'Lunas'`;
        const data = await queries.post(query, [dataCategory]);
        console.log("testing selesai");
        console.log(data);

        return responseDataTable(data);
    }
    static async today() {
        const query =
            "SELECT * FROM formData WHERE DATE(at_created) = CURDATE() AND Status = 'Lunas'";
        const data = await queries.get(query);
        console.log(responseDataTable(data));
        return responseDataTable(data);
    }
    static async yesterday() {
        const query =
            "SELECT * FROM formData WHERE DATE(at_created) = CURDATE() - INTERVAL 1 DAY AND Status = 'Lunas'";
        const data = await queries.get(query);
        console.log(responseDataTable(data));
        return responseDataTable(data);
    }
    static async inWeeks() {
        const query =
            "SELECT * FROM formData WHERE YEARWEEK(at_created, 1) = YEARWEEK(CURDATE(), 1) AND Status = 'Lunas'";
        const data = await queries.get(query);
        console.log(responseDataTable(data));
        return responseDataTable(data);
    }
    static async inMonth() {
        const query =
            "SELECT * FROM formData WHERE MONTH(at_created) = MONTH(CURDATE()) AND YEAR(at_created) = YEAR(CURDATE()) AND Status = 'Lunas'";
        const data = await queries.get(query);
        console.log(responseDataTable(data));
        return responseDataTable(data);
    }
    static async lastMonth() {
        const query =
            "SELECT * FROM formData WHERE MONTH(at_created) = MONTH(CURDATE() -INTERVAL 1 MONTH)  AND YEAR(at_created) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND Status = 'Lunas'";
        const data = await queries.get(query);
        console.log(responseDataTable(data));
        return responseDataTable(data);
    }
    static async oneMonth() {
        const query =
            "SELECT DAY(at_created) AS tanggal,COUNT(*) AS jumlah_transaksi FROM formData WHERE MONTH(at_created) = MONTH(CURRENT_DATE()) AND YEAR(at_created) = YEAR(CURRENT_DATE()) AND Status = 'Lunas' GROUP BY tanggal ORDER BY tanggal ASC ";
        const data = await queries.get(query);
        console.log(data);
        return data;
    }
    static async gethutang() {
        const query =
            "SELECT id,namePerson AS Name, name as Transaksi, jual as Hutang, Status,DATE_FORMAT(at_created, '%Y-%m-%d') AS date FROM formData  WHERE Status = 'Belum lunas'";
        const data = await queries.get(query);
        console.log(data);
        return data;
    }
}
