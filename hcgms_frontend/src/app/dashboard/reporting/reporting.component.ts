import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import * as moment from 'moment';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ReportingService } from './reporting.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent {
  start_date:string = '';
  end_date!: Date | any;
  date: string = '';
  data: any = [];
  table_data:any = [];
  showReport: boolean = false;
  showLoader: boolean = false;
  constructor(private datePipe: DatePipe, private reportingService: ReportingService){}
  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
    
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");
    
        resolve(dataURL);
      };
    
      img.onerror = error => {
        reject(error);
      };
    
      img.src = url;
    });
  }
  async generateReport(){
    let docDefinition: any = {
      content: [
        {
          image: await this.getBase64ImageFromURL("../../../assets/images/hcs_logo.png" ),
          fit: [100,100],
          alignment: 'center',
        },
        {
          columns: [
            {
              text: 'No. ',
              alignment: 'left',
              bold: true,
              margin: [0, 40, 50, 0]
            },
            {
              text: `Dated: ${this.datePipe.transform(this.start_date,'dd-MM-YYYY')}`,
              alignment: 'right',
              bold: true,
              margin: [0, 40, 50, 0]
            },  
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: [30,'*',80,'*',50],
            body: this.getTableData()
            
          },
          margin: [0, 30, 0, 0]
        },
        {
          text: '1. Entire charges will be paid in advance',
          alignment: 'justify',
          margin: [0, 50, 0, 0]
        },
        {
          text: '2. Allotment may be cancelled in case of exigencies and subject to the approval of Hon’ble the Chief Justice, High Court of Sikkim',
          alignment: 'justify',
          margin: [0, 5, 0, 0]
        },
        {
          text: '3. Check in & Check out time is 12:00 noon.',
          alignment: 'justify',
          margin: [0, 5, 0, 0]
        },
        {
          text: 'Deputy Registrar (IT)',
          alignment: 'right',
          bold: true,
          margin: [0, 50, 30, 0]
        },
        {
          text: '(In-charge High Court Guest House)',
          alignment: 'right',
          bold: true,
        },
        {
          text: 'Copy forwarded for information:-',
          alignment: 'left',
          margin: [0, 50, 0, 0]
        },
        {
          text: '1. Registrar General, High Court of Sikkim',
          alignment: 'left',
          margin: [0, 10, 0, 0],
          bold: true,
        },
      ],
      styles: {
        font_size: {
          fontSize: 9,
        }
      },
    }
    pdfMake.createPdf(docDefinition).open();
  }
  getSecondDate(date: any){
    this.start_date = date.toString();
    var second_date = moment(date).add(15,'d').toDate();
    this.end_date = this.datePipe.transform(second_date, 'YYYY-MM-dd');
    this.showLoader = true;
    this.reportingService.getDetails(this.start_date, this.end_date).then((d:any) => {
      this.showLoader = false;
      this.showReport = true;
      this.data = d;
      this.getTableData();
    })
  }
  getTableData(){
    this.table_data = [[
      {text: 'S.No.', bold: true},
      {text: 'Name', bold: true},
      {text: 'Room/Suite', bold: true},
      {text: 'Period', bold: true},
      {text: 'Category', bold: true},
    ]];
    console.log(this.data);
    for(var i=0;i<this.data.length;i++){
      for(var j=0;j<this.data[i].reservation_room_details.length;j++){
        if(this.data[i].reservation_room_details.length > 0){
          if(j === 0){
            let data = [
              {rowSpan: this.data[i].reservation_room_details.length, text: `${i+1}`},
              {rowSpan: this.data[i].reservation_room_details.length, text: `${this.data[i].lead_guest_name}`},
              `${this.data[i].reservation_room_details[j].related_room.room_no}`,
              `${this.datePipe.transform(this.data[i].checkin_date, 'dd-MM-YYYY')} - ${this.datePipe.transform(this.data[i].checkout_date,'dd-MM-YYYY')}`,
              `${this.data[i].reservation_room_details[j].related_room.related_category.name}`,
            ]
            this.table_data.push(data)
          }
          else{
            let data = [
              `${i+1}`,
              `${this.data[i].lead_guest_name}`,
              `${this.data[i].reservation_room_details[j].related_room.room_no}`,
              `${this.datePipe.transform(this.data[i].checkin_date,'dd-MM-YYYY')} - ${this.datePipe.transform(this.data[i].checkout_date, 'dd-MM-YYYY')}`,
              `${this.data[i].reservation_room_details[j].related_room.related_category.name}`,
            ]
            this.table_data.push(data)
          }
        }
      }
    }
    return this.table_data;
  }
}
