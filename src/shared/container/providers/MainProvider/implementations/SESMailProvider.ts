import { SES } from "aws-sdk";
import { injectable } from "tsyringe";
import nodemailer, { Transporter} from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider{
    private client: Transporter;
    constructor(){
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION,
            })
        })
    }
    
    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContext = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContext);
        const templateHtml = templateParse(variables);
        await this.client.sendMail({
            from: "Rent API <rent.api.br@gmail.com>",
            to,
            subject,
            html: templateHtml
        });
    }
}

export { SESMailProvider }