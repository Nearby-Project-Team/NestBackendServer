import { Injectable, Logger } from '@nestjs/common';
import { MulterOptionsFactory } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ConfigService } from '@nestjs/config';
import * as MulterS3 from 'multer-s3';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { extname } from 'path';
import { v4 } from 'uuid';

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
        const acl = 'private';

        const multerS3Storage = MulterS3({
            s3: this.s3,
            bucket,
            acl,
            key: (req, file: Express.Multer.File, cb) => {
                const url: string = req._parsedUrl.path;
                const cg_id = url.split('/')[3];
                const vname = url.split('/')[4]; // 추후에 수정이 필요함. => 어쨌든 화자 정보
                cb(null, `${cg_id}/${vname}/audio/${file.originalname}`);
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
        const fileEx = extname(file.originalname).split('.');
        if (fileEx[fileEx.length - 1] === 'wav' || fileEx[fileEx.length - 1] === 'mp4') {
            cb(null, true);
        } else {
            Logger.debug(`No! ${file.originalname}`);
            cb(new Error('unsupported file'), false);
        }
    }
}