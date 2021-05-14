// array in local storage for registered users

export function configureFakeBackend() {

    let users = [
        {'id': 1, 'firstName':'Hamid','lastName':'Ghorbani','username':'hamid','password':'hamid','token':'hamid-jwt-token'},
        {'id': 2, 'firstName':'Adrian','lastName':'Ghorbani','username':'adrian','password':'adrian','token':'adrian-jwt-token'}
      ];

    window.fetch = function (url, opts) {
        console.log(`fake-backend started url : ${url}, opts:${JSON.stringify(opts)}`)
        const { method, headers } = opts;
        const body = opts && opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            setTimeout(handleRoute, 500);// wrap in timeout to simulate server api call
            function handleRoute() {
                switch (true) {
                    case url.includes('/login'):
                        return login();
                    case url.includes('/logout'):
                        return logout();
                    case url.includes('/users/register') && method === 'POST':
                        return registerNewUser(body);
                    case url.includes('/users/list'):
                        return getUsers();
                    default:
                        // pass through any requests not handled above
                        return error('configureFakeBackend.handleRoute(), incorrect url : ' + url);
                }
            }

            function login() {              
              let  username = url.substring(url.indexOf('username') + 10, url.indexOf('password') -2 );
              let  password = url.substring(url.indexOf('password') + 10, url.length - 1);
              let user = users.find(x =>  {return (x.username == username && x.password == password)});
              if (!user) {
                  console.log('FakeBackendUtil.login(), user not found!');
                return error('Username or password is incorrect!');
              }
              console.log('FakeBackendUtil.login(), found user : '+ JSON.stringify(user));
              return ok({ data: user });
            }

            function logout() {
              console.log('FakeBackendUtil.logout() called!');
              return ok({data:''});
            }

            function registerNewUser(body) {
                console.log('FakeBackendUtil.registerNewUser() started, input data: ' + JSON.stringify(body));
                let user = body;

                if (users.find(x => x.username === user.username)) {
                    return error(`Username  ${user.username} is already taken`);
                }

                // assign user id and a few other properties then save
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok({ data: user });
            }

            function isLoggedIn() {
                return (headers['Authorization']).includes('Bearer');
            }
            
            function getUsers() {
                if (!isLoggedIn()) 
                    return unauthorized();

                return ok({data:users});
            }

            function deleteUser() {
                if (!isLoggedIn()) return unauthorized();

                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }

            // helper functions

            function ok(body) {
                console.log('FakeBackendUtil.error() body: ' + JSON.stringify(body));
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message) {
                console.log('FakeBackendUtil.error() message: ' + JSON.stringify(message));
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        });
    }
}
