import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"
import { LoginDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';
import { User } from '../users/scheam/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async generateTokensUser(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      email: user.email,
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

  async loginUser(loginDto: LoginDto, res: Response) {
    const user= await this.usersService.findByEmail(loginDto.email);
    if(!user?.is_active){
      throw new BadRequestException({message:"siz hali aktivatisya qilinmagansiz"})
    }else if (!user) {
      throw new UnauthorizedException({ message: "Email yoki Password hato!" });
    }
    const validPasswor = await bcrypt.compare(
      loginDto.password,
      user.hashed_password
    );
    console.log(validPasswor);
    if (!validPasswor) {
      throw new UnauthorizedException({ message: "Email yoki Password hato!" });
    }
    const tokens = await this.generateTokensUser(user);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge:Number(process.env.COOKIE_TIME)
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    user.hashed_refresh_token = hashed_refresh_token;

    return {
      message: "Xush kelibsiz",
      userId: user.id,
      accessToken: tokens.accessToken,
    };
  }
  async logOutUser(req:Request, res:Response){
    const token = req.cookies["refreshToken"]
    if(!token) throw new BadRequestException({message:"Bunday Token Yo'q"})
    const user = await this.usersService.findByToken(token)
    if(!user) throw new BadRequestException({message:'Bunday Token Topilmadi'})
    user.hashed_refresh_token = " "
    await this.usersService.save(user);
    res.clearCookie("refreshToken");
    return res.json({message:"Tizimdan muvafaqiyatli chiqdinggiz"})
  }

  async refreshTokenUser(req: Request, res: Response) {
    const refresh_token = req.cookies["refreshToken"];
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

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { RefreshToken: refreshToken };
  }
}
