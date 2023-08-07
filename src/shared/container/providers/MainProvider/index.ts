import "dotenv/config";
import { container } from "tsyringe";
import { EtherealMainProvider } from "./implementations/EtherealMainProvider";
import { IMailProvider } from "./IMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const email = {
    local: container.resolve(EtherealMainProvider),
    ses: container.resolve(SESMailProvider)
}
container.registerInstance<IMailProvider>(
    "MailProvider",
    email[process.env.MAIL_PROVIDER]
    
);