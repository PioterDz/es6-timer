class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            running: false,
            display: '',
            result: []
        }
    }

    reset() {
        this.setState({ times : {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }});
        console.log(this.state.times, 'reset before this.print');
        this.print();
        console.log(this.state.times, 'reset');
    }

    print() {
        console.log(this.state.times, 'print-state.times');
        this.setState({ display: this.format(this.state.times) });
        
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;

    }

    start() {
        if (!this.state.running) {
            this.setState({ running : true });
            this.watch = setInterval(() => this.step(), 10);
            console.log(this.watch, 'watch');
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.setState({ times: this.state.miliseconds + 1 })
        if (this.state.times.miliseconds >= 100) {
            this.setState({ times : this.state.seconds + 1 })
            this.setState({ times : this.state.miliseconds = 0 })
        }
        if (this.state.times.seconds >= 60) {
            this.setState({ times : this.state.minutes + 1 })
            this.setState({ times : this.state.seconds = 0 })
        }
    }

    stop() {
        this.setState({ running : false });
        clearInterval(this.watch);
        console.log(this.watch, 'watch-stop');
    }

    render() {
        return (
            <div>
                <nav className='controls'>
                    <a href='#' className='button' id='start' onClick={this.start = this.start.bind(this)}>Start</a>
                    <a href='#' className='button' id='stop' onClick={this.stop = this.stop.bind(this)}>Stop</a>
                    <a href='#' className='button' id='reset' onClick={this.reset = this.reset.bind(this)}>Reset</a>
                </nav>
                <div className='stopwatch'>{ this.state.display }</div>
                { console.log(this.state.display, 'display')}
            </div>
        );
    }

}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
}


const app = <Stopwatch/>
ReactDOM.render(app, document.getElementById('root'));