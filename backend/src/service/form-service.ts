import { AddForm } from "../model/modelAddForm";
import { Schema } from "../validations/schemaZod";
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
        const data = await queries(query, [
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
    }
}
