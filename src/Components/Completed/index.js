import React, {Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Button, Empty, Checkbox, message} from "antd";
import * as axios from "axios";
import 'antd/dist/antd.css';
import './style.scss';

const Title = styled.h1`
    color : red;
    text-align: center`
;

function FormError(props) {
    if (props.isHidden === false) {
        return null;
    }
    return (<Empty
        image="https://partscargo.com/assets/images/no_data.png"
        imageStyle={{
            height: 200,
        }}
        description={
            <span>
            Chưa có công việc hoàn thành. &nbsp; <a href="/">Quay lại danh sách công việc</a>
           </span>
        }/>)
}

class Completed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            completed: [],
            id: '',
            input: '',
            isChecked: '',
            showForm: false,
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleCheckCompleted2 = this.handleCheckCompleted2.bind(this)
        this.handleShowForm = this.handleShowForm.bind(this)
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/items?isChecked=true`)
            .then(res => {
                const items = res.data;
                console.log(items)
                if (items.length === 0) {
                    return this.handleShowForm()
                } else {
                    this.setState({items})
                }
            })
            .catch(error => console.log(error));
    }

    success() {
        message.success({
            content: 'Đã di chuyển sang trang danh sách công việc',
            className: 'custom-class',
            style: {
                marginTop: '0px',
                float: 'right',
                marginRight: '30px',
                fontSize: '15px'
            },
        });
    };

    handleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    handleCheckCompleted2(id) {
        let value = this.state.items.filter((e) => e.id === id);
        let data = {
            input: value[0].input,
            isChecked: false,
            id: this.state.id,
            time: '13:20'
        };
        axios.put(`http://localhost:3000/items/${id}`, data)
            .then(() => {
                this.setState({
                    items: this.state.items.filter((p) => p.id !== id),
                })
                this.success()
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
                                <span>
                                    <div className="time1">
                                        {item.time}
                                    </div>
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
                <FormError isHidden={this.state.showForm}/>
            </div>
        )
    }
}

export default Completed;