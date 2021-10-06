import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  createCompanyForm:FormGroup =  new FormGroup({
    
    name: new FormControl('', [
      Validators.required
    ]),
    
    address: new FormControl('', [
      Validators.required
    ]),

    foundation_date: new FormControl('', [
      Validators.required
    ]),

    nit: new FormControl('', [
      Validators.required
    ])

  })

  constructor(
    public dialogRef: MatDialogRef<CreateCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ){}

  onSave(): void {
    if(this.createCompanyForm.valid){
      this.dialogRef.close(this.createCompanyForm.value)
    }
  }

  ngOnInit(): void {
  }

}
