import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OrdersService } from 'src/services/order.service';

@WebSocketGateway({ cors: true })
export class OrdersGateway implements OnGatewayConnection {
  constructor(private readonly ordersService: OrdersService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // Phân loại client: Nhà bếp hoặc nhân viên
    client.on('register', (role: string) => {
      console.log(`${client.id} registered as ${role}`);
      client.join(role); // Tham gia nhóm theo role
    });
  }

  @SubscribeMessage('newOrder')
  handleNewOrder(@MessageBody() data: any) {
    console.log('New order received:', data);
    this.ordersService.createOrder(data);
    // Phát sự kiện tới nhóm 'kitchen'
    this.server.to('kitchen').emit('newOrder', data);
  }
}
