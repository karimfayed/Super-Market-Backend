export enum ItemsErrorMessages {
  RequiredFieldsMissing = 'Missing required fields',
  InvalidFieldValues = 'Invalid field values',
  InvalidItemId = 'Invalid Item Id'
}

export enum UsersErrorMessages {
  RequiredFieldsMissing = 'Missing required fields',
  InvalidFieldValues = 'Invalid field values',
  InvalidEmail = 'Invalid email'
}

export enum InvoicesErrorMessages {
  RequiredFieldsMissing = 'Missing required fields',
  InvalidFieldValues = 'Invalid field values',
  InvalidInvoiceId = 'Invalid invoice Id'
}

export type CustomMessage = ItemsErrorMessages | UsersErrorMessages | InvoicesErrorMessages;
