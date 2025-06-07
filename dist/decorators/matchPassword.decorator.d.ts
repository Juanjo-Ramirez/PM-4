import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class MatchPassword implements ValidatorConstraintInterface {
    validate(passwordConfirm: string, args: ValidationArguments): boolean;
    defaultMessage(): string;
}
