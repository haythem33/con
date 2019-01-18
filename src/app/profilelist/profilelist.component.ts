import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { Router } from '@angular/router';
import { Control } from '../control';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-profilelist',
  templateUrl: './profilelist.component.html',
  styleUrls: ['./profilelist.component.css']
})
export class ProfilelistComponent implements OnInit {
  token;
  accountname;
  accountemail;
  listconsultant;
  i;
  fakePath;
  dataSource: MatTableDataSource<any>;
  CategoryFil;
  categoriesValue = [
    { category: 'IT' },
    { category: 'Accounting / Finance' },
    { category: 'Marketing & Sales' },
    { category: 'Telecommunication' },
  ];

  constructor(public listService: ListService, public router: Router) { }

  async ngOnInit() {

    this.token = this.listService.decodetoken();
    if (this.token['data'].companyname) {
      this.accountname = this.token['data'].companyname;
      this.accountemail = this.token['data'].companyemail;
    } else {
      this.accountname = this.token['data'].username;
      this.accountemail = this.token['data'].email;
    }
    this.listService.getConsultant().subscribe(res => {
      this.listconsultant = res;
      console.log(this.listconsultant);
      this.dataSource = new MatTableDataSource(this.listconsultant);
    });

  }
  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.listconsultant);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  FilterConsultant(f) {
    this.CategoryFil = this.listconsultant;
    this.CategoryFil = this.listconsultant.filter(items => f === items.category);
    if (this.CategoryFil.length > 0) {
      this.listconsultant = this.CategoryFil;
      console.log(this.listconsultant);
    } else {
      alert('there No profil with this description');
    }
    // for (this.i = 0; this.i < this.CategoryFil.length; this.i++)

  }

  removeFakePath(f) {

    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }

}