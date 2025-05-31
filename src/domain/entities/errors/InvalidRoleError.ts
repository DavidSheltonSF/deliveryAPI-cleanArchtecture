import { DomainError } from './DomainError';

export class InvalidRoleError extends Error implements DomainError {
  constructor (role: string) {
    super(`The role ${role} is invalid`);
    this.name = 'InvalidRole';
  }
}