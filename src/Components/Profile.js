import React, { Component } from 'react';

import './Styles/Profile.css';

import axios from 'axios';
import Home from '../assets/home.png';
import { Link } from 'react-router-dom';
import Search from '../assets/search.png';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            first_name: '',
            last_name: '',
            profile_picture: '',
            gender: '',
            hair_color: '',
            eye_color: '',
            hobby: '',
            birthday: '',
            birthday_month: '',
            birth_year: '',
            show_required: false
        }
    }
    handleChange(prop, val) {
        this.setState({[prop]: val});
    }
    componentDidMount() {
        axios.get('/api/checkLoggedIn').then().catch(res => {
            this.props.history.push('/');
        });
        this.getUserInfo();
    }
    getUserInfo() {
        axios.get('/api/getUserInfo').then(res => {
            this.setState({
                first_name: res.data.first_name ? res.data.first_name : "",
                last_name: res.data.last_name ? res.data.last_name : "",
                profile_picture: res.data.profile_picture ? res.data.profile_picture : "",
                gender: res.data.gender ? res.data.gender : "",
                eye_color: res.data.eye_color ? res.data.eye_color : "",
                hair_color: res.data.hair_color ? res.data.hair_color : "",
                hobby: res.data.hobby ? res.data.hobby : "",
                birthday: res.data.birthday ? res.data.birthday : "",
                birthday_month: res.data.birthday_month ? res.data.birthday_month : "",
                birth_year: res.data.birth_year ? res.data.birth_year : "",
                show_required: false
            });
        });
    }
    patchUser() {
        let {
            first_name,
            last_name,
            gender,
            hair_color,
            eye_color,
            hobby,
            birthday,
            birthday_month,
            birth_year
        } = this.state;
        let body = {
            first_name,
            last_name,
            gender,
            hair_color,
            eye_color,
            hobby,
            birthday,
            birthday_month,
            birth_year
        };
        if (birthday === 'Select') {
            this.setState({show_required: true});
        } else {
            this.setState({show_required: false});
            axios.patch('/api/userPatch', body).then(res => {
                this.props.history.push('/Dashboard');
            });
        }
    }
    render() {
        const required_error = (
            <div className='Open-Sans' style={{ color: 'red', marginTop: '20px', marginBottom: '20px' }}>
                Required fields: Birthday, month, and year.
            </div>
        );
        const yearsArray = [];
        const thisYear = 2018;
        for (let i = 0; i <= 100; i++) {
            yearsArray.push(thisYear - i);
        }
        let stuff = yearsArray.map((year, index) => {
            return (
                <option key={`year${index}`} value={year}>
                    {year}
                </option>
            );
        });
        return (
            <div className='Profile-App'>
                <div className='Profile-Header'>
                    <div className='Header-Left'>
                        <p className='Dash-header'>Helo</p>
                        <Link to="/Dashboard"><img className="Home-Option" src={Home} alt="house logo" /></Link>
                        <Link to='/Search'><img className='Search-Option' src={Search} alt='Search-Option' /></Link>
                    </div>
                    <p className='Dash-Link'>Profile</p>
                    <button className='Logout-Btn' onClick={() => { console.log('Loggin Out Now.'); }}><a href="http://localhost:3000/auth/logout">Logout</a></button>
                </div>

                <div className='Profile-Content'>
                    <div className='User-Content'>
                        <div className='User-Img-Content'>
                            <img src={this.state.profile_picture} alt='Profile Headshot' className='User' />
                        </div>
                        <div className='User-Info-Content'>
                            <div className='Profile-User-Text'>{this.state.first_name}</div>
                            <br />
                            <div className='Profile-User-Text'>{this.state.last_name}</div>
                            <br />
                        </div>
                    </div>
                    <div className='Update-Btns-Content'>
                        <button className='Update-Btn' onClick={_ => this.patchUser()}>Update</button>
                        <button className="Cancel-Btn" onClick={_ => this.getUserInfo()}>Cancel</button>
                    </div>
                </div>
                <div className='Edit-Profile'>
                    <div className='Edit-Profile-Left'>
                        <div className='Attribute'>
                            <span className='Edit-profile-First-Name'>First Name</span>
                        </div>
                        <input type='text' onChange={e => this.handleChange('first_name', e.target.value)} value={this.state.first_name} />
                        <div className='Attribute'>
                            <span className='Edit-Profile-Last-Name'>Last Name</span>
                        </div>
                        <input type='text' onChange={e => this.handleChange('last_name', e.target.value)} value={this.state.last_name} />
                        <div className='Attribute'>
                            <span>Gender</span>
                            <select className='Custom-Select mr-sm-2' id='inlineFormCustomSelect' onChange={e => this.handleChange('gender', e.target.value)} value={this.state.gender}>
                                <option value='Female'>Female</option>
                                <option value='Male'>Male</option>
                            </select>
                        </div>
                        <div className='Attribute'>
                            <span>Hair Color</span>
                            <select className="Custom-Select mr-sm-2" id="inlineFormCustomSelect" onChange={e => this.handleChange("hair_color", e.target.value)} value={this.state.hair_color}>
                                <option value='Blonde'>Blonde</option>
                                <option value='Red'>Red</option>
                                <option value='Brown'>Brown</option>
                                <option value='Black'>Black</option>
                                <option value='Grey'>Grey</option>
                            </select>
                        </div>
                        <div className='Attribute'>
                            <span>Eye Color</span>
                            <select className="Custom-Select mr-sm-2" id="inlineFormCustomSelect" onChange={e => this.handleChange("eye_color", e.target.value)} value={this.state.eye_color}>
                                <option value='Black'>Black</option>
                                <option value='Brown'>Brown</option>
                                <option value='Hazel'>Hazel</option>
                                <option value='Green'>Green</option>
                                <option value='Blue'>Blue</option>
                            </select>
                        </div>
                    </div>
                    <div className='Edit-Profile-Right'>
                        <div className='Attribute'>
                            <span>Hobby</span>
                            <select className="Custom-Select mr-sm-2" id="inlineFormCustomSelect" onChange={e => this.handleChange("hobby", e.target.value)} value={this.state.hobby}>
                                <option value='' disabled></option>
                                <option value='Archery'>Archery</option>
                                <option value='Art'>Art</option>
                                <option value='Camping'>Camping</option>
                                <option value='Coding'>Coding</option>
                                <option value='Cooking'>Cooking</option>
                                <option value='Fishing'>Fishing</option>
                                <option value='Guns'>Guns</option>
                                <option value='Hiking'>Hiking</option>
                                <option value='Hunting'>Hunting</option>
                                <option value='Movies'>Movies</option>
                                <option value='Music'>Music</option>
                                <option value='Photography'>Photography</option>
                                <option value='Reading'>Reading</option>
                                <option value='Sports'>Sports</option>
                                <option value='Surfing'>Surfing</option>
                            </select>
                        </div>
                        <div className='Attribute'>
                            <span>Birthday</span>
                            <select className="Custom-Select mr-sm-2" id="inlineFormCustomSelect" onChange={e => this.handleChange("birthday", e.target.value)} value={this.state.birthday}>
                                <option value="Select">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                        </div>
                        <div className='Attribute'>
                            <span>Birthday Month</span>
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => this.handleChange("birthday_month", e.target.value)} value={this.state.birthday_month}>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                        <div className='Attribute'>
                            <span>Birth year</span>
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => this.handleChange("birth_year", e.target.value)} value={this.state.birth_year}>
                                {stuff}
                            </select>
                        </div>
                    </div>
                </div>
                <div>{this.state.show_required ? required_error : null}</div>
            </div>
        );
    }
}

export default Profile;