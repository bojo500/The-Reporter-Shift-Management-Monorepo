
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}


  async create(createUserDto: CreateUserDto) {
    try {
      await this.repository.save(createUserDto);
    } catch {
      throw new InternalServerErrorException();
    }
    return {
      message: 'Created Successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  async update(id: number, updateUserDto: Partial<User>) {
    const user = await this.repository.findOne({ where:{id} });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Don't allow password updates through this method
    if (updateUserDto.password) {
      delete updateUserDto.password;
    }
    Object.assign(user, updateUserDto);
    try {
      const updatedUser = await this.repository.save(user);
      // Remove password from returned user
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error updating users:', error);
      throw new InternalServerErrorException('Failed to update users');
    }
  }



  async findOne(id: number): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    if (user) {
      // Remove password from returned user
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    }
    return null;
  }

  async updatePhoneNumber(userId: number, phoneNumber: string): Promise<void> {
    await this.repository.update(userId, { phoneNumber });
  }

  async findAll() {
    const users = await this.repository.find();
    // Remove passwords from all users
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async remove(id: number) {
    let item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    try {
      await this.repository.delete(item.id);
    } catch {
      throw new InternalServerErrorException();
    }
    return {
      message: 'Deleted Successfully',
      statusCode: HttpStatus.OK,
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.repository.save(createUserDto);
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({where:{email}});
  }

}
