import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  allComplete: boolean = false;
  searchValue: string = '';

  newUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    id: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  });

  onSubmit(): void {
    if (this.newUserForm.invalid) {
      return;
    }
    let obj: User = {
      name: this.newUserForm.controls['firstName'].value + ' ' + this.newUserForm.controls['lastName'].value || '',
      email: this.newUserForm.controls['email'].value || '',
      phone: this.newUserForm.controls['phone'].value || '',
      id: Number(this.newUserForm.controls['id'].value) || 0,
      checked: false
    };
    //this.users.push(obj);
    this.http.post<User>("https://jsonplaceholder.typicode.com/users", obj).subscribe(data => {this.users.push(data);});;
    //this.http.post<User[]>("https://jsonplaceholder.typicode.com/users", obj).subscribe(data => {console.log(data);});;
  }

  constructor(private userService: UserService, private http: HttpClient) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  someComplete(): boolean {
    if (this.users == null) {
      return false;
    }
    return this.users.filter((t) => t.checked).length > 0 && !this.allComplete;
  }

  setAll(checked: boolean) {
    this.allComplete = checked;
    if (this.users == null) {
      return;
    }
    this.users.forEach((t) => (t.checked = checked));
  }

  updateAllComplete() {
    this.allComplete = this.users != null && this.users.every((t) => t.checked);
  }

  deleteSelected() {
    if (this.users.filter((t) => t.checked).length > 0) {
      this.users = this.users.filter((t) => !t.checked);
    } else {
      alert('Choose at least one user');
    }
  }

  sortUsers() {
    if (this.users.length > 0) {
      this.users = this.users.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      alert('User list is empty');
    }
  }

  searchByName(searchValue: string) {
    if (this.users.length > 0) {
      let res = this.users.filter((user) => user.name === searchValue);
      if (res.length > 0) {
        this.users = res;
      } else {
        alert('User not found');
      }
    } else {
      alert('User list is empty');
    }
  }

  reloadCurrentPage() {
    window.location.reload();
  }
}
