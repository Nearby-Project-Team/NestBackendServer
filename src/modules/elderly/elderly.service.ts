import { Injectable } from '@nestjs/common';
import { hash, genSalt, compareSync } from 'bcrypt';
import { randomBytes } from 'crypto';
import { RequestError } from 'src/common/error/ErrorEntity/RequestError';
import { RequestErrorTypeEnum } from 'src/common/error/ErrorType/RequestErrorType.enum';
import { CaregiverRepository } from 'src/common/repository/caregiver.repository';
import { ElderlyRepository } from 'src/common/repository/elderly.repository';
import { AgreementEnum } from 'src/common/types/agreement.type';
import { ElderlyInfoDto } from './dtos/elderlyInfo.dto';
import { LinkCaregiverDto } from './dtos/linkCaregiver.dto';
import { ElderlySearchDto } from './dtos/elderlySearch.dto';
import { ElderlyEntity } from 'src/common/entity/elderly.entity';
import { AppError } from 'src/common/error/ErrorEntity/AppError';
import { AppErrorTypeEnum } from 'src/common/error/ErrorType/AppErrorType.enum';
import { JwtService } from '@nestjs/jwt';
import { ElderlyTokenPayloadDto } from '../../common/dtos/elderly/token-payload.dto';
import { UserTypeEnum } from 'src/common/types/user.type';
import { CalendarRepository } from '../../common/repository/calendar.repository';
import { CalendarInfoDto } from './dtos/calendar-info.dto';
import { ChattingRepository } from '../../common/repository/chatting.repository';
import { ChattingInfoDto } from './dtos/chat-info.dto';
import { ScheduleTypeEnum } from 'src/common/types/schedule.type';
import { ElderlyRegisterDto } from './dtos/elderlyRegister.dto';

@Injectable()
export class ElderlyService {
    constructor(
        private readonly elderlyRepository: ElderlyRepository,
        private readonly cgRepository: CaregiverRepository,
        private readonly calendarRepository: CalendarRepository,
        private readonly chattingRepository: ChattingRepository,
        private readonly jwtService: JwtService
    ) {}

    async registerElderly(info: ElderlyRegisterDto) {
        const { email, ...e_info } = info;
        const _u = await this.cgRepository.findUserByEmail(email);
        if (_u === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);
        const _e = this.elderlyRepository.create({ 
            name: e_info.name,
            birthday: e_info.birthdate,
            phone_number: e_info.phone_number, 
            agreement: AgreementEnum.agree, 
            caregiver_id: _u
        });

        const token = randomBytes(20).toString('hex'); // work as refresh token
        const salt = await genSalt();
        const tokenHash = await hash(token, salt);
        _e.token = tokenHash;
        await this.elderlyRepository.save(_e); // save refresh token in DB

        return { 
            // url: `${baseUrlConfig()}/elderly/verify/${Buffer.from(email, 'utf-8').toString('base64')}/${token}` // 링크를 QR 코드로 전달
            elderly_id: _e.uuid
        };
    }

    async loginElderly(email: string, name: string) {
        const _e = await this.elderlyRepository.findOne({
            relations: {
                caregiver_id: true
            },
            where: {
                caregiver_id: {
                    email: email
                },
                name: name
            }
        });
        if (_e === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);
        
        return {
            elderly_id: _e.uuid
        };
    }

    async linkWithCaregiver(link: LinkCaregiverDto) {
        const _u = await this.cgRepository.findUserByEmail(link.email);
        const _e = await this.elderlyRepository.findElderlyById(link.elderly_id);
        if (_e === null || _u === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);

        await this.elderlyRepository.update({
            uuid: link.elderly_id
        }, {
            caregiver_id: _u
        });                

        return {
            msg: "Successfully link Elderly with Caregiver!" 
        };
    }

    async verifyElderly(token: string, email: string, info: ElderlySearchDto) {
        const _email = Buffer.from(email, 'base64').toString('utf-8');
        const _u = await this.cgRepository.findUserByEmail(_email);
        if (_u === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);
        const [_e_list, _] = await this.elderlyRepository.findElderlyByNameAndCG(info.name, _u.uuid);
        const _e = _e_list.map((elderly) => {
            if (elderly.birthday === info.birthdate && elderly.phone_number === info.phone_number) return elderly;
            else return false;
        });
        
        let verifyResult = false, elderly_id = null;
        _e.forEach((elderly) => {
            if (elderly instanceof ElderlyEntity) {
                const res = compareSync(token, elderly.token);
                if (res) { 
                    verifyResult = true;
                    elderly_id = elderly.uuid;
                }
            }
        });

        if (verifyResult) {
            const payload: ElderlyTokenPayloadDto = {
                elderly_id: elderly_id,
                status: UserTypeEnum.ELDERLY
            };
            const accessToken = this.jwtService.sign(payload);
            return {
                access: accessToken
            };
        }
        else throw new AppError(AppErrorTypeEnum.INVALID_VERIFICATION);
    }

    async getElderlyList(email: string) {
        const _email = Buffer.from(email, 'base64').toString('utf-8');
        const [_l, num] = await this.elderlyRepository.findAllElderlyCaregiver(_email);
        const result = _l.map((elderly): ElderlyInfoDto => {
            return {
                elderly_id: elderly.uuid,
                email: _email,
                name: elderly.name,
                birthdate: elderly.birthday,
                phone_number: elderly.phone_number,
                agreement: elderly.agreement
            };
        });

        return {
            count: num,
            data: result
        };
    }

    async getElderlyCalendar(elderly_id: string, page: number) {
        const _e = await this.elderlyRepository.findElderlyById(elderly_id);
        if (_e === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);
        const [_c, num] = await this.calendarRepository.findAllCalendarByElderlyId(elderly_id, page);
        const result = _c.map((calendar): CalendarInfoDto => {
            return {
                content: calendar.contents,
                scheduleDate: calendar.ScheduleDate,
                notificationType: calendar.notificationType,
                createdAt: calendar.createdAt
            };
        });

        return {
            count: num,
            data: result
        };
    }

    async getElderlyCalendarAll(elderly_id: string) {
        const _e = await this.elderlyRepository.findElderlyById(elderly_id);
        if (_e === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);
        const [_c, num] = await this.calendarRepository.findAllCalendar(elderly_id);
        const result = _c.map((calendar): CalendarInfoDto => {
            return {
                content: calendar.contents,
                scheduleDate: calendar.ScheduleDate,
                notificationType: calendar.notificationType,
                createdAt: calendar.createdAt
            };
        });
        return {
            count: num,
            data: result
        };
    }

    async getElderlyTypedCalendar(elderly_id: string, no_type: ScheduleTypeEnum) {
        const _e = await this.elderlyRepository.findElderlyById(elderly_id);
        if (_e === null) throw new RequestError(RequestErrorTypeEnum.USER_NOT_FOUND);
        const [_c, num] = await this.calendarRepository.findTypedCalendar(elderly_id, no_type);
        const result = _c.map((calendar): CalendarInfoDto => {
            return {
                content: calendar.contents,
                scheduleDate: calendar.ScheduleDate,
                notificationType: calendar.notificationType,
                createdAt: calendar.createdAt
            };
        });
        return {
            count: num,
            data: result
        };
    }

    async getElderlyChatting(elderly_id: string, page: number) {
        const [_c, num] = await this.chattingRepository.getChattingHistory(elderly_id, page);
        const result = _c.map((chat): ChattingInfoDto => {
            return {
                content: chat.contents,
                sender: chat.sender,
                createdAt: chat.createdAt
            };
        });
        return {
            count: num,
            data: result
        };
    }

}
