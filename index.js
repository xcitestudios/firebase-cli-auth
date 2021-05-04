import firebase from "@firebase/app";
import "@firebase/auth";
import fs from "fs";

const appConfig = {
	"apiKey": "...",
	"authDomain": "....firebaseapp.com",
	"databaseURL": "https://....firebaseio.com",
	"projectId": "...",
	"storageBucket": "....appspot.com",
	"messagingSenderId": "...",
	"appId": "1:...:web:...",
	"measurementId": "G-...",
};

firebase.default.initializeApp(appConfig);

let email, pass;
[email, pass] = fs.readFileSync(0)
					.toString()
					.trim()
					.split("\n");


firebase
	.default
	.auth()
	.signInWithEmailAndPassword(email, pass)
	.then((loginResult) => {
		loginResult
			.user
			.getIdTokenResult()
			.then((tokenResult) => {
				console.log(JSON.stringify({
					'token': tokenResult.token,
					'refreshToken': loginResult.user.refreshToken
				}));
			});
	})
	.catch((ex) => {
		console.log("Login failed: ", ex.message, "\n");
		process.exit(1);
	});