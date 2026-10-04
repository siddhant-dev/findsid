import {
  activeSectionFromPositions,
  shouldPushSectionHistory,
} from './section-navigation';

describe('section navigation rules', () => {
  it('selects the last ordered heading at the 96px reading line', () => {
    expect(
      activeSectionFromPositions([
        { id: 'about', top: -20 },
        { id: 'lab', top: 96 },
        { id: 'experience', top: 240 },
      ]),
    ).toBe('lab');
  });

  it('chooses About before the first heading and the last section at document bottom', () => {
    expect(
      activeSectionFromPositions([
        { id: 'about', top: 100 },
        { id: 'lab', top: 400 },
      ]),
    ).toBe('about');
    expect(
      activeSectionFromPositions(
        [
          { id: 'about', top: -400 },
          { id: 'lab', top: -20 },
        ],
        96,
        true,
      ),
    ).toBe('lab');
  });

  it('pushes changed section selections but not repeats', () => {
    expect(shouldPushSectionHistory('about', 'articles')).toBeTrue();
    expect(shouldPushSectionHistory('articles', 'articles')).toBeFalse();
  });
});
