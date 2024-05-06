export const errorMessages = {
    bikeAvailabilityRequired: "Bike availability is required",
    carAvailabilityRequired: "Car availability is required",
    USER_ALREADY_REGISTERED:
        'Email is already registered. Please try login or use a different email to register new user.',
};

export const validationMessages = {
    FIRST_NAME_IS_ALPHA: 'Invalid input. Special characters or numbers are not allowed in the name',
    NOT_EMPTY: 'should not be empty.',
    PASSWORD_IS_VALID:
        'Password should contain minimum 8 characters 1 small letter or capital letter , 1 number and 1 special characters',
};

export const successMessages = {
    PASSWORD_RESET: 'Password changed successfully.',
    USER_SIGNUP: 'Register successfully.',
};

export const Defaults = {
    PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/,
    EMAIL_VERIFICATION_TOKEN_EXPIRY: '10m',
    EMAIL_VERIFY_URL: 'https://www.google.com?token=',
    VERIFY_USER_SUBJECT: 'Verify your account',
};
/**
 * Description - Common function for required field validation message
 * @param fieldName string
 * @returns Validation message
 */
export const fieldRequired = (fieldName: string): string => {
    return `Invalid input, The field ${fieldName} is required.`;
};

export const minimumLength = (fieldName: string, length: number): string => {
    return `${fieldName} should have at least ${length} characters`;
};

export const maximumLength = (fieldName: string, length: number): string => {
    return `${fieldName} should have maximum ${length} characters`;
};

export const fieldInvalid = (fieldName: string): string => {
    return `${fieldName} is invalid`;
};