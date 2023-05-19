import { Jewel } from './jewel.class';

describe('Jewel', () => {
  let jewel: Jewel;

  beforeEach(() => {
    jewel = new Jewel('jewel', 'red', [0, 0]);
  });

  it('debería crearse con las propiedades correctas', () => {
    expect(jewel.type).toEqual('jewel');
    expect(jewel.color).toEqual('red');
    expect(jewel.imagen).toEqual('jewel_red.png');
    expect(jewel.row).toEqual(0);
    expect(jewel.column).toEqual(0);
    expect(jewel.delete).toEqual(false);
  });

  it('debería permitir cambiar la fila, la columna y la propiedad delete', () => {
    jewel.row = 1;
    expect(jewel.row).toEqual(1);

    jewel.column = 1;
    expect(jewel.column).toEqual(1);

    jewel.delete = true;
    expect(jewel.delete).toEqual(true);
  });
});
