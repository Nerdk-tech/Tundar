export class ChatMessage {
  constructor(role, message) {
    this.role = role;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}