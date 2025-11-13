import { Controller, Post, Body } from '@nestjs/common';
import { ApiGatewayService } from './gateway.services';


@Controller('notifications')
export class ApiGatewayController {
  constructor(private readonly gatewayService: ApiGatewayService) {}

  @Post('email')
  async sendEmail(@Body() payload: { userId: string; templateId: string }) {
    await this.gatewayService.sendNotification('email', payload);
    return { success: true, message: 'Email queued' };
  }

  @Post('push')
  async sendPush(@Body() payload: { userId: string; templateId: string }) {
    await this.gatewayService.sendNotification('push', payload);
    return { success: true, message: 'Push queued' };
  }
}
