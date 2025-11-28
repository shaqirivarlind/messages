import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { MessageContent, Message, MessageId } from './types';

@Injectable()
export class MessagesRepository {
  private async readMessages(): Promise<Message[]> {
    const contents = await readFile('messages.json', 'utf8');

    return JSON.parse(contents) as Message[];
  }

  private async writeMessages(messages: Message[]): Promise<void> {
    await writeFile('messages.json', JSON.stringify(messages, null, 2), 'utf8');
  }

  async findOne(id: MessageId): Promise<Message | undefined> {
    const messages = await this.readMessages();

    return messages[id];
  }

  async findAll(): Promise<Message[]> {
    return await this.readMessages();
  }

  async create(content: MessageContent): Promise<Message> {
    const messages = await this.readMessages();
    const id = Math.floor(Math.random() * 999);
    const newMessage: Message = { id, content };
    messages[id] = newMessage;
    await this.writeMessages(messages);

    return newMessage;
  }
}
