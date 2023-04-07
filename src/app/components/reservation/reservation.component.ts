import { Component, OnInit } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/model/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservations: Reservation[] = [];
  host: string = "http://127.0.0.1:8000";
  
  constructor(
    private reservationService: ReservationService,
   // private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.gotoTop();
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getReservations().subscribe(data => {
      console.log(data);
      if (data != null) {
        this.reservations = data;
        console.log(data);
      }
    },error =>{
      //this.toastr.warning("Erreur, sérveur ne répond pas")
    })
  }


  gotoTDetails() {
    window.scroll({ 
      top: 1000, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }



}

