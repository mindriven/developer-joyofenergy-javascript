// @flow
import type { $Request, $Response } from 'express';
import type { Reading, UsageForAPricePlans } from './../usage/usage'

const { pricePlans } = require("./price-plans");
const { usageForAllPricePlans } = require("../usage/usage");

const recommend = (getReadings: (string) => Reading[], req: $Request): any => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getReadings(meter)).sort((a, b) => extractCost(a) - extractCost(b))
    if("limit" in req.query && typeof req.query.limit === "number") {
        return pricePlanComparisons.slice(0, req.query.limit);
    }
    return pricePlanComparisons;
};

const extractCost = (cost: UsageForAPricePlans): number => {
    const [, value] = Object.entries(cost).find( ([key]) => key in pricePlans) || ["not existing plan",0];
    return ((value: any) :number)
}

const compare = (getData: (string) => Reading[], req: $Request) : {smartMeterId: string, pricePlanComparisons: UsageForAPricePlans[]} => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getData(meter));
    return {
        smartMeterId: req.params.smartMeterId,
        pricePlanComparisons,
    };
};

module.exports = { recommend, compare };
