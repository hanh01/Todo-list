import React, {Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Button, Checkbox} from "antd";
import * as axios from "axios";
import './style.scss';

const Title = styled.h1`
    color : red;
    text-align: center;
`;

class Completed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            completed: [],
            id: '',
            input: '',
            isChecked: '',
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleCheckCompleted2 = this.handleCheckCompleted2.bind(this)
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/items?isChecked=true`)
            .then(res => {
                const items = res.data;
                this.setState({items})
            })
            .catch(error => console.log(error));

    }

    handleCheckCompleted2(id) {
        let value = this.state.items.filter((e) => e.id === id);
        let data = {
            input: value[0].input,
            isChecked: false,
            id: this.state.id,
        };
        axios.put(`http://localhost:3000/items/${id}`, data)
            .then(() => {
                this.setState({
                    items: this.state.items.filter((p) => p.id !== id),
                })
            })
    }

    render() {
        const items = this.state.items;
        return (
            <div className="work-list">
                <Title>Công việc đã hoàn thành</Title>
                <div className="form">
                    <div>
                        <Link to="/">
                            <Button className='create'>Danh sách công việc</Button><br/>
                        </Link>
                    </div>
                    {items.map((item) => (
                        <div className="list">
                            <p>
                                <Checkbox
                                    key={items.id}
                                    className="check"
                                    style={{fontSize: '17px'}}
                                    checked={item.isChecked}
                                    onChange={() => this.handleCheckCompleted2(item.id)}
                                >
                                    &nbsp;{item.input}
                                </Checkbox>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Completed;