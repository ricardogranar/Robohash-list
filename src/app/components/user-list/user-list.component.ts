import { Component, OnInit } from '@angular/core';
import { UserListService } from '../../services/user-list.service';
import { UserInterface } from '../../interfaces/user.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [InfiniteScrollModule, MatTooltipModule, MatTableModule, ProgressSpinnerModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{

  displayedColumns: string[] = ['name', 'email', 'phone', 'avatar'];
  userList: UserInterface []=[]
  warn: string|null|undefined;
  constructor(private userListService: UserListService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  loading : boolean = false

  getUsers(){
    this.userListService.getUsers(12).subscribe({
      next: (result) => {
        this.userList = result
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  loadMoreUsers(){
    if (this.userList.length < 100) {
      this.loading = true
      this.userListService.getUsers(12).subscribe({
        next: (result) => {
          console.log(result);
          this.userList = [...this.userList,...result]
          this.loading = false;
        },
        error: (err) =>{
          console.log(err);
        }
      })
    }
  }
}
