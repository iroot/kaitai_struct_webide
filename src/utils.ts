﻿function downloadFile(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';

    return new Promise<ArrayBuffer>((resolve, reject) => {
        xhr.onload = function (e) {
            resolve(this.response);
        };

        xhr.send();
    });
}

class Delayed {
    private timeout: number;

    constructor(public delay: number) { }

    public do(func) {
        if (this.timeout)
            clearTimeout(this.timeout);

        this.timeout = setTimeout(function () {
            this.timeout = null;
            func();
        }, this.delay);
    }
}

if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
        'use strict';
        if (this == null) {
            throw new TypeError('can\'t convert ' + this + ' to object');
        }
        var str = '' + this;
        count = +count;
        if (count != count) {
            count = 0;
        }
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (; ;) {
            if ((count & 1) == 1) {
                rpt += str;
            }
            count >>>= 1;
            if (count == 0) {
                break;
            }
            str += str;
        }
        // Could we try:
        // return Array(count + 1).join(this);
        return rpt;
    }
}