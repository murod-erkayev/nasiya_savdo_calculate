import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Admin } from './entities/admin.entity';
import { JwtAuthGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator/role.decorator';
import { JwtSelfGuard } from '../common/guards/self.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi admin yaratish' })
  @ApiResponse({ status: 201, description: 'Admin muvaffaqiyatli yaratildi.', type: Admin})
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri ma\'lumotlar.' })
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("superadmin")
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('activate/:link')
  @ApiOperation({ summary: 'Adminni aktivatsiya qilish' })
  @ApiParam({ name: 'link', description: 'Aktivatsiya linki' })
  @ApiResponse({ status: 200, description: 'Admin aktivatsiya qilindi.' })
  @ApiResponse({ status: 404, description: 'Aktivatsiya linki topilmadi.' })
  activateUser(@Param('link') link: string) {
    return this.adminService.activateAdmin(link);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha adminlarni olish' })
  @ApiResponse({ status: 200, description: 'Adminlar ro‘yxati.', type: [Admin] })
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("superadmin")
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Id bo‘yicha adminni olish' })
  @ApiParam({ name: 'id', description: 'Admin ID raqami' })
  @ApiResponse({ status: 200, description: 'Admin topildi.', type: Admin })
  @ApiResponse({ status: 404, description: 'Admin topilmadi.' })
  @UseGuards(JwtAuthGuard,RolesGuard,JwtSelfGuard)
  @Roles("superadmin", "admin")
  @Get(':id') 
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard,RolesGuard,JwtSelfGuard)
  @Roles("superadmin", "admin")
  @Patch(':id')
  @ApiOperation({ summary: 'Admin ma\'lumotlarini yangilash' })
  @ApiParam({ name: 'id', description: 'Yangilanishi kerak bo‘lgan admin ID' })
  @ApiResponse({ status: 200, description: 'Admin ma\'lumotlari yangilandi.', type: Admin })
  @ApiResponse({ status: 404, description: 'Admin topilmadi.' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin")
  @Delete(':id')
  @ApiOperation({ summary: 'Adminni o‘chirish' })
  @ApiParam({ name: 'id', description: 'O‘chiriladigan admin ID' })
  @ApiResponse({ status: 200, description: 'Admin o‘chirildi.' })
  @ApiResponse({ status: 404, description: 'Admin topilmadi.' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
