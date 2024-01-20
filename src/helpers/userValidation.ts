import { UsersDto } from 'src/dtos/users.dto';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const areRequiredFieldsPresent = (user: UsersDto) => {
  const { email, firstName, lastName } = user;
  return email && firstName && lastName ? true : false;
};

export const areFieldValuesValid = (user: UsersDto) => {
  const { email, firstName, lastName } = user;
  return (
    typeof email === 'string' &&
    emailRegex.test(email) &&
    typeof firstName === 'string' &&
    typeof lastName === 'string'
  );
};
