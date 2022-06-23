import { usestate, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './components/login/Form';
import Login from './components/login/Login';
import Main from './components/main/Main';
import { Link } from 'react-router-dom';
import './components/scss/style.scss'

function App() {
  
  return (
			<div className='layout'>
				<Link to="/login">로그인 페이지</Link>
				<Routes>
					<Route exact path="/" element={<Form />} />
					<Route path="/login" element={<Login />} />
					<Route path="/main" element={<Main />} />
				</Routes>
			</div>
		);
}

export default App;
