import React from "react";
// import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      starCount: 4,
      selectedBtn: [],
      currentSelection: [],
      reloadUsed: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.genStarCount = this.genStarCount.bind(this);
    this.submitSelection = this.submitSelection.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.removeSelection = this.removeSelection.bind(this);
  }

  componentDidMount() {
    this.genStarCount();
  }
  handleReload() {
    if (this.state.reloadUsed == 5) {
      alert("Reload Exhausted!");
      return;
    }
    this.genStarCount();
    this.setState({ reloadUsed: this.state.reloadUsed + 1 });
  }

  genStarCount() {
    let randomgen = Math.floor(Math.random() * 9) + 1;
    // console.log(randomgen);
    this.setState({ starCount: randomgen });
  }

  submitSelection() {
    let sumSelection = this.state.currentSelection.reduce((x, y) => x + y, 0);
    if (this.state.starCount == sumSelection) {
      this.setState({
        selectedBtn: [...this.state.selectedBtn, ...this.state.currentSelection]
      });
      this.setState({ currentSelection: [] });
      if(this.state.selectedBtn.sort((a,b)=>a>b).join(",") == '1,2,3,4,5,6,7,8,9'){
        alert("You Won!")
        return;
      }
      this.genStarCount();
    }else{
      alert('wrong');
      this.setState({ currentSelection: [] });
    }
  }
  removeSelection(selection) {
    this.state.currentSelection.splice(
      this.state.currentSelection.indexOf(selection),
      1
    );
    this.setState({
      currentSelection: this.state.currentSelection
    });
  }
  handleClick(selection) {
    // console.log(selection);
    this.setState({
      currentSelection: [...this.state.currentSelection, selection]
    });
  }

  render() {
    return (
      <div className="App">
        <div id="stars-holder">
          {new Array(this.state.starCount).fill(0).map(x => (
            <img
              width="40"
              src="http://www2.le.ac.uk/digitalsignage/slideshow/chemistry/images/archive/upto-dec-16/star.png"
            />
          ))}
        </div>
        <p>Reloads left:{5 - this.state.reloadUsed}</p>

        <div id="selected-holder">
          {this.state.currentSelection.map((x, index) => (
            <button
              key={`selected_btn_` + index}
              onClick={() => {
                this.removeSelection(x);
              }}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="control-holder">
          <button
            onClick={() => {
              this.submitSelection();
            }}
          >
            =
          </button>
          <button
            onClick={() => {
              this.handleReload();
            }}
          >
            Reload
          </button>
        </div>

        <div id="options-holder">
          {new Array(9).fill(0).map((x, index) => (
            <button
              disabled={
                (this.state.selectedBtn.indexOf(index + 1) > -1) |
                (this.state.currentSelection.indexOf(index + 1) > -1)
              }
              className={
                this.state.selectedBtn.indexOf(index + 1) > -1 ? "selected" : ""
              }
              key={`btn_` + index}
              onClick={() => {
                this.handleClick(index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
