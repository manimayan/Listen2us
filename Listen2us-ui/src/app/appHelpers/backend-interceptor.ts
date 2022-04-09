import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    constructor() {}
        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        function UserDetailsStorage(userName, password, userType, firstName, lastName, age, gender, dob, wardNo, street, email)
        {
        this.userName = userName;
        this.password = password;
        this.userType = userType;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.dob = dob;
        this.wardNo = wardNo;
        this.street = street;
        this.email = email;
    }
        var Mani = new UserDetailsStorage("manimaran", "123456", "user", "Manimaran", "Palani", 24, "Male", "working on date field", 14, "big street", "mani@gmail.com");
        var Kavin = new UserDetailsStorage("kavin", "123456", "councillor", "Kavin", "Kumar", 24,  "Male", "working on date field", 14, "school street", "kavin@gmail.com");
  
        // array in local storage for registered users
        var users =  [];
        var userJSON = localStorage.getItem("users");
	    if (userJSON != null) {
		users = JSON.parse(userJSON);
	}
    	else {
        users = [Mani, Kavin];
		localStorage.setItem("users", JSON.stringify(users));
	}

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
        // authenticate
        if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
            // find if any user matches login credentials
            let filteredUsers = users.filter(user => {
                return user.userName === request.body.username && user.password === request.body.password && 
                user.userType === request.body.usertype;
            });

            if (filteredUsers.length) {
                // if login details are valid return 200 OK with user details and listenUs token
                let user = filteredUsers[0];
                let body = {
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userType: user.userType,
                    age: user.age,
                    gender: user.gender,
                    dob: user.dob,
                    wardNo: user.wardNo,
                    street: user.street,
                    email: user.email,
                    token: 'listenUs Token'     
                };

                return of(new HttpResponse({ status: 200, body: body }));
            } else {
                // else return 400 bad request
                return throwError({ error: { message: '' } });
            }
        }
        
        // get user by username
        if (request.url.match(/\/users\/\w+$/) && request.method === 'GET') {
            // check for token in header and return user if valid, this security is implemented server side in a real application
            if(request.headers.get('Authorization') === 'listenUs Token')  {
                // find user by id in users array
                    let urlParts = request.url.split('/');
                    let uniqueUser = urlParts[urlParts.length - 1];
                    let matchedUsers = users.filter(user => { 
                        return user.userName === uniqueUser; 
                    });
                    let user = matchedUsers.length ? matchedUsers[0] : null;
                    return of(new HttpResponse({ status: 200, body: user }));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        return throwError({ error: { message: 'Unauthorised' } });
                        }
        }
 
        // check availability of user
        if (request.url.endsWith('/users/registerCheck') && request.method === 'POST') {
            // get new user object from post body
            let newUser = request.body;
            // validation
            let duplicateUser = users.filter(user => { return user.userName === newUser.userName; }).length;
            if (duplicateUser) {
                return throwError({ error: { message: '' } });
            }
            return of(new HttpResponse({ status: 200, body : newUser.userName }));
        }

        // register user
        if (request.url.endsWith('/users/register') && request.method === 'POST') {
            // get new user object from post body
            let newUser = request.body;
            // save new user
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            // respond 200 OK
            return of(new HttpResponse({ status: 200 }));
        }

        // pass through any requests not handled above
        return next.handle(request);  
    }))

    // call materialize and dematerialize to ensure delay even if an error is thrown
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());
}
}

export let BackendProvider = {
// use backend simulation in place of Http service for backend-less development
provide: HTTP_INTERCEPTORS,
useClass: BackendInterceptor,
multi: true
};