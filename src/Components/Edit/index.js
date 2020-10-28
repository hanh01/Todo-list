import React, {Component} from "react";
import styled from "styled-components";
import {Button, Input, message} from "antd";
import './style.scss';
import * as axios from "axios";

const Title = styled.h1`
    color : red;
    text-align: center;
`;

const success = () => {
    message.success({
        content: 'Chỉnh sửa công việc thành công',
        className: 'custom-class',
        style: {
            marginTop: '0px',
            float: 'right',
            marginRight: '30px',
            fontSize: '15px'
        },
    });
};

function FormError(props) {
    if (props.isHidden) {
        return null;
    }
    return (<div style={{float: "left", color: "red", marginLeft: "440px"}}>{props.errorMessage}</div>)
}

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

    validateInput(input) {
        if (input.trim() !== '') {
            return {
                isInputValid: false,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: true,
                errorMessage: '* Vui lòng nhập nội dung muốn chỉnh sửa'
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

    EditItem(e,input) {
        e.preventDefault();
        const id = this.props.match.params.id;
        console.log(id)
        let data = {
            input: this.state.input,
            isChecked: false,
            id,
            time: '13:20'
        };
        if(input !== ""){
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
    }

    render() {
        const {input} = this.props.location.state.item;
        console.log(this.state.input)
        return (
            <div>
                <Title>Sửa công việc</Title>
                <form className="form-to-do" onSubmit={this.EditItem}>
                    <div>
                        <Input
                            name="hello"
                            type="text"
                            className="form-search"
                            onChange={this.handleInputEdit}
                            onBlur={this.handleInputValidation}
                            defaultValue={input}
                            ref={this.jobInput}
                        />
                        <Button htmlType="submit" className="submit" onClick={success}>
                            Lưu lại
                        </Button>
                    </div>
                    <FormError isHidden={!this.state.isInputValid}
                               errorMessage={this.state.errorMessage}/>
                </form>
            </div>
        )
    }
}

export default Edit;