import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrdersService {
  private prisma = new PrismaClient();

  async createOrder(orderData: any) {
    const newOrder = await this.prisma.order.create({
      data: orderData,
    });
    return newOrder;
  }
}
