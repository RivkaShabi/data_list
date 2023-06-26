import { Component, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from 'src/models/data';

import { FormControl, Validators } from "@angular/forms";


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  arr: Data[] = [];
  filter = "";
  chack: Boolean[] = [];
  constructor(private http: HttpClient,public active: ActivatedRoute, public router: Router, public ser: DataService ) {
  }
  ngOnInit() {

    this.ser.AddDataList("", "" ).subscribe(secc => {
      this.arr = JSON.parse(secc);

      // this.ser.getList().subscribe(secc => {
      // }, err => { console.log(err); }
      // );      
    }, err => { console.log(err); }
    );
    
  }

  select() {
      this.ser.AddDataList(this.filter, "" ).subscribe(secc => {
        this.arr = JSON.parse(secc);
      }, err => { console.log(err); }
      );
    
    
    // this.ser.getListSearchWord(this.filter).subscribe(secc => {
    //   console.log(secc);
    //   this.arr = JSON.parse(secc);
    // }, err => { console.log(err); }
    // );
  }


  display: FormControl = new FormControl("", Validators.required);
  file_store: FileList | undefined;
  file_list: Array<string> = [];

  handleFileInputChange(l: FileList|null): void {
    console.log("handleFileInputChange",l)
    if (l!=undefined) { this.file_store = l;
     if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }}
  }

  handleSubmit(): void {
    console.log("handleSubmit")

    var fd = new FormData();
    this.file_list = [];
    if( this.file_store!=undefined)
    for (let i = 0; i < this.file_store.length; i++) {
      fd.append("files", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }

}
handleFileInput(event: any): void {
  const file: File = event.target.files[0];

  // Access the file details
  console.log('File name:', file);
  console.log('File type:', file.type);
  console.log('File size:', file.size);
  console.log('Last modified:', file.lastModified);
  // You can now perform further processing or upload the file
  this.uploadFile(file)}

uploadFile(file: File): void {
  const formData: FormData = new FormData();
  formData.append('file', file);
  this.ser.uplodeCsv(formData).subscribe(secc => {
    console.log(secc);
    this.arr = secc.data.serviceResponse;
  }, err => { console.log(err); }
  );  

  
}
}
