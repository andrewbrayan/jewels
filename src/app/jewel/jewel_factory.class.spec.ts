import { JewelFactory } from './jewel_factory.class';
import { Jewel } from './jewel.class';

describe('JewelFactory', () => {
  let jewel: Jewel;

  beforeEach(() => {
    jewel = JewelFactory.createRandomJewel([0, 0]);
  });

  it('debería crear una joya aleatoria con las coordenadas correctas', () => {
    expect(jewel.row).toEqual(0);
    expect(jewel.column).toEqual(0);
    expect(['red', 'blue', 'green', 'yellow', 'purple']).toContain(jewel.color);
  });
});
