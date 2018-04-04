import React, {Component} from 'react';
import styled from 'styled-components';

import { BindActionCreators } from 'redux';
import { connect } from 'react-redux'

import SingleInput from '../FormComponents/SingleInput';

import Button from 'components/Button';
import CenteredSection from './CenteredSection';

//button css
const SubmitInput = styled.input`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  
  border: 2px solid #f5b01d;
  background: #f5b01d;
  color: #FFF;

  &:active {
    background: #002147;
    color: #FFF;
  }
`;

class SignInForm extends Component {
	constructor(props) {
		super(props);
		this.link = 'https://tutor-find.herokuapp.com/login';

		
		this.state = {
			email: '',
			password: '',	
		};
		

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	
	handleEmailChange(e) {
		this.setState({ email: e.target.value }, () => console.log('email:', this.state.email));
	}
	
	handlePasswordChange(e) {
		this.setState({ password: e.target.value }, () => console.log('password:', this.state.password));
	}

	handleFormSubmit(e) { //validates and submits the form to the server
		e.preventDefault();

		const formPayload = {
			email: this.props.email,
			passhash: this.props.password
		};

		fetch(this.link, { 
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',	
			},
			body: JSON.stringify(formPayload)					
		})
		.then(response => console.log(response.json()))
		.catch(error => console.log('parsing failed', error));
	}

	render() {
		console.log("first name", this.props.legalFirstName);
		return (
			<div>
			<form onSubmit={this.handleFormSubmit}>
				<SingleInput
					inputType={'email'}
					title={''}
					name={'email'}
					controlFunc={this.handleEmailChange}
					content={this.state.email}
					placeholder={'Email'} />
				<SingleInput
					inputType={'password'}
					title={''}
					name={'password'}
					controlFunc={this.handlePasswordChange}
					content={this.state.password}
					placeholder={'Password'} />		
				<p>			
				<SubmitInput
					type="submit"
					value="Sign In"
					/>
				</p>
			</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return{
		userId: state.userId,
		userName: state.userName,
		email: state.email,
		password: state.password,
		salt: state.salt,
		userType: state.userType,

		legalFirstName: state.legalFirstName,
		legalLastName: state.legalLastName,
		bio: state.bio,
		img: state.img,
		active: state.active,

		major: state.major, //student props
		minor: state.minor,
		creationDate: state.creationDate,

		degrees: state.degrees, //tutor props
		links: state.links,
		timestamp: state.timestamp,
		ratings: state.ratings,
	}
}

export default connect(mapStateToProps) (SignInForm);
