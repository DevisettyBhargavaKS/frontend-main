import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  isAdmin: boolean = false;
  isVendor: boolean = false;
  isLoggedIn: boolean = false;
  isuser: boolean = false;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isVendor$.subscribe((isVendor) => {
      this.isVendor = isVendor;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    let loggedInUser = this.storageService.getLoggedInUser();
    if (loggedInUser.role === 'USER') {
      this.isuser = true;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
