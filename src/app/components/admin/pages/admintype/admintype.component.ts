import { Component, OnInit } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';
import { ActualitesType } from 'src/app/model/actualite-type';
import { TypeService } from 'src/app/services/type.service';

import { Router } from '@angular/router';
//import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-admintype',
  templateUrl: './admintype.component.html',
  styleUrls: ['./admintype.component.css']
})
export class AdmintypeComponent implements OnInit {

  actualiteEF: ActualitesType= new ActualitesType();

  actualitesType!: ActualitesType[];

  totalActualites!: number;
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  constructor(
    private typeService: TypeService,
   // private toastr: ToastrService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.getActualites();
    
  }

  redirectToList(){
    this.router.navigate(['/admin/type'])
  }

  createActualiteEF(){
    this.typeService.createActualite(this.actualiteEF).subscribe(data=>{
      console.log(data)
     // this.toastr.success("Actualité publié avec succès!")
      this.getActualites()
      this.redirectToList()
    }, error=>{
      //this.toastr.error("Erreur, Serveur ne répond pas!")
    });
  }
  updateActualiteEF(){
    this.typeService.updateActualite(this.actualiteEF,this.actualiteEF.id).subscribe(data=>{
      console.log(data)
     // this.toastr.success("Actualité publié avec succès!")
      this.getActualites()
      this.redirectToList()
    }, error=>{
      //this.toastr.error("Erreur, Serveur ne répond pas!")
    });
  }
  getActualites(){
    this.actualiteEF = new ActualitesType();
    this.typeService.getAll().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.actualitesType = data;
        this.totalActualites = data.length;
        this.hideAddForm();
        this.hideEditForm();
      }else{
        this.totalActualites = 0;
        this.actualitesType = [];
      }
    }, error => {
     // this.toastr.warning("Serveur ne répond pas!")
    });
  }

  deleteActualite(id:number) {
    this.typeService.deleteActualite(id).subscribe(data => {
      //this.toastr.warning("L'actualité supprimée!")
      this.getActualites();
      this.redirectToList() 
    }, error => {
      //this.toastr.error("Error, server not responding!")
      console.log(error)
    })
  }

  editActualite(act: ActualitesType) {
    var id= Object.values(act)[0];
    this.typeService.findActualiteById(id).subscribe(data=>{
      this.actualiteEF = data;
      console.log(data)
      this.showEditForm();
    });
  }
  showAddForm() {
    this.addFormVisible = true;
  }
  hideAddForm() {
    this.addFormVisible = false;
  }

  showEditForm() {
    this.editFormVisible = true;
  }
  hideEditForm() {
    this.editFormVisible = false;
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
