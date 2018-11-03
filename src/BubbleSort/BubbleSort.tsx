import React from 'react';
import ArrayGenerator from '../utility/ArrayGenerator';
import './BubbleSort.css';

interface Props {}

interface State {
  listOfNumbers: number[];
  currentCursor: number;
  currentIteration: number;
}

const arrSize = 10;

export default class BubbleSort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listOfNumbers: ArrayGenerator.create(arrSize),
      currentCursor: 0,
      currentIteration: 0
    }
  }

  private nextBubble(): void {
    if (this.state.currentIteration > this.state.listOfNumbers.length - 1) {
      return;
    }
    const nextPass = [...this.state.listOfNumbers];
    
    if (nextPass[this.state.currentCursor] > nextPass[this.state.currentCursor + 1]) {
      nextPass[this.state.currentCursor] = nextPass[this.state.currentCursor] ^ nextPass[this.state.currentCursor + 1];
      nextPass[this.state.currentCursor + 1] = nextPass[this.state.currentCursor + 1] ^ nextPass[this.state.currentCursor];
      nextPass[this.state.currentCursor] = nextPass[this.state.currentCursor] ^ nextPass[this.state.currentCursor + 1];   
    }

    let nextCursor = 0;
    let nextIteration = this.state.currentIteration;

    if (this.state.currentCursor < arrSize - this.state.currentIteration - 2) {
      nextCursor = this.state.currentCursor + 1;
    } else {
      nextCursor = 0;
      nextIteration++;
    }

    this.setState({
      listOfNumbers: nextPass,
      currentCursor: nextCursor,
      currentIteration: nextIteration,
    });
  }

  private createTable(): JSX.Element[] {
    let table: JSX.Element[] = [];

    for(let i = 0; i < this.state.listOfNumbers.length; i++) {
      const cellClasses = ["row-cell"];

      if (i == this.state.currentCursor || i == this.state.currentCursor -1) {
        cellClasses.push('highlight');
      }

      if (this.state.currentIteration > this.state.listOfNumbers.length - 2) {
        cellClasses.push('sorted');
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
      <div onClick={() => this.nextBubble()}>
        <h1>
          Bubble Sort
        </h1>
        {this.createTable()}
      </div>
    )
  }
}