import { Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from './users.service';

@Controller("users")
@ApiTags('User 👤')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create one User" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "User successfully created" })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return { statusCode: HttpStatus.CREATED, data: user };
    } catch (error) {
      console.error('Error creating users:', error);
      throw new InternalServerErrorException('Failed to create users');
    }
  }

  @Get()
  @ApiOperation({ summary: "Get All Users" })
  @ApiResponse({ status: HttpStatus.OK, description: "List of all users" })
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return { statusCode: HttpStatus.OK, data: users };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one User by ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "User found" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  async findOne(@Param("id") id: string) {
    try {
      const user = await this.userService.findOne(+id);
      if (!user) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found' };
      }
      return { statusCode: HttpStatus.OK, data: user };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete one User by ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "User successfully deleted" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  async remove(@Param("id") id: string) {
    try {
      const deleted = await this.userService.remove(+id);
      if (!deleted) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found' };
      }
      return { statusCode: HttpStatus.OK, message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting users:', error);
      throw new InternalServerErrorException('Failed to delete users');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update one User by ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "User successfully updated" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.update(+id, updateUserDto);
      if (!updatedUser) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found' };
      }
      return { statusCode: HttpStatus.OK, data: updatedUser };
    } catch (error) {
      console.error('Error updating users:', error);
      throw new InternalServerErrorException('Failed to update users');
    }
  }
}