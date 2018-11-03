import React from 'react';
import ArrayGenerator from '../utility/ArrayGenerator';

interface Props {

}

interface State {
  listOfNumbers: number[]; 
  currentCursor: number;
  currentIteration: number;
  currentMax: number;
  currentMaxIndex: number;
}

const arrSize = 10;

export default class SelectionSort extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    const randomArray = ArrayGenerator.create(arrSize)
    this.state = {
      listOfNumbers: randomArray,
      currentCursor: 1,
      currentIteration: 0,
      currentMax: randomArray[0],
      currentMaxIndex: 0
    }
  }

  private createTable(): JSX.Element[] {
    let table: JSX.Element[] = [];

    for(let i = 0; i < this.state.listOfNumbers.length; i++) {
      const cellClasses = ["row-cell"];
    
      table.push(
        <div className={cellClasses.join(' ')} key={i}>
            {this.state.listOfNumbers[i]}
        </div>
      );
    }

    return table;
  }

  public nextSelection(): void {
    const nextPass = [...this.state.listOfNumbers];
    let nextMax = this.state.currentMax;
    let nextMaxIndex = this.state.currentMaxIndex;

    if (this.state.listOfNumbers[this.state.currentCursor] > this.state.currentMax) {
      nextMax = this.state.listOfNumbers[this.state.currentCursor];
      nextMaxIndex = this.state.currentCursor;
    }

    let nextCursor = 0;
    let nextIteration = this.state.currentIteration;

    if (this.state.currentCursor < arrSize - this.state.currentIteration) {
      nextCursor = this.state.currentCursor + 1;
    } else {
      nextCursor = 0;
      nextIteration++;

      const lastNonSortedIndex = arrSize - this.state.currentIteration - 1;
      nextPass[nextMaxIndex] = nextPass[nextMaxIndex] ^ nextPass[lastNonSortedIndex];
      nextPass[lastNonSortedIndex] = nextPass[lastNonSortedIndex] ^ nextPass[nextMaxIndex];
      nextPass[nextMaxIndex] = nextPass[nextMaxIndex] ^ nextPass[lastNonSortedIndex];

      nextMax = this.state.listOfNumbers[this.state.currentCursor];
      nextMaxIndex = this.state.currentCursor;
    }

    this.setState({
      listOfNumbers: nextPass,
      currentCursor: nextCursor,
      currentIteration: nextIteration,
      currentMax: nextMax
    });
  }

  public render(): React.ReactNode {
    return(
      <div onClick={() => this.nextSelection()}>
        <h1>
          Selection Sort
        </h1>
        {this.createTable()}
      </div>
    );
  }
}