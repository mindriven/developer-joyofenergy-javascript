const { Given, When, Then, Before } = require("@cucumber/cucumber");
const { readings } = require("../../../src/readings/readings");
const { read, store } = require("../../../src/readings/readings-controller");
const { readingsData } = require("../../../src/readings/readings.data");
const {
  recommend,
} = require("../../../src/price-plans/price-plans-controller");
const { timeStamp } = require("console");
const assert = require("assert").strict;

const { getReadings, setReadings } = readings(readingsData);
let readingsResponse = {};
let plansResponse = {};

Before(function () {
  readingsResponse = {};
  plansResponse = {};
});

Given(
  "I have stored the following data for {string}",
  function (meterId, dataTable) {
    const toStore = dataTable.hashes().map((h) => ({
      time: Number.parseFloat(h["time"]),
      reading: Number.parseFloat(h["reading"]),
    }));
    setReadings(meterId, toStore);
  }
);

When("I retrieval the data for {string}", function (meterId) {
  readingsResponse = getReadings(meterId);
});

When(
  "I compare all the plans recommendations for {string}",
  function (meterId) {
    plansResponse = recommend(getReadings, {
      params: { smartMeterId: meterId },
      query: { limit: undefined },
    });
  }
);

Then("I get following readings", function (dataTable) {
  const expected = dataTable.hashes().map((h) => ({
    time: Number.parseFloat(h["time"]),
    reading: Number.parseFloat(h["reading"]),
  }));
  assert.deepEqual(expected, readingsResponse);
});

Then("I get following recommendations", function (dataTable) {
  const expected = dataTable
    .hashes()
    .map((h) => ({ [h["plan"]]: Number.parseFloat(h["rate"]) }));
  assert.deepEqual(expected, plansResponse);
});
