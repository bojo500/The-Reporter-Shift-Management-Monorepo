
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException, UnauthorizedException
} from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { TokenPayloadInterface } from "./interfaces";
import { MailService } from './mail.service';
import { User } from '../users/entities';
import { RegisterDto } from '../users/dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async login(user: any): Promise<any> {
    let payload: TokenPayloadInterface;
    try {
      payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);

      // Remove sensitive data before returning
      const { password, ...userWithoutPassword } = user;

      return {
        message: 'Login successful',
        token: token,
        ...userWithoutPassword,
      };
    } catch (e) {
      throw new BadRequestException('Failed to generate token');
    }
  }

  async register(user: RegisterDto): Promise<any> {
    const existingUser: User | null = await this.usersService.findOneByEmail(user?.email);
    if (existingUser) {
      this.handleBadRequest("Email or username already exists");
      return; // ensure no further processing
    }
    user.password = await bcrypt.hash(user.password, 10);
    let newUser: User;
    try {
      newUser = await this.usersService.createUser(user);
    } catch {
      throw new InternalServerErrorException();
    }
    const verificationToken = this.jwtService.sign({ email: newUser.email }, { expiresIn: '1h' });
    const verifyUrl = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;
    const subject = 'Verify your email';
    const html = `<strong>Please verify your email by clicking the following link:</strong> <a href="${verifyUrl}">Verify Email</a>`;

    const result = await this.mailService.sendEmail(newUser.email, subject, html);
    if (!result.success) {
      throw new InternalServerErrorException('Failed to send verification email');
    }

    return {
      message: "Created Successfully, please verify your email",
      statusCode: HttpStatus.CREATED
    };
  }

  async verifyEmail(token: string): Promise<void> {
    let decoded;
    try {
      decoded = this.jwtService.verify(token);
    } catch (e) { throw new UnauthorizedException('Invalid or expired verification token');}
    const user = await this.usersService.findOneByEmail(decoded.email);
    if (!user) { throw new BadRequestException('User not found');}
    user.isVerified = true;
    await this.usersService.update(user.id, user);
  }

  handleBadRequest(message: string): void {
    throw new BadRequestException({
      message,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User | null = await this.usersService.findOneByEmail(email);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        return user;
      }
    }
    return null;
  }


  async checkAuth(token: string): Promise<TokenPayloadInterface> {
    let verifyObject: TokenPayloadInterface;
    try {
      verifyObject = await this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
    return verifyObject;
  }
}
