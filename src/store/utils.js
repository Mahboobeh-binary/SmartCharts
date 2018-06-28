export function isValidProp(p) {
    return p !== undefined && !isNaN(p); // eslint-disable-line no-restricted-globals
}

export const getTimeUnit = ({ timeUnit, interval }) => {
    if (timeUnit === null && interval === 'day') {
        return 'day';
    } else if (timeUnit === 'minute' && interval % 60 === 0) {
        return 'hour';
    } else if (timeUnit === 'second') {
        return 'tick';
    }
    return timeUnit;
};

export const getIntervalInSeconds = ({ timeUnit, interval }) => {
    let unit = timeUnit;
    let interv = interval;
    if (interv === 'day') {
        unit = 86400;
        interv = 1;
    } else if (timeUnit === 'minute') {
        unit = 60;
    } else if (timeUnit === 'second') {
        unit = 1;
    }
    return unit * interv;
};

export function stableSort(arr, compare = (a, b) => a < b) {
    const original = arr.slice(0);

    arr.sort((a, b) => {
        const result = compare(a, b);
        return result === 0 ? original.indexOf(a) - original.indexOf(b) : result;
    });

    return arr;
}
export function sameBar(bar1, bar2) {
    return !((!bar1 || !bar2)
        || (+bar1.DT !== +bar2.DT)
        || (bar1.Close !== bar2.Close)
        || (bar1.Open !== bar2.Open)
        || (bar1.Volume !== bar2.Volume));
}

export function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls)) {} // eslint-disable-line no-cond-assign,no-empty
    return el;
}

export function downloadFileInBrowser(filename, content, type) {
    const blob = new Blob([content], { type });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
        return;
    }
    const link = document.createElement('a');
    if (link.download !== undefined) { /* Evergreen Browsers */
        const url = type === 'image/png;' ? content : URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export function stxtap(el, func) {
    if (el && !el.safeClickTouchEvents) {
        CIQ.installTapEvent(el);
        el.addEventListener('stxtap', func);
    }
}
