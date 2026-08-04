import { PersonalityType, TestResult } from '../types';

export function buildDimensionRows(result: TestResult | null): Array<{ label: string; value: string }> {
  return [
    { label: 'E / I', value: result?.dimensions.EI ?? '-' },
    { label: 'S / N', value: result?.dimensions.SN ?? '-' },
    { label: 'T / F', value: result?.dimensions.TF ?? '-' },
    { label: 'J / P', value: result?.dimensions.JP ?? '-' }
  ];
}

export function buildLuckyColorPalette(type: PersonalityType): string[] {
  return [type.luckyColors.primary, ...type.luckyColors.secondary].filter(
    (color, index, palette) => palette.indexOf(color) === index
  );
}
