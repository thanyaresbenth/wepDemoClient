import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TopicTypeResponse} from "../models/topic-type-response.model";
import {TopicTypeRequest} from "../models/topic-type-request.model";
import {FormsModule} from "@angular/forms";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";

@Component({
  selector: 'app-topic-type',
  standalone: true,
  imports: [
    NgIf,
    HttpClientModule,
    NgForOf,
    FormsModule
  ],
  templateUrl: './topic-type.component.html',
  styleUrl: './topic-type.component.css'
})
export class TopicTypeComponent implements OnInit{

  topicType:Array<TopicTypeResponse> =[];
  constructor(private httpClient:HttpClient){

  }

  formTopicType : TopicTypeRequest = {
    topicTypeId :-1,
    topicTypeName : ""
  }

  showForm : boolean = false;

  ngOnInit(){
    this.findAll();
  }

  onclickAdd(){
    this.showForm =!this.showForm;
  }

  findAll(){
    this.httpClient.get<Array<TopicTypeResponse>>("http://localhost:8080/topic-type/type-find-all").subscribe(x=>{
    this.topicType =x;
    console.log(this.topicType);
    });
  }

  onSave(){

    if(this.formTopicType.topicTypeId != null &&  this.formTopicType.topicTypeId > 0){
      this.editData(this.formTopicType);
    }else{
      this.insertData(this.formTopicType);
    }
    console.log(this.formTopicType.topicTypeName);


  }
  insertData(topicTypeRequest:TopicTypeRequest){
    this.httpClient.post<TopicTypeResponse>("http://localhost:8080/topic-type/type-create",topicTypeRequest).subscribe(x =>{
      console.log(x);
      this.findAll();
    });
  }

  editData(topicTypeRequest:TopicTypeRequest){
    this.httpClient.post<TopicTypeResponse>("http://localhost:8080/topic-type/type-update",topicTypeRequest).subscribe(x =>{
      console.log(x);
      this.findAll();
    });
  }

  onEdit(topicTypeResponse:TopicTypeResponse){
    this.formTopicType.topicTypeName=topicTypeResponse.topicTypeName;
    this.formTopicType.topicTypeId=topicTypeResponse.topicTypeId;
    this.showForm=true;

    console.log(topicTypeResponse);
  }

  onDelete(id?: number){

    let deleteRequest : TopicTypeRequest={
      topicTypeId : id
    };
    this.httpClient.post<any>("http://localhost:8080/topic-type/type-delete",deleteRequest).subscribe(x=> {
      console.log(x);
      this.findAll();
    });

  }
}
