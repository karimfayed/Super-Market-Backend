export enum ItemsErrorMessages {
  RequiredFieldsMissing = 'Missing required fields',
  InvalidFieldValues = 'Invalid field values',
  InvalidItemId = 'Invalid Item Id'
}

export enum UsersErrorMessages {
  RequiredFieldsMissing = 'Missing required fields',
  InvalidFieldValues = 'Invalid field values',
  InvalidItemId = 'Invalid email'
}

export type CustomMessage = ItemsErrorMessages | UsersErrorMessages;
