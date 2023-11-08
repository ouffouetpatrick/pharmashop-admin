import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Customers } from './customers.model';

import { customersData } from './data';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from 'src/app/interfaces/utilisateur';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class CustomersComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: Customers[];
  listUtilisateur: Utilisateur[] = [];
  nbrUtilisateur : number;
  numberOrder: number = 0;
  term: any;
  loading: boolean = false;

  // page
  currentpage = 1;
  itemsPerPage = 4;
  totalItems = 0; //Nombre total d'element initialisé à zero, sera affecté par tab lenght
  showSuccessAlert: boolean = false;

  constructor(
      private modalService: NgbModal, private formBuilder: FormBuilder,
      private _utilisateurService: UtilisateurService,
    ){}

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Administration' }, { label: 'Utilisateur', active: true }];

    this.formData = this.formBuilder.group({
      username: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address: ['', [Validators.required]],
      balance: ['', [Validators.required]]
    });

    /**
     * Fetches the data
     */
    this._fetchData();

    this.getEmploye();
  }

  getEmploye(){
    this.loading = true;
    const getEmploye = this._utilisateurService.getEmploye();
    getEmploye.subscribe((result) => {
      this.loading = false;
      this.listUtilisateur = result.sort((a, b) => b.id - a.id);
      this.nbrUtilisateur = result.length;
      this.totalItems = result.length;
      // console.log(result, "resultEmp");
    })
  }

  async supEmploye(utilisateurId : number){
    const supEmploye = await this._utilisateurService.deleteEmploye(utilisateurId);
    supEmploye.subscribe(()=>{
        this.getEmploye();
        this.showSuccessAlert = true;
        setTimeout(() => { this.showSuccessAlert = false;}, 1000);
    });
  }
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /**
   * Customers data fetches
   */
  private _fetchData() {
    this.customersData = customersData;
  }
  get form() {
    return this.formData.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }

  saveCustomer() {
    const currentDate = new Date();
    if (this.formData.valid) {
     const username = this.formData.get('username').value;
     const email = this.formData.get('email').value;
     const phone = this.formData.get('phone').value;
     const address = this.formData.get('address').value;
     const balance = this.formData.get('balance').value;

      this.customersData.push({
        id: this.customersData.length + 1,
        username,
        email,
        phone,
        address,
        balance,
        rating: '4.3',
        date: currentDate + ':' 
      })
      this.modalService.dismissAll()
    }
    this.submitted = true
  }

}
