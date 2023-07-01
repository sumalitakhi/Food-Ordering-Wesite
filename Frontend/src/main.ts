import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
export function adminbaseurl(){
  return "http://localhost:3000/admin/"
}
export function customerbaseurl(){
  return "http://localhost:3000/customer/"
}
export function imgbaseurl(){
  return "http://localhost:3000/"
}

const provider =[
  {
    provide:"adminbaseurl",useFactory:adminbaseurl,desp:[]
  },
  {
    provide:"customerbaseurl",useFactory:customerbaseurl,desp:[]
  },
  {
    provide:"imageurl",useFactory:imgbaseurl,desp:[]
  }
]

platformBrowserDynamic(provider).bootstrapModule(AppModule)
.catch(err => console.error(err)); 

