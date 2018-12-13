import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class PlantList extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_PLANTS'})
    }

    render() {
        return (
            <div>
                <h3>This is the plant list</h3>
                <pre>{JSON.stringify(this.props.reduxState)}</pre>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PlantList);
