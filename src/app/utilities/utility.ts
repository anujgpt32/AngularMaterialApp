import * as EmailValidator from 'email-validator';
import * as CryptoJS from 'crypto-js';

export default class Utitlity {

    /**
     * This method converts the raw password to SHA256 string for saving
     * it on remote db.
     * @param rawPassword : holds the password in raw format.
     */
    static passwordToSHA256(rawPassword:string) {
        return CryptoJS.SHA256(rawPassword).toString(CryptoJS.enc.Hex);
    }

    /**
     * This method returns true or false that depicts whether 
     * the email is valid or not.
     * @param email : holds the email that is to be validated.
     */
    static validateEmail(email:string) {
        return EmailValidator.validate(email);
    }


}