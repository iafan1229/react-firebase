import React, { useState, useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../firebase'
import {db} from '../firebase';

function Login() {
	console.log(db)

	const navi = useNavigate();
	const [text, setText] = useState({
		email: '',
		password: '',
	});
	const [err, setErr] = useState({});
	const [success, setSuccess] = useState(false);
	const [result, setResult] = useState(false);
	const check = (e) => {
		e.preventDefault();
		const errObject = {};
		if (!text.email.length) {
			errObject.id = '올바른 이메일을 입력하세요';
		}
		if (text.password.length < 3) {
			errObject.password = '비밀번호 6글자 이상 입력하세요';
		}

		setErr(errObject);
		setResult(true);
		return err;
	};
	useEffect(() => {
		if(Object.keys(err).length === 0 && result ) {
			const auth = getAuth();
				signInWithEmailAndPassword(auth, text.email, text.password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					alert('로그인이 되셨습니다');
					setSuccess(true)
					try {
						const docRef = addDoc(collection(db, "users"), {
							first: "Ada",
							last: "Lovelace",
							born: 1815
						});
						console.log("Document written with ID: ", docRef.id);
					} catch (e) {
						console.error("Error adding document: ", e);
					}
					navi('/mains');
					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setSuccess(false)
					alert(errorMessage);
				});
		}
	}, [err]);

	useEffect(() => {
		if (success) {
			navi('/main')
		}
	}, [success]);
	return (
		<>
			<form onSubmit={check}>
				<fieldset>
					<legend>입력 양식</legend>
					<table>
						<tbody>
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
						</tbody>
					</table>
					<input type="submit" value="전송" />
				</fieldset>
			</form>
		</>
	);
}

export default Login;
