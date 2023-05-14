import { Jewel } from "./jewel.class";

export class JewelFactory {
  private static colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];

  static createRandomJewel(cords: number[]): Jewel {
    const randomType = 'jewel';
    const randomColorIndex = Math.floor(Math.random() * this.colors.length);
    const randomColor = this.colors[randomColorIndex];

    return new Jewel(randomType, randomColor, cords);
  }
}
