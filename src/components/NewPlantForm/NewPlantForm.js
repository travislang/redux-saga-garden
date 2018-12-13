import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class NewPlantForm extends Component {
    state = {
        newPlant: {
            id: 4,
            name: '',
            kingdom: '',
            clade: '',
            order: '',
            family: '',
            subfamily: '',
            genus: ''
        }
    }
    handleChange = name => {
        return e => {
            this.setState({
                newPlant: {
                    ...this.state.newPlant,
                    [name]: e.target.value,
                }
            });
        }
    }

    addNewPlant = event => {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_PLANT', payload: this.state.newPlant})
    }

    render() {
        return (
            <div>
                <h3>This is the form</h3>
                <pre>{JSON.stringify(this.state)}</pre>
                <form onSubmit={this.addNewPlant}>
                    <input type='text' value={this.state.newPlant.name} placeholder='name' onChange={ this.handleChange('name')} />
                    <input type='text' placeholder='kingdom' value={this.state.newPlant.kingdom} onChange={this.handleChange('kingdom')} />
                    <input type='text' placeholder='clade' value={this.state.newPlant.clade} onChange={this.handleChange('clade')} />
                    <input type='text' placeholder='order' value={this.state.newPlant.order} onChange={this.handleChange('order')} />
                    <input type='text' placeholder='family' value={this.state.newPlant.family} onChange={this.handleChange('family')} />
                    <input type='text' placeholder='subfamily' value={this.state.newPlant.subfamily} onChange={this.handleChange('subfamily')} />
                    <input type='text' placeholder='genus' value={this.state.newPlant.genus} onChange={this.handleChange('genus')} />
                    <input type='submit' value='Add New Plant' />
                </form>
            </div>
        );
    }
}


export default connect(mapStateToProps)(NewPlantForm);
