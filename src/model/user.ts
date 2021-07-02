import {retry} from "rxjs/operators";

export class User {

  email: string;
  id: number;
  name: string;
  provider: string;
  uid: string;
  max_containers: number;
  remaining_containers: number;

  constructor(id, name, email, provider, uid, max_containers, remaining_containers) {
    this.id = id;
    this.uid = uid;
    this.name = name;
    this.provider = provider;
    this.email = email;
    this.max_containers = max_containers;
    this.remaining_containers = remaining_containers;
  }

}
