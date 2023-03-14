import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { OtherServicesService } from '../other-services.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @ViewChild('parForm') parForm!: NgForm;
  showParticulars: boolean = false;
  particulars: any = [];
  id:string = '';
  todayDate:any;
  constructor(private route: ActivatedRoute, private otherServices: OtherServicesService, private datePipe: DatePipe){
    this.todayDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd');
  }

  ngOnInit():void{
    this.route.params.subscribe((data:Params) => {
      this.id = data['id'];
      this.getParticulars(data['id']);
    })
  }
  onSubmit(){
    if(!this.parForm.valid){
      this.parForm.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('reservation', this.id);
      fd.append('particular', this.parForm.value.particular);
      fd.append('cost', this.parForm.value.amount);
      fd.append('remarks', this.parForm.value.remarks);
      fd.append('start_date', this.parForm.value.from_date);
      fd.append('end_date', this.parForm.value.to_date);
      this.otherServices.on_miscellaneous_service_save(fd).then((d:any) => {
        this.getParticulars(this.id);
      })
      this.parForm.reset();
    }
  }
  getParticulars(id:any){
    this.otherServices.get_miscellaneous_service_of_reservation(id).then((d:any) => {
      this.showParticulars = d[0] ? true : false;
      this.particulars = d;
    })
  }  
}
