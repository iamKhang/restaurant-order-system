import { SupabaseService } from './services/supabase.service';
import { OrdersGateway } from './gateways/orders.gateway';
import { OrdersService } from './services/order.service';
import { OrdersController } from './controllers/orders.controller';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';

@Module({
  providers: [SupabaseService, OrdersGateway, OrdersService, AppService],
  exports: [SupabaseService],
  controllers: [AppController, OrdersController],
})

export class AppModule {}
