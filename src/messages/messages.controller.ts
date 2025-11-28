import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
import { MessageId, MessageContent, Message } from './types';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  async listOfMessages(): Promise<Message[]> {
    return await this.messagesService.findAll();
  }

  @Post()
  async createMessage(@Body() body: CreateMessageDto): Promise<Message> {
    const content: MessageContent = body.content;
    return await this.messagesService.create(content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string): Promise<Message> {
    const numericId: MessageId = parseInt(id, 10);
    const message = await this.messagesService.findOne(numericId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }
}
