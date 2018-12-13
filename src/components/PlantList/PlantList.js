import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class PlantList extends Component {

    deletePlant = (id) => {
        this.props.dispatch({type: 'DELETE_PLANT', payload: id})
    }

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_PLANTS'})
    }

    render() {
        return (
            <div>
                <h3>This is the plant list</h3>
                <ul>
                    {this.props.reduxState.plantList.map( plant => {
                        return (<li key={plant.id}>
                            {plant.name}
                            <button onClick={() => this.deletePlant(plant.id)}>delete</button>
                        </li>)
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PlantList);
