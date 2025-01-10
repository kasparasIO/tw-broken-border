// tests/plugin.test.ts
import { directions, generateDirectionWithColorClasses } from '../src/utils';

describe('broken borders plugin', () => {
  // Test that directions are generated correctly
  test('generates correct direction classes', () => {
    expect(directions).toHaveProperty('t');
    expect(directions).toHaveProperty('x');
    expect(directions).toHaveProperty('default');
  });

  // Test color class generation
  test('generates color classes correctly', () => {
    const mockColors = {
      red: { '500': '#ef4444' },
      blue: { '400': '#60a5fa' }
    };
    const result = generateDirectionWithColorClasses(mockColors, directions);
    expect(result).toHaveProperty('broken-t-red-500');
    expect(result).toHaveProperty('broken-x-blue-400');
  });
});
