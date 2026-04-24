import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  activeTab: 'template' | 'reactive' = 'template';
  menuOpen = false;

  // --- Template-Driven ---
  tdModel = { name: '', email: '', phone: '', category: 'general', issue: '' };
  tdSubmitted = false;
  tdResult: any = null;

  onTdSubmit(form: any) {
    this.tdSubmitted = true;
    if (form.valid) {
      this.tdResult = { ...this.tdModel, timestamp: new Date().toISOString() };
      console.log('Template-Driven POST /api/tickets', this.tdResult);
    }
  }

  resetTdForm(form: any) {
    form.resetForm();
    this.tdModel = { name: '', email: '', phone: '', category: 'general', issue: '' };
    this.tdSubmitted = false;
    this.tdResult = null;
  }

  // --- Reactive ---
  rfForm!: FormGroup;
  rfSubmitted = false;
  rfResult: any = null;

  ngOnInit() {
    this.rfForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      category: new FormControl('general'),
      issue: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  onRfSubmit() {
    this.rfSubmitted = true;
    if (this.rfForm.valid) {
      this.rfResult = { ...this.rfForm.value, timestamp: new Date().toISOString() };
      console.log('Reactive POST /api/tickets', this.rfResult);
    }
  }

  resetRfForm() {
    this.rfForm.reset({ category: 'general' });
    this.rfSubmitted = false;
    this.rfResult = null;
  }
}
