// src/analemma.ts

/**
 * Calculates the position of the sun for each day of the year.
 * @param year The year for which to calculate the analemma.
 * @param latitude The latitude of the observer.
 * @param longitude The longitude of the observer.
 * @returns An array of objects, each containing the equation of time and declination for a day.
 */
export function calculateAnalemmaData(year: number, latitude: number, longitude: number) {
  const data = [];
  for (let i = 0; i < 365; i++) {
    const date = new Date(year, 0, i + 1);
    const dayOfYear = getDayOfYear(date);
    const { equationOfTime, declination } = getSunPosition(dayOfYear, year);
    data.push({ day: i, equationOfTime, declination });
  }
  return data;
}

function getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}


/**
 * Calculates the Equation of Time and Declination of the sun.
 * @param dayOfYear The day of the year (1-365).
 * @returns An object containing the equation of time in minutes and declination in degrees.
 */
function getSunPosition(dayOfYear: number, year:number) {
  // Fractional year in radians
  const gamma = (2 * Math.PI / (isLeapYear(year) ? 366 : 365)) * (dayOfYear - 1 + (12 - 12) / 24);

  // Equation of Time in minutes
  const eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));

  // Declination of the Sun in radians
  const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma) - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);

  // Convert declination to degrees
  const declDegrees = decl * (180 / Math.PI);

  return { equationOfTime: eqtime, declination: declDegrees };
}

function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
