import React, { useState, useEffect } from 'react';
import firebase from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Form() {
	const navi = useNavigate()
	const [text, setText] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});
	const [err, setErr] = useState({});
	const [success, setSuccess] = useState(false);
	const [result, setResult] = useState(false);
	const [catchErr, setCatchErr] = useState('')
	const check = (e) => {
		e.preventDefault();
		const errObject = {};
		const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
		if (!text.name.length) {
			errObject.name = '이름을 입력하세요'
		}
		if (!text.email.length) {
			errObject.id = '올바른 이메일을 입력하세요';
		}
		if (text.password.length < 3) {
			errObject.password = '비밀번호 6글자 이상 입력하세요';
		}
		if (text.password2.length < 3 || text.password !== text.password2) {
			errObject.password2 = '비밀번호를 같게 입력하세요';
		}
		
		setErr(errObject);
		setResult(true);
		return err;
	};
	useEffect(() => {
		if (Object.keys(err).length === 0 && result) {
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, text.email, text.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				alert('회원가입이 되셨습니다');
				navi('/login');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
				// ..
				setCatchErr(errorMessage);
			});
			setSuccess(true)
		} else {
			setSuccess(false)
		}
	}, [err]);

	useEffect(() => {
		if (success) {
			

		}
	},[success])
	return (
		<>
			{success && <h2>회원가입이 되셨습니다</h2>}
			<form onSubmit={check}>
				<fieldset>
					<legend>입력 양식</legend>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="userName">이름</label>
									<input
										type="text"
										name="name"
										id="userName"
										value={text.name}
										onChange={(e) => {
											const { name, value } = e.target;
											setText({ ...text, [name]: value });
										}}
									/>
									<span>{err.name}</span>
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="userEmail">이메일</label>
									<input
										type="text"
										name="email"
										id="userEmail"
										value={text.email}
										onChange={(e) => {
											const { name, value } = e.target;
											setText({ ...text, [name]: value });
										}}
									/>
									<span>{err.id}</span>
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="password">비밀번호</label>
									<input
										type="password"
										name="password"
										id="password"
										onChange={(e) => {
											const { name, value } = e.target;
											setText({ ...text, [name]: value });
										}}
									/>
									<span>{err.password}</span>
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="password">비밀번호 확인</label>
									<input
										type="password"
										name="password2"
										id="password2"
										onChange={(e) => {
											const { name, value } = e.target;
											setText({ ...text, [name]: value });
										}}
									/>
									<span>{err.password2}</span>
								</td>
							</tr>
						</tbody>
					</table>
					<input type="submit" value="전송" />
					<span>{catchErr&&catchErr}</span>
				</fieldset>
			</form>
			<Link to='/login'>이미 회원가입이 되셨다면?</Link>
		</>
	);
}

export default Form;
