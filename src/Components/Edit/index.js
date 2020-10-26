import React, {Component} from "react";
import styled from "styled-components";
import {Button, Input} from "antd";
import './style.scss';
import * as axios from "axios";

const Title = styled.h1`
    color : red;
    text-align: center;
`;

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            input: '',
            isChecked: false,
        }
        this.handleInputEdit = this.handleInputEdit.bind(this)
        this.EditItem = this.EditItem.bind(this)
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

    handleInputEdit(e) {
        this.setState({
            input: e.target.value,
        })
    }

    EditItem(e) {
        e.preventDefault();
        const id = this.props.match.params.id;
        console.log(id)
        let data = {
            input: this.state.input,
            isChecked: false,
            id,
        };
        axios.put(`http://localhost:3000/items/${id}`, data)
            .then(() => {
                this.setState({
                    items: this.state.items.filter((p) => p.id !== id),
                })
            })
            .catch(e => {
                console.log(e);
            });
        return window.history.back();
    }

    render() {
        const {input} = this.props.location.state.item;
        console.log(this.state.input)
        return (
            <div>
                <Title>Sửa công việc</Title>
                <form className="form-to-do" onSubmit={this.EditItem}>
                    <Input
                        name="hello"
                        type="text"
                        className="form-search"
                        onChange={this.handleInputEdit}
                        defaultValue={input}
                        ref={this.jobInput}
                    />
                    <Button htmlType="submit" className="submit">
                        Lưu lại
                    </Button>
                </form>
            </div>
        )
    }
}

export default Edit;