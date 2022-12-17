import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EntryService } from '../entry.service';
import { MessageResponse } from '../messageResponse';
import { CompoundService } from '../compound.service';
import { LowerCasePipe } from '@angular/common';
import { Compound } from '../compound';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.css']
})
export class EntryDialogComponent {
  form!: FormGroup;
  compounds: Compound[] = [];
  selectedCompound?: Compound;
  date: string = this.getDate();
  userId: string = this.getUserId();

  constructor(
    private entryService: EntryService,
    private compoundService: CompoundService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EntryDialogComponent>
  ) { }

  ngOnInit(): void {
    this.getCompounds();
    this.form = this.formBuilder.group({
      compoundId: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
    });
  }
  submit(): void {
    this.entryService.createEntry({
    "employeeId": parseInt(this.userId),
    "compoundId": this.form.get('compoundId')?.value,
    "entryDate": this.date,
    "expirationDate": this.form.get('expirationDate')?.value})
      .subscribe({
        next: () => { this.dialogRef.close('Employee created successfully') },
        error: (error: any) => { alert("Error creating employee: " + error) }
      })
  }
  getUsername(): string {
    let lower: string = localStorage.getItem('username' ) || 'No username available';
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  getUserId(): string {
    let id: string = localStorage.getItem('id') || 'No id available';
    return id;
  }
  getCompounds() {
    this.compoundService.getAll()
    .subscribe({
      next: res => {
      this.compounds = res;
      },
      error: () => alert("Error fetching compounds")
      })
  }
  getDate(): string {
    const date = new Date();
    return date.toISOString().substring(0, 10);
  }
}
