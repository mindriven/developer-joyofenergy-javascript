const { meters } = require("../meters/meters");
const { readingsData } = require("./readings.data");

describe("generate data", () => {
    it("should generate readings for one meter", () => {
        expect(readingsData[meters.METER0].length).toBeGreaterThan(0);
    });

    it("should generate readings for each meter", () => {
        expect(readingsData[meters.METER0].length).toBeGreaterThan(0);
        expect(readingsData[meters.METER1].length).toBeGreaterThan(0);
        expect(readingsData[meters.METER2].length).toBeGreaterThan(0);
        expect(readingsData[meters.METER3].length).toBeGreaterThan(0);
        expect(readingsData[meters.METER4].length).toBeGreaterThan(0);
        expect(Object.keys(readingsData).length).toBe(5);
    });
});
