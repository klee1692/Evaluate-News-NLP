var validUrl = require('valid-url');

function isValidURL(formText) {

    console.log("::: Running urlChecker :::", formText)

    if (validUrl.isUri(formText)) {
        console.log('Looks like an URL');
        return formText;
    } else {
        console.log('Not an URL');
    }

}

export { isValidURL }