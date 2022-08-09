// @flow
import type { Reading } from './../usage/usage'
const { meters } = require("../meters/meters");

export type MetersData = {[key: $Values<typeof meters>]: Reading[]};

const generateSingle : () => Reading[] = () => {
    const startTime = 1607686125; // Friday, 11 December 2020 11:28:45 GMT+00:00
    const hour = 3600;
    const readingsLength = Math.ceil(Math.random() * 20);

    return [...new Array(readingsLength)].map((reading, index) => ({
        time: startTime - index * hour,
        reading: Math.random() * 2,
    }));
};

type MetersDataGenerator = () => MetersData;

const generateAllMeters : MetersDataGenerator = () => {
    const readings = {};

    for (const key in meters) {
        if (meters.hasOwnProperty(key)) {
            readings[meters[key]] = generateSingle();
        }
    }

    return readings;
};

const readingsData : MetersData = generateAllMeters();

module.exports = { readingsData };
