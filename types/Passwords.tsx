export interface Password {
  id: string;
  appname: string;
  username: string;
  password: string;
  category: string;
  created_at: string;
}
export class Password {
  constructor(
    id: string,
    appname: string,
    username: string,
    password: string,
    category: string,
    created_at: string
  ) {
    this.id = id;
    this.appname = appname;
    this.username = username;
    this.password = password;
    this.category = category;
    this.created_at = created_at;
  }
}
