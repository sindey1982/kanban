import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App  extends React.Component { 
    render() {
    	//const notes = this.state.notes;
        return (
        	<div>
        		<button onClick={this.addLane}>+</button>
                <AltContainer
                    stores={[LaneStore]}
                    inject={{
                        lanes: () => LaneStore.getState().lanes || []
                    }}
                >
        		  <Lanes />
                </AltContainer>
        	</div>
        ); 
    }
    addLane(){
        LaneActions.create({ name:'New lane' }); 
    }
}

