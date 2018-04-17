const users = [
    { id: 1, username: 'Manuel', email: 'manuel@examplo.com' },
    { id: 2, username: 'Mariax', email: 'maria@examplo.com' }
  ];

export function list_users(req, res) {
    res.send(users);
}

export function add_user(req, res) {
    users.push(req.body);
    res.send(users);
}


export function welcome(req, res) {
    res.send('Welcome to BRMS API');
}