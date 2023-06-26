import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from 'src/models/data';
import { SearchWord } from "src/models/SearchWord";
import { PathToFile } from 'src/models/PathToFile';

@Injectable({
  providedIn: 'root'
})
 
export class DataService {


AddDataList(wordSearch_:string,path:string){
 // let path_to_file = {searchWord: {wordSearch:"mic" },path: path };
let searchWord=new SearchWord(wordSearch_);
 let path_to_file=new PathToFile(path,searchWord)
  return this.http.post<any>("https://localhost:44313/api/DataList",
  path_to_file, 
    { headers: { 'Content-Type': 'application/json' } });
}
getList(){
  return this.http.get<any>("https://localhost:44313/api/DataList");
}


uplodeCsv(file:FormData){
  // return this.http.put<any>("https://localhost:44313/api/DataList",
  // file, 
  //   { headers: { 'Content-Type': 'multipart/form-data' } });

    
  let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

  return this.http.post<any>('https://localhost:44313/api/UploadCsv', file, { headers });
}

getListSearchWord(wordSearch:any){
 let  SearchWord = { wordSearch: wordSearch };
 return this.http.put<any>("https://localhost:44313/api/DataList",
 SearchWord, 
   { headers: { 'Content-Type': 'application/json' } });
}



  constructor(public http: HttpClient) { } 

}

