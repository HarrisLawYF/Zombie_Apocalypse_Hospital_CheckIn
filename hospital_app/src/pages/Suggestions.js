import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';
import background from "../assets/hospital.jpeg";
import { Button, List, Header, Icon, Divider, Segment, Grid } from 'semantic-ui-react'
import spinner from '../assets/spin.gif'
var Router = require("react-router");

export default class Suggestions extends Component {
    state = {
        hospitals: []
    };

    componentDidMount() {
        this.setState({isVisible: "block"})
        axios.post('http://localhost:3001/waitlist', {
            name: this.props.match.params.name,
            illness: this.props.match.params.illness,
            pain:this.props.match.params.pain
        }).then(res => {
            const hospitals = res.data;
            this.setState({ hospitals: hospitals });
            this.setState({ isVisible: "none"})
        }).catch(function (error) {
            this.setState({ isVisible: "none"})
            window.alert(error);
        });
    }

    render(){
        return(
            <div className="Suggestions" style={{height: '100%', backgroundImage: `url(${background})`, backgroundRepeat: 'repeat'}}>
                <Header as='h2' icon textAlign='center' style={{backgroundColor: '#fff'}}>
                    <Icon name='step backward' onClick={this.props.history.goBack} circular/>
                    <Header.Content>Click to pick other symptoms</Header.Content>
                </Header>
                <List divided size={'massive'} verticalAlign='middle' style={{backgroundColor: '#fff', position: 'absolute', width: '80%', left: '10%', right:'10%', overflow: 'scroll'}}>
                    {
                        this.state.hospitals.map((hospital) => {
                            return(
                                <List.Item key={hospital.id} style={{marginTop: '5px', marginBottom: '5px', marginLeft: '5px', marginRight: '5px'}}>
                                    <Segment>
                                        <Grid columns={3} relaxed='very'>
                                            <Grid.Column>
                                                <List.Content>
                                                    <List.Header>{hospital.name}</List.Header>
                                                </List.Content>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <List.Content>
                                                    <List.Header>Wait Time:</List.Header>
                                                </List.Content>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <List.Content>
                                                    <List.Header as='h2'>{hospital.waitTime}</List.Header>
                                                </List.Content>
                                            </Grid.Column>
                                        </Grid>
                                        <Divider vertical></Divider>
                                    </Segment>
                                </List.Item>)
                        })
                    }
                </List>
                <img style={{display: this.state.isVisible, position: "absolute", top: "25%", left:"25%"}} src={spinner} alt="loading..." />
            </div>
        );
    }
}

export{ Suggestions };
