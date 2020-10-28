import React, {Component} from 'react';

const validateInput = (checkingText) => {
    /* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */

    const regexp = /^\d{10,11}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
        return { isInputValid: true,
            errorMessage: ''};
    } else {
        return { isInputValid: false,
            errorMessage: 'Số điện thoại phải có 10 - 11 chữ số.'};
    }
}

function FormError(props) {
    /* nếu isHidden = true, return null ngay từ đầu */
    if (props.isHidden) { return null;}

    return ( <div>{props.errorMessage}</div>)
}

class Validation1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isInputValid: true,
            errorMessage: ''
        }
    }

    handleInput = event => {
        const { value } = event.target;
        this.setState({value});
    }

    handleInputValidation = event => {
        const { isInputValid, errorMessage } = validateInput(this.state.value);
        this.setState({
            isInputValid: isInputValid,
            errorMessage: errorMessage
        })
    }

    render() {
        return (
            <div>
                <input
                    name="fullname"
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation} />
                <FormError
                    isHidden={this.state.isInputValid}
                    errorMessage={this.state.errorMessage} />
            </div>
        );
    }
}

export default Validation1;