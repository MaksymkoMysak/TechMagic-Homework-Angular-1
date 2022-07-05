import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  allComplete: boolean = false;
  searchValue: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  someComplete(): boolean { 
    if (this.users == null) { 
      return false; 
    } 
    return this.users.filter(t => t.checked).length > 0 && !this.allComplete; 
  }

  setAll(checked: boolean) { 
    this.allComplete = checked; 
    if (this.users == null) { 
      return; 
    } 
    this.users.forEach(t => (t.checked = checked)); 
  }

  updateAllComplete() { 
    this.allComplete = this.users != null && this.users.every(t => t.checked); 
  }

  deleteSelected() {
    if (this.users.filter(t => t.checked).length > 0) {
      this.users = this.users.filter(t => !(t.checked));
    } else {
      alert('Choose at least one user');
    }
  }

  sortUsers() {
    if (this.users.length > 0) {
      this.users = this.users.sort((a, b) => (a.name > b.name) ? 1 : -1);
    } else {
      alert('User list is empty');
    }
  }

  searchByName(searchValue: string) {
    if (this.users.length > 0) {
      let res = this.users.filter(user => (user.name === searchValue));
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
