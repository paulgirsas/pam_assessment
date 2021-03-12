export function required(value) {
    return !!value?.trim();
}

export function minLengthFactory(length) {
    if (length == null) {
        throw Error(`Illegal Argument Exception, length: ${length}`)
    }
    return function (value) {
        return typeof value?.length === 'number' && value.length >= length;
    }
}

const EmailRegex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function email(value) {
    if (!value?.trim()) {
        return true;
    }
    return EmailRegex.test(value);
}
