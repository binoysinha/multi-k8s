import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = { 
        seenIndexes: [],
        values: {},
        index: '',
        errMsg: ''
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        let data = [];
        if (typeof values.data !== 'string') {
            data = values.data
        }
        this.setState({ values: data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        let data = [];
        if (typeof seenIndexes.data !== 'string') {
            data = seenIndexes.data
        }

       this.setState({ seenIndexes: data });
    }

    handleInputChange = (evt) => {
        const { value } = evt.target;
        this.setState({ index: value})
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/values', {
                index: this.state.index
            });
            this.setState( { index: '', errMsg: ''});
        } catch(err) {
            this.setState({errMsg: 'Index too high'});
        }
    
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <tr key={key}>
                    <td>{key}</td> 
                    <td>{this.state.values[key]}</td>
                </tr>
            )
        }
        return entries;
    }

    render() {
        let { errMsg } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="inp">Enter your index:</label>
                    <input 
                        type="number"
                        value={this.state.index} 
                        placeholder="Enter number" 
                        id="inp" 
                        onChange={this.handleInputChange}
                    />
                    <button>Submit</button>
                </form>
                {errMsg ? <p className="err">{errMsg}</p> : null}
                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}
                <h3>Constructed Values:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Computed Value</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.renderValues()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Fib;