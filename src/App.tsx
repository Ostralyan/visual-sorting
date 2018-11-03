import React from 'react';
import BubbleSort from './BubbleSort/BubbleSort';
import SelectionSort from './SelectionSort/SelectionSort';
import BogoSort from './BogoSort/BogoSort';
export default class App extends React.Component {
  render() {
    return(
      <div>
        <BubbleSort />
        <SelectionSort />

        <BogoSort />
      </div>
    )
  }
}