// @flow
import type { $Request, $Response } from 'express';
import type { Reading } from './../usage/usage'

const read = (getData: (string) => Reading[], req: $Request) : Reading[] => {
    const meter = req.params.smartMeterId;
    return getData(meter);
};

const store = (setData: (string, Reading[]) => Reading[], req: $Request) : Reading[] => {
    const data = ((req.body : any): {smartMeterId: string, electricityReadings: Reading[]});
    return setData(data.smartMeterId ,  data.electricityReadings);
};

module.exports = { read, store };
