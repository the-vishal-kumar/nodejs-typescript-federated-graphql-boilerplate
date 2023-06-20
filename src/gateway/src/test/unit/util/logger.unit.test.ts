import { Logger } from '../../../util';
import { config as loggerConfig } from '../../../util/logger';

describe('Logger', () => {
  test('Logger is defined', () => {
    expect(Logger).toBeDefined();
  });

  test('Logger has the correct log level', () => {
    expect(Logger.level).toBe('info');
  });

  test('Logger has transports', () => {
    expect(Logger.transports.length).toBeGreaterThan(0);
  });

  test('Logger config has exceptions and rejections handler set to true', () => {
    expect(loggerConfig.handleExceptions).toBe(true);
    expect(loggerConfig.handleRejections).toBe(true);
  });
});
