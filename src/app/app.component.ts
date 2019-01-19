import { MenuData } from './menuData';
import { Component, ViewChild, Renderer2 } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('submenu') subCtrl;
  rootPage: any = 'HomePage';
  icons: Array<{ id: number, submenuTitle: string, subitems: {}[], icon: string }>;
  subMenuData: any = {}; //Store current submenu Data
  stateMenu:string='closed';
  listenerFn: () => void;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private render: Renderer2,
    private menuCtrl:MenuController
  ) {
    this.initializeApp();
    this.icons = MenuData;

  }

  initializeApp() {
    this.platform.ready()
      .then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
  }

  openPage(item) {
    console.log(item);

    this.nav.push(item.page);
  }

  openSubmenu(data) {
    //check if exists function listener, if exist remove it
    if (this.listenerFn) this.listenerFn();
    if (data.subitems.length > 0)
      if (this.subMenuData && this.subMenuData.id == data.id) {
        // resets to the initial state every
        // time you call the function
        this.render.setStyle(this.subCtrl.nativeElement, "transform", " translate3d(-230px,0,0)");
        //create a listen element after closed
        this.listenerFn = this.render.listen(this.subCtrl.nativeElement, "transitionend", () => { this.subMenuData = {} });
      } else {
        // resets to the initial state every
        // time you call the function
        this.render.setStyle(this.subCtrl.nativeElement, "transform", " translate3d(-230px,0,0)");
        // setTimeout() with the same CSS property transition value
        this.subMenuData = data;
        setTimeout(() => {
          this.render.setStyle(this.subCtrl.nativeElement, "transform", " translate3d(0,0,0)");
        }, 200);
      }
    else
    this.menuCtrl.close();
  }

  resetMenuState(){
    this.subMenuData={};
    this.render.setStyle(this.subCtrl.nativeElement, "transform", " translate3d(-230px,0,0)");
    if (this.listenerFn) this.listenerFn();
  }
}
