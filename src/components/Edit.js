import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            newCarProducer: '',
            newCarModel: '',
            newCarCapacity: ''
        }
        this.handleNewCarProducerChange = this.handleNewCarProducerChange.bind(this);
        this.handleNewCarModelChange = this.handleNewCarModelChange.bind(this);
        this.handleNewCarCapacityChange = this.handleNewCarCapacityChange.bind(this);
    }

    componentDidMount() {
        this.getProducts();
    }

    handleNewCarProducerChange(event) {
        this.setState({ newCarProducer: event.target.value });
    }

    handleNewCarModelChange(event) {
        this.setState({ newCarModel: event.target.value });
    }

    handleNewCarCapacityChange(event) {
        this.setState({ newCarCapacity: event.target.value });
    }



    getProducts() {
        fetch('http://localhost:64239/api/cars')
            .then(res => res.json())
            .then(data => this.setState({ items: data }))
            .catch(err => console.log(err))
    }


    editProduct() {
        fetch(`http://localhost:64239/api/cars/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "producer": this.state.newCarProducer,
                "model": this.state.newCarModel,
                "capacity": this.state.newCarCapacity,
            })
        })
            .then(response => {
                if (!response.ok) {
                    alert('Error! Nie mo�na edytowac auta');
                }
                this.getProducts();
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <div>
                    <div>

                        <div>
                            <h2>ID</h2>
                            <input class="input"
                                value={this.state.newCarModel}
                                onChange={this.handleNewCarModelChange} />
                        </div>
                        <div>
                            <h2>Marka</h2>
                            <input class="input"
                                value={this.state.newCarProducer}
                                onChange={this.handleNewCarProducerChange} />
                        </div>


                    </div>
                    <div>
                        <h2>Model</h2>
                        <input class="input"
                            value={this.state.newCarModel}
                            onChange={this.handleNewCarModelChange} />
                    </div>
                    <div>
                        <h2>Pojemnosc</h2>
                        <input class="inputcap"
                            value={this.state.newCarCapacity}
                            onChange={this.handleNewCarCapacityChange} />

                        <button class="button" onClick={() => this.saveProduct()}>Zapisz</button>
                    </div>
                </div>
            </div>
        );
    }
}