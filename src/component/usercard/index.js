import React, { Component } from 'react';
import {Card,WingBlank} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class Index extends Component{
    static propTypes = {
        userlist:PropTypes.array.isRequired
    };

    handleClick(v){
        this.props.history.push(`/chat/${v._id}`);
    }

    render(){
        const Header=Card.Header;
        const Body=Card.Body;
        return(
            <div>
                <WingBlank>
                    {this.props.userlist.map(v=>(
                        v.avatar ? <Card
                            onClick={()=>this.handleClick(v)}
                            key={v._id}>
                            <Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Body>
                                {v.desc.split('\n').map(d=>(
                                    <div key={d}>{d}</div>
                                ))}
                                {v.type ==='boss'? <div>薪资:{v.salary}</div>:null}
                                {/*{console.log(v.salary)}*/}
                            </Body>
                        </Card>:null
                    ))}
                </WingBlank>
            </div>
        )
    }
}


export default withRouter(Index);
