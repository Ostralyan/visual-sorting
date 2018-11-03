import React from 'react';
import ArrayGenerator from '../utility/ArrayGenerator';

interface State {
  listOfNumbers: number[];
  isSorted: boolean;
};
interface Props {};

const arrSize = 4;

export default class BogoSort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const arr = ArrayGenerator.create(arrSize);
    this.state = {
      listOfNumbers: arr,
      isSorted: this.isSorted(arr),
    }
  }

  public isSorted(arr: number[]): boolean {
    for(let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false
      }
    }

    return true;
  }

  public nextRandomArray(): void {
    if (this.state.isSorted) return;

    const listOfNumbers = ArrayGenerator.create(arrSize);
    const isSorted = this.isSorted(listOfNumbers)
    const state = {
      listOfNumbers,
      isSorted
    }
    this.setState(state);
  }

  private createTable(): JSX.Element[] {
    let table: JSX.Element[] = [];

    for(let i = 0; i < this.state.listOfNumbers.length; i++) {
      const cellClasses = ["row-cell"];
    
      if (this.state.isSorted) {
        cellClasses.push("sorted");
      }

      table.push(
        <div className={cellClasses.join(' ')} key={i}>
            {this.state.listOfNumbers[i]}
        </div>
      );
    }

    return table;
  }

  public render(): React.ReactNode {
    return(
      <div onClick={() => this.nextRandomArray()}>
        <h1>
          Bogo Sort
        </h1>
        {this.createTable()}
      </div>
    )
  }
}
