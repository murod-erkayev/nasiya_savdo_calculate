import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { DebtModule } from './debt/debt.module';
import { ShopsModule } from './shops/shops.module';
import { WalletModule } from './wallet/wallet.module';
import { PruductsModule } from './pruducts/pruducts.module';
import { CategoryModule } from './category/category.module';
import { TemplatesModule } from './templates/templates.module';
import { NotificationModule } from './notification/notification.module';
import { InventorModule } from './inventor/inventor.module';
import { DebtPaymentModule } from './debt_payment/debt_payment.module';
import { PinCodeModule } from './pin-code/pin-code.module';
import { ReportModule } from './report/report.module';
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal:true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname+"/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // uploads papkasi
      serveRoot: '/api/uploads', // URL orqali fayllarga murojaat qilish
    }),
    UsersModule,
    AuthModule,
    CustomerModule,
    DebtModule,
    ShopsModule,
    WalletModule,
    PruductsModule,
    CategoryModule,
    TemplatesModule,
    NotificationModule,
    InventorModule,
    DebtPaymentModule,
    PinCodeModule,
    ReportModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
