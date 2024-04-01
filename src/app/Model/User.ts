export class User {
    constructor(
        public Userid: string,
        public Username: string,
        public Email: string,
        private Token: string,
    ){}
    get token(){
        return this.Token;
    }
}