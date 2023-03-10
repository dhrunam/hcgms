import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import * as moment from 'moment';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent {
  start_date!:Date;
  end_date!: Date | any;
  date: string = '';
  constructor(private datePipe: DatePipe){}
  ngOnInit():void{
    let newDate = new Date();
    this.date = `${newDate.getFullYear()}-${newDate.getMonth() < 10 ? '0': ''}${newDate.getMonth()}-${newDate.getDate() < 10 ? '0':''}${newDate.getDate()}`;
  }
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
              text: `Dated: ${this.datePipe.transform(this.date,'dd-MM-YYYY')}`,
              alignment: 'right',
              bold: true,
              margin: [0, 40, 50, 0]
            },  
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: [30,'*','*','*','*'],
            body: [
              [{text:'S.No.', bold:true, alignment: 'center'},{text:'Name', bold:true, alignment: 'center'},{text:'Room/Suite', bold:true, alignment: 'center'},{text:'Period', bold:true, alignment: 'center'},{text:'Category', bold:true, alignment: 'center'}],
              ['1','','','','']
            ]
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
    this.start_date = date
    var second_date = moment(date).add(15,'d').toDate();
    this.end_date = this.datePipe.transform(second_date, 'YYYY-MM-dd');
    console.log(this.start_date, this.end_date);
  }
}
