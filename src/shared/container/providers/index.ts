import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMainProvider } from "./MainProvider/implementations/EtherealMainProvider";
import { IMailProvider } from "./MainProvider/IMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

container.registerInstance<IMailProvider>(
    "EtherealMainProvider",
    new EtherealMainProvider()
);

container.registerInstance<IStorageProvider>(
    "StorageProvider",
    new LocalStorageProvider()
);