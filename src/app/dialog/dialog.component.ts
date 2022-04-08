import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import{MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  QuestionForm !: FormGroup;
  actionBtn : string ="Save"
  constructor(private formbuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef :MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.QuestionForm = this.formbuilder.group({
      QueID : ['',Validators.required],
      QueName : ['',Validators.required],
      Option_a : ['',Validators.required],
      Option_b : ['',Validators.required],
      Option_c: ['',Validators.required],
      Option_d : ['',Validators.required],
      Option_e : ['',Validators.required],
      Answer: ['',Validators.required],
      Level: ['',Validators.required],
      Time: ['',Validators.required],
      Type: ['',Validators.required],
      Section: ['',Validators.required],
      Subject: ['',Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.QuestionForm.controls['QueID'].setValue(this.editData.QueID);
      this.QuestionForm.controls['QueName'].setValue(this.editData.QueName);
      this.QuestionForm.controls['Option_a'].setValue(this.editData.Option_a);
      this.QuestionForm.controls['Option_b'].setValue(this.editData.Option_b);
      this.QuestionForm.controls['Option_c'].setValue(this.editData.Option_c);
      this.QuestionForm.controls['Option_d'].setValue(this.editData.Option_d);
      this.QuestionForm.controls['Option_e'].setValue(this.editData.Option_e);
      this.QuestionForm.controls['Answer'].setValue(this.editData.Answer);
      this.QuestionForm.controls['Level'].setValue(this.editData.Level);
      this.QuestionForm.controls['Time'].setValue(this.editData.Time);
      this.QuestionForm.controls['Type'].setValue(this.editData.Type);
      this.QuestionForm.controls['Section'].setValue(this.editData.Section);
      this.QuestionForm.controls['Subject'].setValue(this.editData.Subject);

    }
  }
  addQuestions(){
    if(!this.editData){
      if(this.QuestionForm.valid){
        this.api.postQuestion(this.QuestionForm.value)
        .subscribe({
          next:(res)=>{
            alert("Question added successfully")
            this.QuestionForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the question")
          }
        })
      }
    }else{
      this.updateQuestion()
    }
  }
  updateQuestion(){
    this.api.putQuestion(this.QuestionForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Question is Updated Successfully");
        this.QuestionForm.reset();
        this.dialogRef.close('update'); 
      },
      error:()=>{
        alert("Error while updating the record!!");
      }
    })
  }
}
