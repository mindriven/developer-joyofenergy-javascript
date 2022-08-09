// @flow

import type { MetersData } from './readings.data';
import type { Reading } from './../usage/usage'

const readings : (MetersData)=>{getReadings:(string )=> Reading[], setReadings:(string, Reading[]) => Reading[]} = (data: MetersData) => ({
    getReadings: (meterId) => data[meterId] || [],
    setReadings: (meterId, readings) => {
        const currentReadings = data[meterId] || [];
        data[meterId] = [...currentReadings, ...readings];
        return data[meterId];
    },
});

module.exports = { readings };
