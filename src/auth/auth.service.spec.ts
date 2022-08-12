import { Test, TestingModule } from '@nestjs/testing';
import { LoginRequestDto } from 'src/common/dtos/caregiver/login-request.dto';
import { AppError } from 'src/common/error/ErrorEntity/AppError';
import { AppErrorTypeEnum } from 'src/common/error/ErrorType/AppErrorType.enum';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateCaregiver', () => {
      it('should be ', () => {
        const temp_email = "should.be@ema.il";
        const temp_password = "passwd";

        expect(service.validateCaregiver(temp_email,temp_password)).toBeDefined();
      });
  });

  describe('login', () => {
    it('should be defined',() => {
      const user = {email : "email", password : "passwd"};
      expect(service.login(user)).toBeDefined();
    });
  });

  describe('register', () => {
    it('should be defined', () => {
      const user = {email:"", password:"", name:"", phone_number:""};
      expect(service.register(user)).toBeDefined();
    });

    it('should throw user exist error',() => {
      try{
        const user = {email:"", password:"", name:"", phone_number:""};
        service.register(user);
      }
      catch(e){
        expect(e).toBeInstanceOf(AppError);
        if(e instanceof AppError)
        {
          expect(e.errorCode).toEqual(AppErrorTypeEnum.USER_EXISTS);
        }
      }
    });
  });

  describe('verify', () => {});
  describe('agreement', () => {});
});
