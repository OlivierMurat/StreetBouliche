function gcd (u, v) {
    if (u === v) return u;
    if (u === 0) return v;
    if (v === 0) return u;

    if (~u & 1)
        if (v & 1)
            return gcd(u >> 1, v);
        else
            return gcd(u >> 1, v >> 1) << 1;

    if (~v & 1) return gcd(u, v >> 1);

    if (u > v) return gcd((u - v) >> 1, v);

    return gcd((v - u) >> 1, u);
}

/* returns an array with the ratio */
export function ratio (w, h) {
    let d = gcd(w,h);
    return [w/d, h/d];
}

/**
 * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
export function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
}

/**
 *
 * @param {string} string the percentage to parse
 * @param {Number} reference The full number to get a percent
 * @return {Number} return a float according to the string
 */
export function getPercentFromString(string, reference){
    let percentMatch = string.toString().match(/([0-9]{1,3})%/);
    let percent;   
    if(percentMatch || (string > 0 && string < 1)){
        //its a percentage
        if(percentMatch){
            /**
             *
             * @type {number}
             */
            percent = parseFloat(percentMatch[1]);
        }
    }
    else{
        percent = string/reference;
    }

    return percent;
}