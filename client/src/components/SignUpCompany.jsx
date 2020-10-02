import React from 'react';
import axios from 'axios';
import LoginCompany from "./LoginCompany.jsx";

class SignUpCompany extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            password:'',
            imageUrl:'',
            key:'',
            toLogin : false
        }
    }
    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }
    submit(e){
        e.preventDefault();
        const {name,password,image,key}=this.state
        axios.post('/signup/company',{name,password,image,key}).then(()=>{
        var login = !this.state.toLogin 
        this.setState({toLogin: login})
        })
    }
    render(){
        return(
            <div>
                {!this.state.toLogin ? 
                <div>
            <label>Enter the name of the Company</label><br></br>
            <input type="text" onChange={this.handleChange.bind(this)}
            name='name' value={this.state.name}/><br></br>
            <label>Enter the password</label><br></br>
            <input type="new-password" onChange={this.handleChange.bind(this)}
            name='password' value={this.state.password}/><br></br>
            <label></label>imageUrl<br></br>
            <input type="text"  onChange={this.handleChange.bind(this)}
            name='image' value={this.state.image}/><br></br>
            <label></label>Declare key<br></br>
            <input type="new-password"  onChange={this.handleChange.bind(this)}
            name='key' value={this.state.key}/><br></br>
            <button onClick={this.submit.bind(this)} >sign up Company</button>
            </div> : <LoginCompany/>}
            </div>
        )
    }
}
export default SignUpCompany;