import React,{Component} from 'react';
import ControlPanel from './views/controlpanel';

export default  class FluxVersion extends Component{
    render(){
        return(
            <div>
                <h3>Flux实现数据通信</h3>
                <ControlPanel/>
            </div>
        )
    }
}