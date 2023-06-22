import fs from 'node:fs';
import path from 'node:path';
import Logger from './logger';

const inputFilePath = path.join(__dirname, '..', 'config', 'cow.txt');
const outputFilePath = path.join(__dirname, '..', 'config', 'countries.json');

export const readInputFileAndReturnContent = (): string => {
  return fs.readFileSync(inputFilePath, 'utf8');
};

export const writeOutputFile = (countriesJSON: string): void => {
  fs.writeFileSync(outputFilePath, countriesJSON);
};

export const generateCountriesJson = (fileContent: string): string => {
  const lines = fileContent.split('\n');
  const countries: {
    [key: string]: {
      name: string;
      topLeft: [number, number];
      bottomRight: [number, number];
    };
  } = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '' || line.startsWith('#') || line.startsWith('ISO3166A2')) {
      continue;
    }

    const fields = line.split(';');
    const isoCode = fields[0].trim();
    const name = fields[5].trim();
    const minLongitude = parseFloat(fields[66].trim());
    const maxLatitude = parseFloat(fields[63].trim());
    const maxLongitude = parseFloat(fields[65].trim());
    const minLatitude = parseFloat(fields[64].trim());

    /**
     * reference: https://www.keene.edu/campus/maps/tool/
     * 68.17, 35.99 | Top Left Coordinate
     * 97.4, 6.75   | Bottom Right Coordinate
     */
    countries[isoCode] = {
      name: name,
      topLeft: [minLongitude, maxLatitude],
      bottomRight: [maxLongitude, minLatitude],
    };
  }

  return JSON.stringify(countries, null, 2);
};

((): void => {
  try {
    const content = readInputFileAndReturnContent();
    const countriesJSON = generateCountriesJson(content);
    writeOutputFile(countriesJSON);
  } catch (err) {
    Logger.error('Error generating countries JSON:- ', err);
  }
})();
