import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from 'src/internals/logger/logger.services';
import * as amqp from 'amqplib';
import axios from 'axios';

@Injectable()
export class ApiGatewayService {
  private channel: amqp.Channel;

  constructor(
    private readonly config: ConfigService,
    @Inject(AppLogger) private readonly logger: AppLogger,
  ) {}

  async initRabbit(channel: amqp.Channel) {
    this.channel = channel;
  }

  async sendNotification(
    type: 'email' | 'push',
    payload: Record<string, any>,
  ) {
    // Fetch user info
    const userRes = await axios.get(`${this.config.get<string>('USER_SERVICE_URL')}/users/${payload.userId}`);
    const user = userRes.data;

    // Fetch template
    const templateRes = await axios.get(`${this.config.get<string>('TEMPLATE_SERVICE_URL')}/templates/${payload.templateId}`);
    const template = templateRes.data;

    // Merge payload with template and user info
    const finalPayload = {
      ...payload,
      to: type === 'email' ? user.email : undefined,
      tokens: type === 'push' ? user.push_tokens : undefined,
      body: template.body,
      title: template.title,
    };

    const queue = type === 'email' ? 'email.queue' : 'push.queue';
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(finalPayload)), { persistent: true });

    this.logger.log(`Notification pushed to ${queue} for user ${payload.userId}`);
  }
}
