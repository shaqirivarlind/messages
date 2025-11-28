import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { MessageContent, Message, MessageId } from './types';

@Injectable()
export class MessagesService {
  constructor(public messagesRepo: MessagesRepository) {}

  async findOne(id: MessageId): Promise<Message | undefined> {
    return this.messagesRepo.findOne(id);
  }

  async findAll(): Promise<Message[]> {
    return this.messagesRepo.findAll();
  }

  async create(content: MessageContent): Promise<Message> {
    return this.messagesRepo.create(content);
  }
}
