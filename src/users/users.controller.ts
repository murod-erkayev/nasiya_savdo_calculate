import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from './scheam/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator/role.decorator';
import { JwtSelfGuard } from '../common/guards/self.guard';

@ApiTags('users')  // Swagger sarlavhasi uchun
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created.', type: User })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/passports', // Fayllar shu papkaga saqlanadi
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `${uniqueSuffix}${ext}`; // Passport nomini olib tashlash
          cb(null, fileName);
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("superadmin", "admin")
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() image: Express.Multer.File) {
    return this.usersService.create(createUserDto, image);
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("superadmin", "admin")
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('activate/:link')
  @ApiOperation({ summary: 'Activate user by activation link' })
  @ApiParam({ name: 'link', description: 'Activation link (UUID)' })
  @ApiResponse({ status: 200, description: 'User successfully activated' })
  activateUser(@Param('link') link: string) {
    return this.usersService.activateUser(link);
  }
  @UseGuards(JwtAuthGuard,RolesGuard,JwtSelfGuard)
  @Roles("superadmin", "admin", "sotuvchi")
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard,RolesGuard,JwtSelfGuard)
  @Roles("superadmin", "admin", "sotuvchi")
  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User successfully updated', type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
