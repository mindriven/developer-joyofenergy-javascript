// @flow

import type { PricePlans, PricePlanEntry } from './../price-plans/price-plans';

export type Reading = { time: number, reading: number}
export type UsageForAPricePlans = {[key: $Values<PricePlans>]: number};

const average = (readings: Reading[]): number => {
    return (
        readings.reduce((prev, next) => prev + next.reading, 0) /
        readings.length
    );
};

const timeElapsedInHours = (readings: Reading[]): number => {
    readings.sort((a, b) => a.time - b.time);
    const seconds = readings[readings.length - 1].time - readings[0].time;
    const hours = Math.floor(seconds / 3600);
    return hours;
};

const usage = (readings: Reading[]): number => {
    return average(readings) / timeElapsedInHours(readings);
};

const usageCost = (readings: Reading[], rate: number): number => {
    return usage(readings) * rate;
};

const usageForAllPricePlans = (pricePlans: PricePlans, readings: Reading[]) : UsageForAPricePlans[] => {
    return Object.entries(pricePlans).map(([key, value]) => {
        return {
            [key]: usageCost(readings, ((value: any) :PricePlanEntry).rate),
        };
    });
};

module.exports = {
    average,
    timeElapsedInHours,
    usage,
    usageCost,
    usageForAllPricePlans,
};
