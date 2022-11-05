import axios from 'axios';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

// const signupName = document.getElementById('signup-name-text');
// const signupEmail = document.getElementById('signup-email-text');
// const signupPassword = document.getElementById('signup-password-text');
// const signupPasswordConfirm = document.getElementById('signup-password-confirm-text');
// const signupBtn = document.getElementById('signup-new-btn');

const signupName = 'John';
const signupEmail = 'Appleseed';
const signupPassword = 'password';
const signupPasswordConfirm = 'password';
const allergens = ['dairy', 'gluten', 'peanuts', 'soy', 'tree nuts', 'wheat'];

class User {
    constructor(name, email, password, allergens) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.allergens = allergens;
    }
};

// Get Input Values
function getSignupInput() {
    let password = signupPassword;
    let passwordConfirm = signupPasswordConfirm;
    if (password === passwordConfirm) {
        let user = new User(signupName, signupEmail, signupPassword, allergens);
        return user;
    } else {
        alert('Passwords do not match! Please try again.');
    }
}

// Create User
async function createUser() {
    let newUser = getSignupInput();
    let jsonUser = JSON.stringify(newUser);
    let request = await axios.get('http://localhost:4000/users/', jsonUser);
    console.log(jsonUser);
    return jsonUser;
}
createUser();
