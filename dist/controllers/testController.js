"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { id: 1, username: 'Manuel', email: 'manuel@examplo.com' },
    { id: 2, username: 'Mariax', email: 'maria@examplo.com' }
];
function list_users(req, res) {
    res.send(users);
}
exports.list_users = list_users;
function add_user(req, res) {
    users.push(req.body);
    res.send(users);
}
exports.add_user = add_user;
function welcome(req, res) {
    res.send('Welcome to BRMS API');
}
exports.welcome = welcome;
