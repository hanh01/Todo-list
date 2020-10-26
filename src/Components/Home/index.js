import React, {Component} from "react";
import {Checkbox, Button, Modal} from "antd";
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            input: '',
            isChecked: '',
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
                console.log(res)
            })
            .catch(error => console.log(error));
    }

    handleCheckCompleted(id) {
        let value = this.state.items.filter((e) => e.id === id);
        let data = {
            input: value[0].input,
            isChecked: true,
            id: this.state.id,
        };
        axios.put(`http://localhost:3000/items/${id}`, data)
            .then(() => {
                this.setState({
                    items: this.state.items.filter((p) => p.id !== id),
                })
            })
    }

    showDeleteConfirm(id) {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined/>,
            onOk:() =>{
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

    // deleteItem(id) {
    //     // eslint-disable-next-line no-restricted-globals
    //     if (confirm("Bạn muốn xóa")) {
    //         axios.delete(`http://localhost:3000/items/${id}`)
    //             .then(() => {
    //                 this.setState({
    //                     items: this.state.items.filter((p) => p.id !== id)
    //                 })
    //             })
    //             .catch(e => {
    //                 console.log(e);
    //             });
    //     }
    // }

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
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Home;