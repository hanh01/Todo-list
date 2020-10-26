import React, {Component} from "react";
import styled from "styled-components";
import {Button, Input, Checkbox} from "antd";
import './style.scss';
import * as axios from "axios";


const Title = styled.h1`
    color : red;
    text-align: center;
`;

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            input: '',
            isChecked: false,
        }
        this.handleInput = this.handleInput.bind(this)
        this.addItems = this.addItems.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.jobInput = React.createRef();
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/items`)
            .then(res => {
                const items = res.data;
                this.setState({items})
                this.jobInput.current.focus();

            })
            .catch(error => console.log(error));
    }

    handleInput(e) {
        this.setState({
            input: e.target.value,
        })
    }

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }

    addItems(e) {
        e.preventDefault();
        const input = this.state.input;
        const id = this.state.id;
        const isChecked = this.state.isChecked;
        let data = {
            input: this.state.input,
            isChecked: false,
            id,
        }
        if (input !== "") {
            axios.post(`http://localhost:3000/items`, data)
                .then(() => {
                    this.setState({
                        items: this.state.items.filter((p) => p.id !== id),
                        input: ""
                    })
                })
            if (!isChecked) {
                return window.history.back(); // back lại trang
            } else {
                window.history.forward(); // ngăn việc back lại trang
                // window.location.reload(); //refresh trang
            }
        }
    }

    render() {
        return (
            <div>
                <Title>Tạo công việc mới</Title>
                <form className="form-to-do" onSubmit={this.addItems}>
                    <div>
                        <Input
                            placeholder="Nhập nội dung công việc .........."
                            type="text"
                            className="form-search"
                            onChange={this.handleInput}
                            value={this.state.input}
                            ref={this.jobInput}
                        />
                        <Button htmlType="submit" className="submit">
                            Tạo công việc
                        </Button>
                        <Checkbox checked={this.state.isChecked} onClick={this.toggleChange}
                                  className="check-box">&ensp;Tiếp tục tạo việc</Checkbox>
                    </div>
                </form>
            </div>
        )
    }
}

export default Create;