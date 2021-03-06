import { getMetricMetaInfo, timeToString } from "./helpers";

import { AsyncStorage } from "react-native";

export const CALENDAR_STORAGE_KEY = "FitnessApp:calendar";
function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 0;
}

function setDummyData() {
  const { run, bike, swim, sleep, eat } = getMetricMetaInfo();
  let dummyData = {};
  const timestamp = Date.now();
  for (let i = -183; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);
    dummyData[strTime] =
      getRandomNumber(3) % 2 === 0
        ? {
            run: getRandomNumber(run.max),
            bike: getRandomNumber(bike.max),
            swim: getRandomNumber(swim.max),
            sleep: getRandomNumber(sleep.max),
            eat: getRandomNumber(eat.max),
          }
        : null;
  }
  AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData));
  return dummyData;
}
function setMissingDates(dates) {
  const length = Object.keys(dates).length;
  const timestamp = Date.now();
  for (let i = -183; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);
    if (typeof dates[strTime] === "undefined") {
      dates[strTime] = null;
    }
  }
  return dates;
}
export function formatCalendarResults(results) {
  return results === null
    ? setDummyData()
    : setMissingDates(JSON.parse(results));
}

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
