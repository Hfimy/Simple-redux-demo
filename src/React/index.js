import React,{Component} from 'react';
import Summary from './summary';

export default  class ReactVersion extends Component{
    render(){
        return(
            <div>
                <h3>React实现数据通信</h3>
                <Summary/>
            </div>
        )
    }
}