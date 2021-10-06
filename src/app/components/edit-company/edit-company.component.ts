import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  editCompanyForm:FormGroup =  new FormGroup({
    
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
    public dialogRef: MatDialogRef<EditCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ){}

  onSave(): void {
    if(this.editCompanyForm.valid){
      this.dialogRef.close({...this.editCompanyForm.value, id: this.data.id})
    }
  }

  ngOnInit(): void {
    this.editCompanyForm.setValue({
      name: this.data.name,
      address: this.data.address,
      foundation_date: this.data.foundation_date,
      nit: this.data.nit
    })
  }

}
