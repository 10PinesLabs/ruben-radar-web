export class User {

  email : string
  id : number
  name : string
  provider : string
  uid: string

  constructor(id, name, email, provider, uid) {
    this.id = id
    this.uid = uid
    this.name = name
    this.provider = provider
    this.email = email
  }

}
