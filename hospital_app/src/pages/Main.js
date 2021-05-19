import React, { Component } from 'react';
import background from "../assets/hospital.jpeg";
import { Button, List, Header, Icon } from 'semantic-ui-react'
import spinner from '../assets/spin.gif'

import axios from "axios";

export default class Main extends Component {
    state = {
        illnesses: [],
        isVisible: "none",
        name: "",
    };

    componentDidMount() {
        this.setState({isVisible: "block"})
        axios.get(`http://localhost:3001/illnesses`)
        .then(res => {
            const illnesses = res.data;
            this.setState({ illnesses: illnesses });
            this.setState({ isVisible: "none"})
        }).catch(function (error) {
            this.setState({ isVisible: "none"})
            window.alert(error);
        });
    }

    submitCase = (name, illness, pain) =>{
        if(name === ""){
            window.alert("Patient's name is required");
        } else{
            this.props.history.push("/suggestions/"+name+"/"+illness+"/"+pain)
        }
    };

    updateDetails = detail =>{
        this.setState({[detail.target.name]:detail.target.value})
    }

    render(){
        return(
            <div className="Main" style={{height: '100%', backgroundImage: `url(${background})`, backgroundRepeat: 'repeat'}}>
                <Header as='h2' icon textAlign='center' style={{backgroundColor: '#fff'}}>
                    <Icon name='hand peace' circular />
                    <Header.Content>For your survival, we are always here to help</Header.Content>
                </Header>
                <List divided size={'massive'} verticalAlign='middle' style={{backgroundColor: '#fff', position: 'absolute', width: '80%', left: '10%', right:'10%', overflow: 'scroll'}}>
                    <List.Item style={{marginTop: '5px', marginBottom: '5px', marginLeft: '5px', marginRight: '5px'}}>
                        <List.Content floated='right'>
                            <input type="text" placeholder="Enter Patient's name" name="name" onChange={this.updateDetails} id="name" required/>
                        </List.Content>
                    </List.Item>
                    {
                        this.state.illnesses.map((illness) => {
                            return(
                            <List.Item key={illness.illness.id} style={{marginTop: '5px', marginBottom: '5px', marginLeft: '5px', marginRight: '5px'}}>
                                <List.Content floated='right'>
                                    <Button.Group>
                                        <Button color='red' onClick={() => this.submitCase(this.state.name,illness.illness.id,0)} style={{opacity: 0.2}}>0</Button>
                                        <Button color='red' onClick={() => this.submitCase(this.state.name,illness.illness.id,1)} style={{opacity: 0.4}}>1</Button>
                                        <Button color='red' onClick={() => this.submitCase(this.state.name,illness.illness.id,2)} style={{opacity: 0.6}}>2</Button>
                                        <Button color='red' onClick={() => this.submitCase(this.state.name,illness.illness.id,3)} style={{opacity: 0.8}}>3</Button>
                                        <Button color='red' onClick={() => this.submitCase(this.state.name,illness.illness.id,4)} style={{opacity: 1.0}}>4</Button>
                                    </Button.Group>
                                </List.Content>
                                <List.Content floated='right'>
                                    <List.Header>Severity:</List.Header>
                                </List.Content>
                                <List.Content floated='left'>
                                    <List.Header><List.Icon name='hospital' size='large'/>{illness.illness.name}</List.Header>
                                </List.Content>
                            </List.Item>)
                        })
                    }
                </List>
                <img style={{display: this.state.isVisible, position: "absolute", top: "25%", left:"25%"}} src={spinner} alt="loading..." />
            </div>
        );
    }
}

export{ Main };
