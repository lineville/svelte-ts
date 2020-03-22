import { expect } from 'chai';
import { canChomp, adjacentMatches, chomp } from '../src/utils/CandyChomper';
import { randomGrid } from '../src/utils/ColorFill';

describe('CandyChomper', () => {
  var grid: Array<Array<string>>;
  beforeEach(() => {
    grid = [
      ['💛', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['⬛️', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['⬛️', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['⬛️', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['⬛️', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['⬛️', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['⬛️', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['⬛️', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['⬛️', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['⬛️', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
    ];
  });

  it('should return []', () => {
    const result = adjacentMatches(grid, { x: 0, y: 0 });
    expect(result).to.deep.equal([]);
  });

  it('should return items', () => {
    const result = adjacentMatches(grid, { x: 1, y: 0 });
    console.log(result);
    console.log(result.map(p => grid[p.x][p.y]));
    expect(result).to.not.be.empty;
  });

  it('should return a new grid', () => {
    const result = chomp(grid, { x: 1, y: 0 });
    console.log(result);
    expect(result).to.deep.equal([
      ['💛', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['⬛️', 'X', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['X', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['X', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['X', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['X', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['X', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['X', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['X', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
      ['X', '⬛️', '🎖', '🎖', '🔶', '💙', '💙', '💙', '💙', '💙'],
    ]);
  });
});
