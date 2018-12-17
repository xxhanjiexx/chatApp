import React,{Component} from 'react';

export const reactForm = (Comp)=>{
    return class WrapperComp extends Component{

        state={}

        handleChange =(key,val)=>{
            //console.log(key,val)
            this.setState({
                [key]: val
            });
        }

        render(){
            return <Comp handleChange={this.handleChange} state={this.state}{...this.props}/>
        }
    }
}