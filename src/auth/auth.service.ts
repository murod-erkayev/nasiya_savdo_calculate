import { AdminService } from './../admin/admin.service';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"
import { LoginDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';
import { User } from '../users/scheam/user.entity';
import { Admin } from '../admin/entities/admin.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}
  async generateTokensUser(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      email: user.email,
      role: user.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signInUser(signInDto: LoginDto, res: Response) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException("Email yoki Password noto'g'ri");
    }
    if (!user.is_active) {
      throw new BadRequestException("Avval Emailni tasdiqlang");
    }

    const isValidPassword = await bcrypt.compare(signInDto.password, user.hashed_password);
    if (!isValidPassword) {
      console.log("IsValidate11111111111");
      throw new BadRequestException("Email yoki Password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokensUser(user);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    user.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(user.id, user.hashed_refresh_token);

    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }
  async logOutUser(req:Request, res:Response){
    const token = req.cookies["refresh_token"]
    if(!token) {
      console.log("Token1",token);
      throw new BadRequestException({message:"Bunday Token Yo'q"})}
    const user = await this.usersService.findByToken(token)
    if(!user) throw new BadRequestException({message:'Bunday Token Topilmadi'})
      user.hashed_refresh_token = ""
    await this.usersService.save(user);
    res.clearCookie("refreshToken");
    return res.json({message:"Tizimdan muvafaqiyatli chiqdinggiz"})
  }


  async refreshTokenUser(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token not available!");
    }
    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const user = await this.usersService.findOne(payload.id);
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException("Admin Not Found or have not log in yet!");
    }
    const isValid = await bcrypt.compare(refresh_token, user.hashed_refresh_token);
    if (!isValid) throw new UnauthorizedException("Refresh Token noto'g'ri");
    const { accessToken, refreshToken } =
      await this.generateTokensUser(user);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    user.hashed_refresh_token = hashed_refresh_token;
    await this.usersService.save(user);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { RefreshToken: refreshToken };
  }


  //====Admin===//
  async generateTokensAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      email: admin.email,
      role: admin.role,
      username: admin.username,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signInAdmin(signInDto: LoginDto, res: Response) {
    const admin = await this.adminService.findByEmail(signInDto.email);
    if (!admin) {
      throw new BadRequestException("Email yoki Password noto'g'ri");
    }
    if (!admin.is_active) {
      throw new BadRequestException("Avval Emailni tasdiqlang");
    }

    const isValidPassword = await bcrypt.compare(signInDto.password, admin.hashed_password);
    if (!isValidPassword) {
      console.log("IsValidate11111111111");
      throw new BadRequestException("Email yoki Password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokensAdmin(admin);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateRefreshToken(admin.id, admin.hashed_refresh_token);

    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }

  async logOutAdmin(req:Request, res:Response){
    const token = req.cookies["refresh_token"]
    if(!token) {
      console.log("Token1",token);
      throw new BadRequestException({message:"Bunday Token Yo'q"})}
    const admin = await this.adminService.findByToken(token)
    if(!admin) throw new BadRequestException({message:'Bunday Token Topilmadi'})
      admin.hashed_refresh_token = ""
    await this.adminService.save(admin);
    res.clearCookie("refresh_token");
    return res.json({message:"Tizimdan muvafaqiyatli chiqdinggiz"})
  }

  async refreshTokenAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token not available!");
    }
    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const admin = await this.adminService.findOne(payload.id);
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException("Admin Not Found or have not log in yet!");
    }
    const isValid = await bcrypt.compare(refresh_token, admin.hashed_refresh_token);
    if (!isValid) throw new UnauthorizedException("Refresh Token noto'g'ri");
    const { accessToken, refreshToken } =
      await this.generateTokensAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.hashed_refresh_token = hashed_refresh_token;
    await this.adminService.save(admin);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { RefreshToken: refreshToken };
  }

}
