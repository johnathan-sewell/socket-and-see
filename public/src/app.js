'use strict';

import io from 'socket.io-client';
import Rx from 'rxjs/Rx';

function makeCanvasFillViewport(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}

/*
Custom operator that returns the current and the previous value

----a----b----c----

scanLast

----[a]----[a,b]----[b,c]----
*/
Rx.Observable.prototype.scanLast = function (project) {
    return new Rx.Observable((observer) => {
        let lastValue;

        const newObserver = {
            next: (x) => {
                const result = [lastValue, x];
                lastValue = x;

                return observer.next(result)
            },
            error: (err) => observer.error(err),
            complete: () => observer.complete()
        };

        return this.subscribe(newObserver);
    });
};


function start() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const socket = io();
    const mousePoints = [];

    Rx.Observable.fromEvent(canvas, 'mousemove')
        .subscribe((e) => {
            socket.emit('mouseData', {x: e.pageX, y: e.pageY});
        });

    Rx.Observable.fromEvent(socket, 'mouseTranslation')
        .scanLast()
        .subscribe((data) => {

            const previousMouseData = data[0];
            const currentMouseData = data[1];

            if (!previousMouseData) {
                return; // can't draw a line without a previous point
            }

            ctx.beginPath();
            ctx.moveTo(previousMouseData.x, previousMouseData.y);
            ctx.lineTo(currentMouseData.x, currentMouseData.y);
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
        });

    makeCanvasFillViewport(canvas, window.innerWidth, window.innerHeight);

    window.addEventListener('resize', function() {
        makeCanvasFillViewport(canvas, window.innerWidth, window.innerHeight);
    });
};

start();
