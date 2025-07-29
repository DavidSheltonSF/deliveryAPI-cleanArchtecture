import { UserPropsValidator } from './UserPropsValidator';

describe('Test UserPropsValidator', () => {
  const globalUserProps = {
    username: 'Jaral',
    name: 'Jeronimo',
    email: 'jero@bugmail.com',
    cpf: '15588474745',
    phone: '21585847455',
    birthday: new Date('2000-01-01'),
  };

  test('should return a right either value if validation is successful', () => {
    const propsOrError = UserPropsValidator.validateUserProps(globalUserProps);
    expect(propsOrError.isRight()).toBeTruthy();
  });

  test('should return a complete UserProps if validation is successful', () => {
    const propsOrError = UserPropsValidator.validateUserProps(globalUserProps);
    const props = propsOrError.getRight();

    expect(props.username.getValue()).toBe(globalUserProps.username);
    expect(props.name.getValue()).toBe(globalUserProps.name);
    expect(props.email.getValue()).toBe(globalUserProps.email);
    expect(props.cpf.getValue()).toBe(globalUserProps.cpf);
    expect(props.phone.getValue()).toBe(globalUserProps.phone);
    expect(props.birthday.getValue()).toBe(globalUserProps.birthday);
  });

  test('should return error if name is invalid', () => {
    const userProps = {
      username: 'Jaral',
      name: '15545455InvalidNamea4363426',
      email: 'jero@bugmail.com',
      cpf: '15588474745',
      phone: '21585847455',
      birthday: new Date('2000-01-01'),
    };
    const propsOrError = UserPropsValidator.validateUserProps(userProps);
    expect(propsOrError.isLeft()).toBeTruthy();
  });

  test('should return error if email is invalid', () => {
    const userProps = {
      username: 'Jaral',
      name: 'Jeraldo',
      email: 'bugmail.com',
      cpf: '15588474745',
      phone: '21585847455',
      birthday: new Date('2000-01-01'),
    };
    const propsOrError = UserPropsValidator.validateUserProps(userProps);
    expect(propsOrError.isLeft()).toBeTruthy();
  });
});
