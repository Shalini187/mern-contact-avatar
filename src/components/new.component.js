import React, { Component } from 'react';
import axios from 'axios';
import ProfileImage  from './profileimage.component';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Pic1 from '../components/ProfileImage/avatar_1.jpg';
import Pic2 from '../components/ProfileImage/avatar_2.jpg';
import Pic3 from '../components/ProfileImage/avatar_3.jpg';
import Pic4 from '../components/ProfileImage/avatar_4.jpg';
import Pic5 from '../components/ProfileImage/avatar_5.png';
import Pic6 from '../components/ProfileImage/avatar_6.jpg';

import 'antd/dist/antd.css';


class Newcontact extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            username: '',
            phonenumber: '',
            email: '',
            image: ''
        }

        this.state = {
            fields: {},
            errors: {}
        }

    }


    componentDidMount() {
        axios.get('http://localhost:8000/existing/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username: response.data.username,
              phonenumber: response.data.phonenumber,
              email: response.data.email,
              image: response.data.image
            })  
          })
          .catch(function (error) {
            console.log(error);
        })
    
    }


    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
   
        //Name
        if(typeof fields["name"] !== "undefined"){
           if(!fields["name"].match(/^[a-zA-Z]+ [a-zA-Z]+$/)){
              formIsValid = false;
              errors["name"] = "Enter Firstname and Lastname";
           }        
        }
   
        //Phone Number
      if(typeof fields["phone"] !== "undefined"){
         if(!fields["phone"].match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)){
            formIsValid = false;
            errors["phone"] = "Enter Valid Phonenumber";
         }        
      }
    
        //Email
      if(typeof fields["emails"] !== "undefined"){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!fields["emails"].match(re)){
            formIsValid = false;
            errors["emails"] = "Enter Valid Email";
         }        
      }  
   
       this.setState({errors: errors});
       return formIsValid;
   }


   handleChange(field, e) {         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
    }


    onChangeImage = (image)=> { 
         this.setState({
                image
        })
        
    }


    Capitalize(str) {
        var res = str.split(" ");
        var first = res[0].charAt(0).toUpperCase() + res[0].slice(1).toLowerCase();
        var second = res[1].charAt(0).toUpperCase() + res[1].slice(1).toLowerCase();

        return first + " " + second;
      }

    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    
    onChangePhoneNumber(e) {
        this.setState({
            phonenumber: e.target.value
        })
    }

    
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        if(this.handleValidation()) {
            const existing = {
                username: this.Capitalize(this.state.username),
                phonenumber: this.state.phonenumber,
                email: this.state.email.toLowerCase(),
                image: this.state.image
            }
        
            console.log(existing);
            if(this.props.match.params.id){
                axios.post('http://localhost:8000/existing/update/' + this.props.match.params.id, existing)
              .then(res => console.log(res.data));
    
            alert('Updated Successfully!!!');
            }
            else{
                axios.post('http://localhost:8000/new/create/',existing)
              .then(res => console.log(res.data));
    
            alert("Form submitted");
            }
            window.location = '/'; 
        }
        else {
            return alert("Form has errors.");
        }
        
    }
    

    render() {
        return (
            <div className = "container">
                <div class="row">
                    <div class="col-4" >
                        <div>
                            <Avatar shape="circle" size={180} icon={<UserOutlined />} src = {this.state.image} />
                            <ProfileImage 
                                onChangeImage = {this.onChangeImage} 
                                pic1 = {Pic1} 
                                pic2 = {Pic2}
                                pic3 = {Pic3} 
                                pic4 = {Pic4}
                                pic5 = {Pic5} 
                                pic6 = {Pic6} 
                            />
                        </div>
                        <div style={{ fontFamily: "Georgia", fontSize:20, position: 'fixed', left: '14%', bottom: 200, transform: 'translateX(-10%)' }}>
                            Hello, {this.state.username}
                        </div>
                    </div>
                    <div class="col-8">
                        <h3>CONTACT DETAILS OF A USER</h3>
                            <form onSubmit={this.onSubmit }>
                                <div className="form-group"> 
                                    <label>Username: </label>
                                    <input  type="text"
                                        required
                                        ref="name"
                                        className="form-control"
                                        placeholder = "eg: Laxmi Kumar"
                                        value={this.state.username}
                                        disabled = {this.props.disable}
                                        onInput={this.handleChange.bind(this, "name")} 
                                        onChange={this.onChangeUsername}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                </div>
                                <div className="form-group"> 
                                    <label>PhoneNumber: </label>
                                    <input  type="text"
                                        required
                                        ref="phone"
                                        className="form-control"
                                        placeholder = "eg: 9876543210"
                                        value={this.state.phonenumber}
                                        disabled = {this.props.disable}
                                        onInput={this.handleChange.bind(this, "phone")} 
                                        onChange={this.onChangePhoneNumber}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["phone"]}</span>
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input type="text" 
                                        required
                                        ref="emails"
                                        className="form-control"
                                        value={this.state.email}
                                        disabled = {this.props.disable}
                                        placeholder = "eg: abc123_@domain.domainsuffix"
                                        onInput={this.handleChange.bind(this, "emails")} 
                                        onChange={this.onChangeEmail}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["emails"]}</span>
                                </div>
                                <div className="form-group" style={{ position: 'absolute', right: '20%', bottom: -70, transform: 'translateX(-40%)'}}>
                                    <input type="submit" disabled = {this.props.disable}  value="Save" className="btn btn-primary" />
                                </div>
                            </form>
                    </div> 
                </div>
            </div>         
        )
      }
}

export default Newcontact;