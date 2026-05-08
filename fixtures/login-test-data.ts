export type InvalidLoginCase = {
  name: string;
  username: string;
  password: string;
  expectedError: RegExp;
};

export const invalidLoginCases: InvalidLoginCase[] = [
  {
    name: 'locked-out user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: /locked out/i,
  },
  {
    name: 'wrong password',
    username: 'standard_user',
    password: 'wrong_password',
    expectedError: /Username and password do not match/i,
  },
  {
    name: 'empty username',
    username: '',
    password: 'secret_sauce',
    expectedError: /Username is required/i,
  },
  {
    name: 'empty password',
    username: 'standard_user',
    password: '',
    expectedError: /Password is required/i,
  },
];

export const validUsers = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' },
  { username: 'visual_user', password: 'secret_sauce' },
];