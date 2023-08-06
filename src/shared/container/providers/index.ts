import "dotenv/config";
import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMainProvider } from "./MainProvider/implementations/EtherealMainProvider";
import { IMailProvider } from "./MainProvider/IMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

container.registerInstance<IMailProvider>(
    "EtherealMainProvider",
    new EtherealMainProvider()
);

const diskStorage = {
    local: new LocalStorageProvider(),
    s3: new S3StorageProvider()
}

container.registerInstance<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
);