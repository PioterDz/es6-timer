class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            times: {},
            running: false,
            display: ''
        };
    }

    reset() {
        this.setState({times : {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }});
        this.print();
    }

    print() {
        this.state.display.innerText = this.format(this.state.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({running : true});
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
    }

    stop() {
        this.setState({running : false});
        clearInterval(this.watch);
    }

    render() {
        return (
            <div>
                <nav className='controls'>
                    <a href='#' className='button' id='start' onClick={this.start}>Start</a>
                    <a href='#' className='button' id='stop' onClick={this.stop}>Stop</a>
                    <a href='#' className='button' id='reset' onClick={this.reset}>Reset</a>
                </nav>
                <div className='stopwatch'></div>
                <ul className='results'></ul>
            </div>
        );
    }

}

pad0(value => {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
});


const app = <Stopwatch display={display}/>
ReactDOM.render(app, document.getElementById('root'));