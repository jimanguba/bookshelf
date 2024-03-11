import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React from 'react';
import Login from '../src/components/Login'; // Adjust the import path if necessary
import ReviewsList from './components/ReviewList'; // Adjust the import path if necessary
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import BookList from './pages/BookList';
import Goals from '../src/components/Goals';
import './App.css';
import ViewBook from './components/ViewBook';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/ListAlt';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'; // Statistics
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import BallotIcon from '@mui/icons-material/Ballot';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

// eslint-disable-next-line

function App() {
    const { collapseSidebar } = useProSidebar()
    return (
        <Router>
        <div style={{display: "flex", height: "100vh"}}>
            <Sidebar className = "app">
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon
                            onClick={() => {
                                collapseSidebar();
                            }}
                        />}
                    >
                        <Link to="/">
                            <h2>BOOKSHELF</h2>
                        </Link>
                    </MenuItem>
                    {/* <MenuItem
                        component={<Link to="/" />}
                        icon={<HomeOutlinedIcon />}
                    >
                        Home
                    </MenuItem> */}
                    <MenuItem
                        component={<Link to="/statistics"/>}
                        icon={<AssessmentOutlinedIcon />}
                    >
                        Statistics
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/book-list" />}
                        icon={<ListIcon />}
                    >
                        Book List
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/goals" />}
                        icon={<BallotIcon />}
                    >
                        Goals
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/login" />}
                        icon={<LogoutIcon />}
                    >
                        Log Out
                    </MenuItem>
                </Menu>
            </Sidebar>
            <section className="section-background">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/statistics" element={<Statistics user_id={1}/>} /> {/* TODO: in sprint 3 - user_id is hardcoded - change user_id to something more dynamic*/}
                    <Route path="/view-book/:book_id" element={<ViewBook />} />
                    <Route path="/book-list" element={<BookList />} />
                    <Route path="/review" element={<ReviewsList />} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/goals' element={<Goals />} /> {/* TODO: Same deal make this dynamic for each user gotta be a group chat*/}
                </Routes>
            </section>
        </div>
        </Router>
    )
};

export default App;
