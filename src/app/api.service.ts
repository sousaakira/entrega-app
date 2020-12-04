import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

console.log(location.host);


 if (location.host !== "localhost:8100") {
    console.log("local")
    var uri: any = "https://check.arbt.com.br/";
 }else {
    var uri: any = "http://19.16.0.70:3000/"; 
 }
@Injectable({
  providedIn: "root",
})

export class ApiService {
 
  url: string = uri;

  constructor(public http: HttpClient) {}

  
  moatraMenuEmitter = new EventEmitter();
  login(param: any) {
    this.moatraMenuEmitter.emit(param);
  }
  
  read(param) {
    return this.http.get(this.url + param).toPromise();
  }

  delete(param) {
    return this.http.delete(this.url + param).toPromise();
  }

  post(param: any, dados: any) {
    let headers = new HttpHeaders({ "Content-type": "application/json" });

    return this.http
      .post(this.url + param, dados, { headers: headers })
      .toPromise();
  }
  
  update(param: any, dados: any) {
    let headers = new HttpHeaders({ "Content-type": "application/json" });

    return this.http
    .put(this.url + param, dados, { headers: headers })
    .toPromise();
  }
}
