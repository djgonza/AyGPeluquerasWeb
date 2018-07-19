import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Galery } from '../galery/galery';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Galery;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
