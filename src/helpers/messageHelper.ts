import { CustomMessage, ItemsErrorMessages, UsersErrorMessages } from '../constants/ErrorMessages';

export function isCustomMessage(message: string): message is CustomMessage {
  return (
    Object.values(ItemsErrorMessages).includes(message as ItemsErrorMessages) ||
    Object.values(UsersErrorMessages).includes(message as UsersErrorMessages)
  );
}
