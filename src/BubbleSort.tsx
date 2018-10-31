import React from 'react';
import ArrayGenerator from './utility/ArrayGenerator';
import './BubbleSort.css';

interface Props {}

interface State {
  listOfNumbers: number[];
  currentCursor: number;
  currentIteration: number;
}

export default class BubbleSort extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listOfNumbers: ArrayGenerator.create(10),
      currentCursor: 0,
      currentIteration: 0
    }
  }

  private nextBubble(): void {
    const nextPass = [...this.state.listOfNumbers];
    
    if (nextPass[this.state.currentCursor] > nextPass[this.state.currentCursor + 1]) {
      nextPass[this.state.currentCursor] = nextPass[this.state.currentCursor] ^ nextPass[this.state.currentCursor + 1];
      nextPass[this.state.currentCursor + 1] = nextPass[this.state.currentCursor + 1] ^ nextPass[this.state.currentCursor];
      nextPass[this.state.currentCursor] = nextPass[this.state.currentCursor] ^ nextPass[this.state.currentCursor + 1];   
    }

    let nextCursor = 0;
    let nextIteration = this.state.currentIteration;

    if (this.state.currentCursor < 10 - this.state.currentIteration - 2) {
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
    
      table.push(
        <div className={cellClasses.join(' ')} key={i}>
            {this.state.listOfNumbers[i]}
        </div>
      );
    }

    return table;
  }

  public render() {
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