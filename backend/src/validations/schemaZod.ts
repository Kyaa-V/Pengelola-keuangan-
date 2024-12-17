import { z, ZodSchema } from "zod";
import { AddForm } from "../model/modelAddForm";

export class Schema {
    static readonly addForm: ZodSchema<AddForm> = z.object({
        name: z.string().nonempty("Name tidak boleh kosong"),
        modal: z.number().min(1, "Modal tidak boleh kosong"),
        sell: z.number().min(1, "Jual  tidak boleh kosong"),
        category: z.string().nonempty("Category tidak boleh kosong"),
        nameCustomer: z.string().nonempty("Customer Name tidak boleh kosong"),
        status: z.string().nonempty("Status tidak boleh kosong"),
        information: z.string().optional()
    });
}
