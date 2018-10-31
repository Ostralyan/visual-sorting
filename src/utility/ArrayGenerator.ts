export default class ArrayGenerator {
  public static create(length: number, minValue: number = 0, maxValue: number = 100) {
    const resultArray = [];
    for(let i = 0; i < length; i++) {
      const randomNumber = Math.floor((Math.random() * maxValue - minValue)) + minValue;
      resultArray.push(randomNumber);
    }
    return resultArray;
  }
}