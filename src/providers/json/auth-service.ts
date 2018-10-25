import {Rest} from './rest';
import {Router} from './router';

import {JsonBaseService} from './json-base-service'


export class AuthService extends JsonBaseService {

  constructor(rest : Rest, router : Router) {
    super(rest, router);
  }

  auth(username: string, password: string) {
    const url = `/auth`
    const data = {
      "username": username,
      "password": password,
    }

    return this.post(url, data);
  }
}
