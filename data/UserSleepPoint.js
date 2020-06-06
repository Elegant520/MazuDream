export default class UserSleepPoint {
  static pIns = new UserSleepPoint;

  static getIns(){ return this.pIns; }

  constructor(){
    this.latitude= 25.040132;
    this.longitude= 121.511953;
  }
}