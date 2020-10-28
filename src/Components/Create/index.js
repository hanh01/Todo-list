import React, {Component} from "react";
import styled from "styled-components";
import {Button, Input, Checkbox, message} from "antd";
import './style.scss';
import * as axios from "axios";

const Title = styled.h1`
    color : red;
    text-align: center;
`;


function FormError(props) {
    if (props.isHidden) {
        return null;
    }
    return (<div style={{float: "left", color: "red", marginLeft: "360px"}}>{props.errorMessage}</div>)
}

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            input: '',
            isChecked: false,
            isInputValid: false,
            errorMessage: ''
        }
        this.handleInput = this.handleInput.bind(this)
        this.addItems = this.addItems.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.success = this.success.bind(this)
        this.validateInput = this.validateInput.bind(this)
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

    validateInput(input) {
        if (input.trim() !== '') {
            return {
                isInputValid: false,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: true,
                errorMessage: '* Vui lòng nhập trường này'
            };
        }
    }


    handleInputValidation = () => {
        const {isInputValid, errorMessage} = this.validateInput(this.state.input);
            this.setState({
                isInputValid: isInputValid,
                errorMessage: errorMessage,
            })
    }


    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }

    success() {
        message.success({
            content: 'Tạo công việc thành công',
            className: 'custom-class',
            style: {
                marginTop: '0px',
                float: 'right',
                marginRight: '30px',
                fontSize: '15px'
            },
        });
    };

    addItems(e) {
        e.preventDefault();
        const input = this.state.input;
        const id = this.state.id;
        const isChecked = this.state.isChecked;
        let data = {
            input: this.state.input,
            isChecked: false,
            id,
            time: '13:20'
        }
        if (input.trim() !== "") {
            this.success();
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
            }
        }
    }

    render() {
        return (
            <div style={{marginTop: 50}}>
                <Title>Tạo công việc mới</Title>
                <form className="form-to-do" onSubmit={this.addItems}>
                    <div>
                        <Input
                            placeholder="Nhập nội dung công việc .........."
                            type="text"
                            className="form-search"
                            onChange={this.handleInput}
                            onBlur={this.handleInputValidation}
                            value={this.state.input}
                            ref={this.jobInput}
                        />
                        <Button htmlType="submit" className="submit">
                            Tạo công việc
                        </Button>
                        <Checkbox checked={this.state.isChecked} onClick={this.toggleChange}
                                  className="check-box">&ensp;Tiếp tục tạo việc</Checkbox>
                    </div>
                    <FormError isHidden={!this.state.isInputValid}
                               errorMessage={this.state.errorMessage}/>
                </form>
            </div>
        )
    }
}

export default Create;