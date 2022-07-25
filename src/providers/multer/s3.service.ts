import { Injectable, Logger } from '@nestjs/common';
import { MulterOptionsFactory } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ConfigService } from '@nestjs/config';
import * as MulterS3 from 'multer-s3';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { extname } from 'path';

@Injectable()
export class S3Service implements MulterOptionsFactory {
    private readonly FILE_SIZE_LIMIT = 31457280;

    constructor(
        @InjectAwsService(S3)
        private readonly s3: S3,
        private readonly configService: ConfigService
    ) {}

    createMulterOptions(): MulterOptions | Promise<MulterOptions> {
        const bucket = this.configService.get<string>('AWS_S3_BUCKET_NAME');
        const acl = 'public-read';

        const multerS3Storage = MulterS3({
            s3: this.s3,
            bucket,
            acl,
            key: (req, file, cb) => {
                const cg_id = Buffer.from(req.body.email, 'utf-8').toString('base64');
                const vname = req.body.name;
                const uuid = req.body.unique_id;
                cb(null, `${cg_id}/${vname}/${uuid}.${file.mimetype}`);
            }
        });

        return {
            storage: multerS3Storage,
            fileFilter: this.fileFilter,
            limits: {
                fieldSize: this.FILE_SIZE_LIMIT,
            }
        };  
    }

    public fileFilter(req: Express.Request, file: Express.Multer.File, cb: (err: Error | null, acceptFile: boolean) => void) {
        console.log(extname(file.originalname));
        if (extname(file.originalname).match(/\/.(wav|mp4)$/)) {
            cb(null, true);
        } else {
            Logger.debug(`No! ${file.originalname}`);
            cb(new Error('unsupported file'), false);
        }
    }
}