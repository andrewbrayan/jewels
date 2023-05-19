export class Jewel {
  private readonly _type: string;
  private readonly _color: string;
  private readonly _imagen: string;
  private _row: number;
  private _column: number;
  private _delete: boolean;

  constructor(type: string, color: string, cords: number[]) {
    const [rowCord, columnCord] = cords;
    this._type = type;
    this._color = color;
    this._imagen = `jewel_${this._color}.png`;
    this._row = rowCord;
    this._column = columnCord;
    this._delete = false;
  }

  get type(): string {
    return this._type;
  }

  get color(): string {
    return this._color;
  }

  get imagen(): string {
    return this._imagen;
  }

  get row(): number {
    return this._row;
  }

  set row(value: number) {
    this._row = value;
  }

  get column(): number {
    return this._column;
  }

  set column(value: number) {
    this._column = value;
  }

  get delete(): boolean {
    return this._delete;
  }

  set delete(value: boolean) {
    this._delete = value;
  }
}
