import React, {Component} from "react";
import {Checkbox, Button, Modal, message, Empty} from "antd";
import 'antd/dist/antd.css';
import './style.scss';
import {
    DeleteFilled, EditOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons';
import styled from "styled-components";
import {Link} from "react-router-dom";
import * as axios from "axios";

const Title = styled.h1`
    color : red;
    text-align: center;
`;

const {confirm} = Modal;

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
            Chưa có công việc nào . &nbsp; <a href="/todos/create">Thêm công việc mới (^.^)</a>
           </span>
        }/>)
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            input: '',
            isChecked: '',
            showForm: false,
        }
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleCheckCompleted = this.handleCheckCompleted.bind(this)
    }


    componentDidMount() {
        axios.get(`http://localhost:3000/items?isChecked=false`)
            .then(res => {
                const items = res.data;
                this.setState({items})
                if (items.length === 0) {
                    return this.handleShowForm()
                } else {
                    this.setState({items})
                }
            })
            .catch(error => console.log(error));
    }


    handleCheckCompleted(id) {
        let value = this.state.items.filter((e) => e.id === id);
        let data = {
            input: value[0].input,
            isChecked: true,
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


    handleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm
        });
    }


    success() {
        message.success({
            content: 'Công việc đã hoàn thành',
            className: 'custom-class',
            style: {
                marginTop: '0px',
                float: 'right',
                marginRight: '30px',
                fontSize: '15px'
            },
        });
    };


    showDeleteConfirm(id) {
        confirm({
            title: 'Bạn muốn xóa công việc này ?',
            icon: <ExclamationCircleOutlined/>,
            onOk: () => {
                axios.delete(`http://localhost:3000/items/${id}`)
                    .then(() => {
                        this.setState({
                            items: this.state.items.filter((p) => p.id !== id)
                        })
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    render() {
        const items = this.state.items;
        return (
            <div className="work-list">
                <Title>Danh sách công việc</Title>
                <div className="form">
                    <div>
                        <Link to="/todos/create">
                            <Button className='create'>Tạo công việc</Button><br/>
                        </Link>
                        <Link to="/todos/completed/">
                            <Button className='complete'>Công việc hoàn thành</Button><br/>
                        </Link>
                    </div>
                    {items.map((item) => (
                        <div className="list">
                            <p>
                                <Checkbox
                                    key={items.id}
                                    onChange={() => this.handleCheckCompleted(item.id)}
                                    className="check"
                                    checked={item.isChecked}
                                    style={{fontSize: '17px'}}
                                >
                                    &nbsp;{item.input}
                                </Checkbox>
                                <span>
                                    <DeleteFilled
                                        className="icon-delete"
                                        onClick={() => this.showDeleteConfirm && this.showDeleteConfirm(item.id)}
                                        type="dashed"/>
                                </span>
                                <span>
                                    <Link to={{
                                        pathname: `/todos/${item.id}/edit`,
                                        state: {item}
                                    }}>
                                        <EditOutlined className="icon-edit"/>
                                    </Link>
                                </span>
                                <span>
                                    <div className="time">
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

export default Home;