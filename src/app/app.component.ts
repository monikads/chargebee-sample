import { Component, OnInit, Renderer2, VERSION } from '@angular/core';
declare var Chargebee: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  constructor(private renderer: Renderer2,){
    let cbInstance = Chargebee.getInstance();
     renderer.listen('window', 'message', (event) => {
      if (event.data.key === 'cb.success') {
        cbInstance.setCheckoutCallbacks(function (cart) {
          return {
            success: function (hpid) {
              console.log("success", hpid);
            },
            step(value) {
              console.log(value);
              console.log("Hello its working")
            },
          };
        });
  }
  }); 
  }

  ngOnInit() {
    const hostName = 'wolkendemo.wolkencare.com';
    let cbInstance = Chargebee.getInstance();
    var cart = cbInstance.getCart();
    var customer = { cf_domain: hostName };
    cart.setCustomer(customer);
  }
}
