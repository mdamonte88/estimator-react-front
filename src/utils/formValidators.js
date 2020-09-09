import { COMMENT_MAX_LENGTH } from '../constants/constants';

export const required = value => (value ? undefined : 'Required');
export const maxLength = value => (value && value.length > COMMENT_MAX_LENGTH ? `Must be ${COMMENT_MAX_LENGTH} characters or less` : undefined);
export const emailValidate = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);
