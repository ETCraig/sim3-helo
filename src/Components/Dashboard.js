import React, { Component } from 'react';

import './Styles/Dashboard.css';

import axios from 'axios';
import { Link } from 'react-router-dom';
import search from '../assets/search.png';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            sortParameter: '',
            users: [],
            recommendedUsers: [],
            currentPage: 1,
            usersPerPage: 4,
            recommendedClicked: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleGetRecommended = this.handleGetRecommended.bind(this);
    }
    //Checks that user is logged, and gets Info.
    componentDidMount() {
        axios.get('/api/checkLoggedIn').then().catch(res => {
            console.log('error');
            this.props.history.push('/');
        });
        this.getUserInfo();
        this.getUsers();
    }
    handleChange(prop, val) {
        this.setState({[prop]: val}, _ => this.handleGetRecommended());
    }
    //Requests user info for pic, first, and last name.
    getUserInfo() {
        axios.get('/api/getUserInfo').then(res => this.setState({user: res.data}));
    }
    //Gets users pics, first, and last names.
    getUsers() {
        axios.get('/api/getUsers').then(res => {
            this.setState({users: res.data});
        })
    }
    handleClick(e) {
        this.setState({currentPage: Number(e.target.id)});
      }
    handleGetRecommended() {
        axios.get(`/api/getRecommended/${this.state.sortParameter}/${this.state.user[this.state.sortParameter]}`).then(resp => this.setState({ users: resp.data }));
        // const recommendedUsers = this.state.users.filter(user => {
        //     return user[this.state.sortParameter] === this.state.user[this.state.sortParameter] ? true : false;
        //   });
        //   this.setState({
        //     recommendedUsers: recommendedUsers,
        //     recommendedClicked: true
        //   });
    }
    addFriend(user_id, friend_id) {
        axios.post("/api/addFriend", { user_id, friend_id }).then(response => {
          response.data;
          this.getUsers();
        });
      }
    render() {
        let { users, currentPage, usersPerPage, recommendedUsers, recommendedClicked } = this.state;

        // Logic for displaying current users
        let indexOfLastUser = currentPage * usersPerPage;
        let indexOfFirstUser = indexOfLastUser - usersPerPage;
        let currentUsers = this.state.recommendedClicked ? recommendedUsers.slice(indexOfFirstUser, indexOfLastUser) : users.slice(indexOfFirstUser, indexOfLastUser);
        //

        // Logic for displaying page numbers
        let PageNumbers = [];
        for (let i = 1; i <= Math.ceil(recommendedClicked ? recommendedUsers.length / usersPerPage : users.length / usersPerPage); i++) {
            PageNumbers.push(i);
        }

        let renderPageNumbers = PageNumbers.map(number => {
            return (
                <li key={number} id={number} onClick={this.handleClick}>
                    {number}
                </li>
            );
        });
        // 

        let renderUsers = currentUsers.map((user, index) => {
            return user.user_id !== this.state.user.id && !user.is_friend ? (
                <div key={index} className='Filtered-User'>
                    <div className='Filtered-User-Img-Container'>
                        <img className='Filtered-User-Img' src={user.profile_picture} alt='' />
                    </div>
                    <div className='Filtered-User-Name'>
                        <span className='Filtered-User-First-Name'>{user.first_name}</span>
                        {"   "}
                        <span className='Filtered-User-Last-Name'>{user.last_name}</span>
                        {"    "}
                    </div>
                    <div className='Filtered-User-Add-Btn-Container'>
                        <button className='Filtered-User-Add-Btn' onClick={() => this.addFriend(this.state.user.id, user.id)}>
                            <p className='Add-Btn-Text'>Add Friend</p></button>
                    </div>
                </div>
            ) : null;
        });

        return (
            <div className='Dash-App'>

                <div className='Dash-Header'>
                    <div className='Header-Left'>
                        <p className='Dash-header'>Helo</p>
                        <Link to='/Search'><img className='Search-Option' src={search} alt='Search-Option' /></Link>
                    </div>
                    <p className='Dash-Link'>Dashboard</p>
                    <button className='Logout-Btn' onClick={() => { console.log('Loggin Out Now.'); }}><a href="http://localhost:3000/auth/logout">Logout</a></button>
                </div>

                <div className='Display-User-Content'>
                    <div className='User-Content'>
                        <div className='User-Img-Content'>
                            <img src={this.state.user.profile_image} alt='Profile' className='User-Img' />
                        </div>
                        <div className='User-Info-content'>
                            <span className='User-Text'>{this.state.user.first_name}</span>
                            <br />
                            <span className='User-text'>{this.state.user.last_name}</span>
                            <br />
                            <Link to='/Profile'><button type='' className='Edit-Btn'>Edit Profile</button></Link>
                        </div>
                    </div>
                    <div className='Display-Welcome-Content'>
                        <div className='Welcome-Text-Content'>
                            <p className='Wlecome-Text'>
                                Welcome to Helo! Find recommended friends based on your
                                similarities, and even search for them by name. The more you
                                update your profile, the better recommendations we can make!
                            </p>
                        </div>
                    </div>
                </div>

                <div className='Display-Recommended-Friends-Content'>
                    <div className='Recommended-Friends-Header'>
                        <div className='Recommended-Friends-Title'>Recommended Friends</div>
                        <div className='Sorted-By-Parent'>
                            Sort by{' '}
                            <select className='Custom-Select mr-sm-2 Search-Bar-Dropdown' id='inlineFormCustomSelect' onChange={e => this.handleChange('sortParameter', e.target.value)}>
                                <option defaultValue="...">...</option>
                                <option value="first_name">First Name</option>
                                <option value="last_name">Last Name</option>
                                <option value="gender">Gender</option>
                                <option value="hair_color">Hair Color</option>
                                <option value="eye_color">Eye Color</option>
                                <option value="hobby">Hobby</option>
                                <option value="birthday">Birthday</option>
                                <option value="birthday_month">Birthday Month</option>
                                <option value="birth_year">Birth Year</option>
                            </select>
                        </div>
                    </div>
                    <div className="Users-List">{renderUsers}</div>
                </div>
                <div className="Pagenumber-Container">
                    <ul className="PageNumbers">{renderPageNumbers}</ul>
                </div>
            </div>
        );
    }
}

export default Dashboard;