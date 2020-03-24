import { expect } from 'chai';
import { colorFill, completedGrid } from '../src/utils/ColorFill';

describe('ColorFill', () => {
  var grid: Array<Array<string>>;

  beforeEach(() => {
    grid = [
      ['💙', '💙', '🔶'],
      ['🔶', '🔶', '🔶'],
      ['🔶', '🔶', '🔶'],
      ['💙', '💙', '💙'],
    ];
  });

  it('should return grid with all 🔶 filled with 💛', () => {
    const result = colorFill(grid, { x: 2, y: 2 }, '💛');
    expect(result).to.deep.equal([
      ['💙', '💙', '💛'],
      ['💛', '💛', '💛'],
      ['💛', '💛', '💛'],
      ['💙', '💙', '💙'],
    ]);
  });

  it('should return grid with all 💙 filled with 💛', () => {
    const result = colorFill(grid, { x: 0, y: 1 }, '💛');
    expect(result).to.deep.equal([
      ['💛', '💛', '🔶'],
      ['🔶', '🔶', '🔶'],
      ['🔶', '🔶', '🔶'],
      ['💛', '💛', '💛'],
    ]);
  });
});

describe('Completed Grid', () => {
  var grid: Array<Array<string>>;

  beforeEach(() => {
    grid = [
      ['💙', '💙', '🔶'],
      ['🔶', '🔶', '🔶'],
      ['🔶', '🔶', '🔶'],
      ['💙', '💙', '💙'],
    ];
  });

  it('should return true', () => {
    grid = colorFill(grid, { x: 2, y: 2 }, '💛');
    grid = colorFill(grid, { x: 0, y: 0 }, '💛');
    const result = completedGrid(grid);
    expect(result).to.be.true;
  });

  it('should return false', () => {
    const result = completedGrid(grid);
    expect(result).to.be.false;
  });
});
