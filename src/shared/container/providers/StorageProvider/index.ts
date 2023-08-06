import "dotenv/config";
import { container } from "tsyringe";
import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { IStorageProvider } from "./IStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";

const diskStorage = {
    local: container.resolve(LocalStorageProvider),
    s3: container.resolve(S3StorageProvider)
}

container.registerInstance<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
);