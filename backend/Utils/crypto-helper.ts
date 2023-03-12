import crypto from "crypto";

const salt = "eli2807ran"

const hash = (plainText) =>{

    if(!plainText) return null;
    return crypto.createHmac('sha256', salt).update(plainText).digest('hex');

}

export default {
    hash
};