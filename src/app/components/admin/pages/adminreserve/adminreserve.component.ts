import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/model/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { Demandeur } from 'src/app/model/Demandeur';
import { ActualiteRes } from 'src/app/model/actualite-res';
import { RessourcesService } from 'src/app/services/ressources.service';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'app-adminreserve',
  templateUrl: './adminreserve.component.html',
  styleUrls: ['./adminreserve.component.css']
})
export class AdminreserveComponent implements OnInit {

  id!:string;
  iduser!:string;
  Demandeurs: Demandeur[] = [];
  actualitesRes!: ActualiteRes[];
  host: string = "http://127.0.0.1:8000";
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  base64Data: any;
  
  retrieveResonse: any;
  reservations: Reservation[] = [];
  
  reservation: Reservation = new Reservation();
  totalReservations!: number;


  constructor(
    //private toastr: ToastrService,
    private reservationService: ReservationService,
    private router: Router,
    private ressourcesService: RessourcesService,
    private contactservice :ContactService
  ) { }

  ngOnInit(): void {
    this.getReservations();
    this.getActualitesadmin();
    this.getDemandeurs();
  }


  getReservations() {
    this.reservation = new Reservation();
    this.reservationService.getReservations().subscribe(data => {
      if (data != null) {
        this.reservations = data;
        this.totalReservations = data.length;
      } else {
        this.totalReservations = 0;
        this.reservations = []
      }
    })
  }
  getActualitesadmin(){
    this.ressourcesService.getAll().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.actualitesRes = data;
      }else{
        this.actualitesRes = [];
      }
    }, error => {
    //  this.toastr.warning("Serveur ne répond pas!")
    });
  }
  getDemandeurs() {
    this.contactservice.getcontact().subscribe(data => {
      if (data != null) {
        this.Demandeurs = data;
        console.log(data.length)
      } else {
        this.Demandeurs = []
      }
    }, error => {
      // this.toastr.warning("Serveur ne répond pas!")
     });
  }

  createReservation() {
    console.log(this.reservation.etat)
    const formData = new FormData();
    formData.append('reservation', JSON.stringify(this.reservation))
    this.reservationService.createReservation(this.reservation,this.id,this.iduser).subscribe(response => {
      if (response != null) {
       // this.toastr.success("Réservation ajoutée avec succès")
        this.hideAddForm()
      }
      this.getReservations();
      this.redirectToList();
    })
  }

  editReservation(Reservation:Reservation) {
    //var id= Object.values(Reservation)[0]
    console.log(Reservation.id)
      this.gotoTop();
      this.showEditForm();
      console.log(this. addFormVisible)
    this.reservationService.findReservationById(Reservation.id).subscribe(data => {
      this.reservation = data;
      console.log(data)
    });
  }
  updateReservation(){
    this.reservationService.updateReservations(this.reservation.id,this.reservation).subscribe(data=>{
      console.log(data)
     // this.toastr.success("Actualité publié avec succès!")
      this.getReservations()
      this.redirectToList()
    }, error=>{
      //this.toastr.error("Erreur, Serveur ne répond pas!")
    });
  }

 
  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe(response => {
      if (response != null) {
       // this.toastr.success(" Réservation supprimée avec succès");
        this.getReservations();
      }
    })
  }
  onOptionSelected(event: any) {
    this.id = event.target.value;
    console.log(this.id);
  }
  onOptionSelect(event: any) {
    this.iduser = event.target.value;
    console.log(this.iduser);
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

  redirectToList() {
    this.router.navigate(['/admin/reserve'])
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
