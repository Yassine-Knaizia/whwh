import React from 'react'
import axios from 'axios'
import Login from './Login.jsx'
class Signe extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            nameC:'',
            password:'',
            passwordC:'',
            image:'',
            imageC:'',
            key:'',
            keyC:'',
            boli : false ,
            oboli : false 
        }
        this.log = this.log.bind(this)
        this.togo = this.togo.bind(this)
        this.submit = this.submit.bind(this)
        this.hashCode=this.hashCode.bind(this)
    }
    log(){
        var bol = !this.state.oboli 
        this.setState({oboli : bol})
    }
    hashCode(str) {
        var hash = 0;
        if (str.length == 0) {
            return hash;
        }
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; 
        }
        return hash;
    }
        submit(e){
            e.preventDefault()
            const {name,password,image,key}=this.state
           
            const Password=this.hashCode(password)
           
            console.log({name,Password,image,key})
        axios.post('/post',{name,Password,image,key})
        
    }
    submitC(e){
        e.preventDefault()
        const {nameC,passwordC,imageC,keyC}=this.state
        const PasswordC=this.hashCode(passwordC)
        console.log({nameC,passwordC,imageC,keyC})
    axios.post('/postC',{nameC,PasswordC,imageC,keyC})

    }
    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
        console.log(this.state)
        console.log(this.hashCode(this.state.password))
    }
    togo(){
        var bol = !this.state.boli 
        this.setState({boli : bol })
    }
    
    render(){
        return ( 
        <div>
            {!this.state.oboli ? 
        <div>
            { !this.state.boli ? 
            <div>
                
            <label>Enter the name</label><br></br>
            <input type="text" onChange={this.handleChange.bind(this)}
            name='name' value={this.state.name}/><br></br>
            <label>Enter the password</label><br></br>
            <input type="new-password" onChange={this.handleChange.bind(this)}
            name='password' value={this.state.password}/><br></br>
            <label></label>image<br></br>
            <input type="text"  onChange={this.handleChange.bind(this)}
            name='image' value={this.state.image}/><br></br>
            <label></label>Enter key<br></br>
            <input type="new-password"  onChange={this.handleChange.bind(this)}
            name='key' value={this.state.key}/><br></br>
            <button onClick={this.submit} >sign up user</button>
            <p>if you dont have an acount <a onClick={this.log}>log in</a></p>

            <br/>
            <button onClick={this.togo}>if you want to connect as a company click me </button>
            </div> : <div>
            
            <label>Enter the name company</label><br></br>
            <input type="text" onChange={this.handleChange.bind(this)}
            name='nameC' value={this.state.nameC}/><br></br>
            <label>Enter the password company</label><br></br>
            <input type="new-password" onChange={this.handleChange.bind(this)}
            name='passwordC' value={this.state.passwordC}/><br></br>
            <label></label>image of company<br></br>
            <input type="text"  onChange={this.handleChange.bind(this)}
            name='imageC' value={this.state.imageC}/><br></br>
            <label></label>declare key<br></br>
            <input type="new-password"  onChange={this.handleChange.bind(this)}
            name='keyC' value={this.state.keyC}/><br></br>
            <button onClick={this.submitC.bind(this)}>sign up company</button>
            <p>if you dont have an acount <a onClick={this.log}>log in</a></p>
            <br/>
            <button onClick={this.togo}>if you want to connect as a user click me </button>
            </div>  }
            </div> : <Login/> }
            </div>
          )
    }
}


export default Signe;