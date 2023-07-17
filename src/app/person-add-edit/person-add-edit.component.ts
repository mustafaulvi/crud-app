import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent implements OnInit {

  perForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _personServices: PersonService,
    private _dialogRef: MatDialogRef<PersonAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService ,

  ) {
    this.perForm = this._fb.group({
      firstName: '',
      lastName: '',
    });
  }

  ngOnInit(): void {
    this.perForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.perForm.valid) {
      if (this.data) {

        this._personServices.updatePerson(this.data.id, this.perForm.value).subscribe({

          next: (val: any) => {
            //alert('Person Updated  Successfuly');
            this._coreService.openSnackBar('Person Updated  Successfuly','done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        })

      } else {
        this._personServices.addPerson(this.perForm.value).subscribe({

          next: (val: any) => {
            //alert('Person Added Successfuly');
            this._coreService.openSnackBar('Person Added Successfuly','done');

            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        })

      }

    }
  }

}
