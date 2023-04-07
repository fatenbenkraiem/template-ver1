import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { Demandeur } from 'src/app/model/Demandeur';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {
  Demandeur  :Demandeur = new Demandeur();
  Demandeurs: Demandeur[] = [];
  totalDemandeurs!: number;
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  constructor(private contactservice :ContactService,
   /* private toastr: ToastrService,*/
    private router: Router){ }

    createdemandeur(){
      console.log(this.Demandeur)
      this.Demandeur.role='user';
      this.contactservice.create(this.Demandeur).subscribe(data=>{
        console.log(data)
       // this.toastr.success("Actualité publié avec succès!")
        this.getDemandeurs()
        this.redirectToList()
      }, error=>{
        //this.toastr.error("Erreur, Serveur ne répond pas!")
      });
    }
    editdemandeur(demandeur: Demandeur){
    //var id= Object.values(demandeur)[0]
    console.log(demandeur.id)
      this.gotoTop();
      this.showEditForm();
      console.log(this. addFormVisible)
       this.contactservice.findcontactById(demandeur.id).subscribe(data=>{
        this. Demandeur = data;
      });
    }
    deletedemandeur(id:number) {
      this.contactservice.deletecontact(id).subscribe(data => {
        //this.toastr.warning("L'actualité supprimée!")
        this.getDemandeurs();
        this.redirectToList()
        
      }, error => {
        //this.toastr.error("Error, server not responding!")
        console.log(error)
      })
    }
    updatedemandeur(){
      this.contactservice.update(this.Demandeur,this.Demandeur.id).subscribe(data=>{
        console.log(data)
          //this.toastr.success("candidat Modifier  avec succès!")
          this.getDemandeurs()
          this.redirectToList()
        }, error=>{
          console.log(error);
          //this.toastr.error("Erreur, Serveur ne répond pas!")
        });
        this.Demandeur=new Demandeur();
      }
    getDemandeurs() {
      this.contactservice.getcontact().subscribe(data => {
        this.Demandeur = new Demandeur();
        if (data != null) {
          this. Demandeurs = data;
          this.totalDemandeurs = data.length;
          console.log(data.length)
          this.hideAddForm();
          this.hideEditForm();
        } else {
          this.totalDemandeurs = 0;
          this.Demandeurs = []
        }
      }, error => {
        // this.toastr.warning("Serveur ne répond pas!")
       });
    }
   
      
  ngOnInit(): void {
    this.getDemandeurs();
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

  gotoTDetails() {
    window.scroll({ 
      top: 700, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  redirectToList(){
    this.router.navigate(['/admin/demandeur'])
  }
}
