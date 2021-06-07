import { Component, OnInit, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'volur-invoice-generator',
  templateUrl: './invoice-generator.component.html'
})
export class InvoiceGeneratorComponent implements OnInit {

  @Input() message: string;
  @Output() close: Subject<boolean>;
  private modalRef: BsModalRef;
  currentDateMinutes: any;
  files:any;

  constructor(private bsModalRef: BsModalRef) {
    this.modalRef = bsModalRef;
  }

  ngOnInit() {
    this.currentDateMinutes = new Date().getMinutes();
    this.close = new Subject();
  }

  public onCancel() {
    this.close.next(false);
    this.modalRef.hide();
  }

  public onConfirm() {
    this.close.next(true);
    this.modalRef.hide();
  }

  printElem() {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head>'+'<meta charset="utf-8">'+
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">' +
    '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' +
    '<title>' + document.getElementById('customer-name').innerHTML + " - " + document.getElementById('event-date').innerHTML + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById('invoice').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    
    setTimeout(() => { mywindow.print(); 
    mywindow.close();}, 500);

    return true;
  }

  saveCustomer() {
    var inp = <HTMLInputElement>document.getElementById('cusname');
    var div = document.getElementById('customer-name');
    div.innerHTML = inp.value;

    inp = <HTMLInputElement>document.getElementById('cusloc');
    div = document.getElementById('customer-address')
    div.innerHTML = inp.value;
    
    inp = <HTMLInputElement>document.getElementById('cusemail');
    div = document.getElementById('customer-email')
    div.innerHTML = inp.value;
    
    inp = <HTMLInputElement>document.getElementById('cusphone');
    div = document.getElementById('customer-phone')
    div.innerHTML = inp.value;
  }

  openSaved()
{
    document.getElementById('openInvoice')
            .addEventListener('change', function() {
              
            var fr=new FileReader();
            fr.onload=function(){
                document.getElementById('invoice')
                        .innerHTML = <string>fr.result;
            }
              
            fr.readAsText(this.files[0]);
        })
}

saveElem()
{
    this.download(document.getElementById('customer-name').innerHTML + " - " + document.getElementById('event-date').innerHTML + ".volur", document.getElementById('invoice').innerHTML);
}

download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
  }
  else {
      pom.click();
  }
}

deleteProd() {
  var inp = <HTMLInputElement>document.getElementById('proditno');
  
  var el = document.getElementById(`product-item-${inp.value}`);
  el.remove();
  
  var totels = document.getElementsByName('product-total');
  var total = 0;
  
  totels.forEach(t => total = Number(total) + Number(t.innerHTML));
  var tot = document.getElementById('total');
  tot.innerHTML = <string><unknown>total;
  
  var disc = document.getElementById('discount');
  var endtot = document.getElementById('end-total');
  endtot.innerHTML = <string><unknown>(Number(total) - Number(disc.innerHTML));
}
addProd() {
  var inptit = <HTMLInputElement>document.getElementById('prodtit');
  var inpdesc = <HTMLInputElement>document.getElementById('proddesc');
  var inpqty = <HTMLInputElement>document.getElementById('prodqty');
  var inpprice = <HTMLInputElement>document.getElementById('prodprice');
  
  var tbbody = document.getElementById('tablebody');

  var productitems = document.getElementsByName('product-total');
  tbbody.innerHTML +=
     "<tr name='product-item' id='product-item-"+(productitems.length+1)+"'>" +
          "<td class='product-number'>"+ (productitems.length+1) +"</td>" +
          "<td class='text-left'>" +
              "<h3 name='product-name'>" +
                  inptit.value +
              "</h3>" +
             "<div name='product-description'>" + 
             inpdesc.value +
             "</div>" +
          "</td>" +
          "<td name='product-qty' class='text-center'>"+ inpqty.value +"</td>"+
          "<td name='product-price' class='text-center'>"+ inpprice.value +"</td>"+
          "<td name='product-total' class='text-center'>"+ (<number><unknown>inpqty.value*<number><unknown>inpprice.value) +"</td>"+
      "</tr>";
  var totels = document.getElementsByName('product-total');
  var total = 0;
  
  totels.forEach(t => total = Number(total) + Number(t.innerHTML));
  var tot = document.getElementById('total');
  tot.innerHTML = <string><unknown>total;

  var disc = document.getElementById('discount');
  var endtot = document.getElementById('end-total');
  endtot.innerHTML = <string><unknown>(Number(total) - Number(disc.innerHTML));
}
addDateTime() {
  var inp = <HTMLInputElement>document.getElementById('eventdate');
  var div = document.getElementById('event-date');
  div.innerHTML = inp.value;
  
  inp = <HTMLInputElement>document.getElementById('eventime');
  div = document.getElementById('event-time')
  div.innerHTML = inp.value;
}
setDisc() {
  var inp = <HTMLInputElement>document.getElementById('disc');
  var div = document.getElementById('discount');
  div.innerHTML = inp.value;

  var tot = document.getElementById('total');
  var endtot = document.getElementById('end-total');
  endtot.innerHTML = <string><unknown>(Number(tot.innerHTML) - Number(inp.value));
} 
addDesc() {
  var inp = <HTMLInputElement>document.getElementById('addinfo');
  var div = document.getElementById('notice');
  div.innerHTML = inp.value;
} 
}