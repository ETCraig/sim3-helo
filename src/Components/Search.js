import React, { Component } from 'react'

import './Styles/Search.css';

import axios from 'axios';
import Home from '../assets/home.png';
import { Link } from 'react-router-dom';
import search from '../assets/search.png';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchParameter: '',
            searchInput: '',
            user: [],
            users: [],
            filteredUsers: [],
            currentPage: 1,
            usersPerPage: 4,
            filteredClicked: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleFormatCase = this.handleFormatCase.bind(this);
        this.handleUserSearch = this.handleUserSearch.bind(this);
    }
    componentDidMount() {
        axios.get('/api/checkLoggedIn').then().catch(res => {
            this.props.history.push("/");
        });
        this.getUserInfo();
        this.getUsers();
    }
    getUserInfo() {
        axios.get('/api/getUserInfo').then(res => this.setState({user: res.data}));
    }
    getUsers() {
        axios.get('/api/getUsers').then(res => this.setState({users: res.data}));
    }
    handleClick(e) {
        this.setState({currentPage: Number(e.target.id)});
    }
    handleUserSearch() {
        axios.get(`/api/userSearch/${this.state.searchParameter}/${this.state.searchInput}`).then(res => {
        this.setState({ users: res.data });
      });
    }
    reset = () => {
        this.setState({
            searchInput: '',
            filteredUsers: [],
            searchParameter: '...Search By',
            currentPage: 1,
            filteredClicked: false
        });
        this.getUsers();
    }
    addFriend(user_id, friend_id) {
        axios.post('/api/addFriend', {user_id, friend_id}).then(res => {
            res.data;
            this.getUsers();
        });
    }
    removeFriend(user_id, friend_id) {
        axios.delete(`/api/removeFriend/${user_id}/${friend_id}`).then(res => {
            res.data;
            this.getUsers();
        });
    }
    handleChange(prop, val) {
        this.setState({[prop]: val});
    }
    handleInputChange(prop, val) {
        this.setState({[prop]: this.handleFormatCase(val)});
    }
    handleFormatCase(str) {
        if(str) {
            return str[0].toUpperCase() + str.slice(1).toLowerCase();
        } else {
            null;
        }
    }
    render() {
        const {users, currentPage, usersPerPage, filteredUsers} = this.state;

        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = this.state.filteredClicked ? this.state.filteredUsers.slice(indexOfFirstUser, indexOfLastUser) : users.slice(indexOfFirstUser, indexOfLastUser);

        const pageNumbers = [];
        for(let i = 1; i <= Math.ceil(filteredUsers.length > 0 ? filteredUsers.length / usersPerPage : users.length / usersPerPage);
        i++
        ) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick}>
                    {number}
                </li>
            );
        });

        const renderUsers = this.state.users.length > 0 ? currentUsers.map((user, index) => {
            return(
                <div key={index} className='Filtered_User'>
                    <div className='Filtered_User_Img_Container'>
                        <img className='Filtered_User_Img' src={user.profile_picture} alt='' />
                    </div>
                    <div className='Filtered_User_Name'>
                        <span className='Filtered_User_First_Name'>
                            {user.first_name}
                        </span>
                        {"   "}
                        <span className='Filtered_User_Last_Name'>
                            {user.last_name}
                        </span>
                        {"    "}
                    </div>
                    <div className='Filtered_User_Add_Btn_Container'>
                        {user.is_friend === true ? (
                            <button className='Remove_Friend_Btn' onClick={() => this.removeFriend(this.state.user.id, user.id)}>
                                <p className='Remove_Btn_Text'>Remove Friend</p>
                            </button>
                        ) : (
                            <button className='Filtered_User_Add_Btn' onClick={() => this.addFriend(this.state.user.id, user.id)}>
                                <p className='Add_Btn_text'>Add Friend</p>
                            </button>
                        )}
                    </div>
                </div>
            );
        }) : null;
        return (
            <div className='Search-App'>
                <div className='Search-Header'>
                    <div className='Header-Left'>
                        <p className='Dash-header'>Helo</p>
                        <Link to="/Dashboard"><img className="Home-Option" src={Home} alt="house logo" /></Link>
                        <Link to='/Search'><img className='Search-Option' src={search} alt='Search-Option' /></Link>
                    </div>
                    <p className='Dash-Link'>Search</p>
                    <button className='Logout-Btn' onClick={() => { console.log('Loggin Out Now.'); }}><a href="http://localhost:3000/auth/logout">Logout</a></button>
                </div>

                <div className='Search-Content'>
                    <div className='Search-Bar'>
                        <select className="Custom-Select mr-sm-2 Search-Bar-Dropdown" id="inlineFormCustomSelect" value={this.state.searchParameter} onChange={e => this.handleChange("searchParameter", e.target.value)}>
                            <option defaultValue>Search by...</option>
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
                        <input type='text' className='Search-Input' onChange={e => this.handleInputChange('searchInput', e.target.value)} value={this.state.searchInput} />
                        <div className='Search-Btns-Container'>
                            <button className='Search-Btn' onClick={() => this.handleUserSearch()}>Search</button>
                            <button className='Reset-Btn' onClick={this.reset}>Reset</button>
                        </div>
                    </div>
                    <div className='Search-Users-List'>{renderUsers}</div>
                    <div className='Search-Pagenumber-Content'>
                        <ul className='pageNumbers'>{renderPageNumbers}</ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;