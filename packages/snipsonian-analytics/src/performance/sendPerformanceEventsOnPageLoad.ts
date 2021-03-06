import getServiceWorkerStatus from '@snipsonian/browser/src/serviceWorker/getServiceWorkerStatus';
import { sendTiming } from '../tracker';
import getTimeToFirstPaintInMillis from './getTimeToFirstPaintInMillis';
import getNavigationStartTimeInMillis from './getNavigationStartTimeInMillis';

interface ISendPerformanceEventsOnPageLoadOptions {
    timingEventCategory?: string;
    timeToFirstPaintVarName?: string;
    timeToLoadVarName?: string;
}

export default function sendPerformanceEventsOnPageLoad({
    timingEventCategory = 'performance',
    timeToFirstPaintVarName = 'timeToFirstPaint',
    timeToLoadVarName = 'timeToLoad',
}: ISendPerformanceEventsOnPageLoadOptions = {}): void {
    window.addEventListener('load', () => {
        const nowInMillis = getCurrentTimeInMillis();

        sendTiming({
            category: timingEventCategory,
            timingVar: timeToFirstPaintVarName,
            value: toTimingValue(getTimeToFirstPaintInMillis()),
            label: `SW Status: ${getServiceWorkerStatus()}`,
        });

        sendTiming({
            category: timingEventCategory,
            timingVar: timeToLoadVarName,
            value: toTimingValue(nowInMillis - getNavigationStartTimeInMillis()),
        });
    });
}

function getCurrentTimeInMillis(): number {
    return new Date().getTime();
}

function toTimingValue(input: number): number {
    return Math.round(input);
}
