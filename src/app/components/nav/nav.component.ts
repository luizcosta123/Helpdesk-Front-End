import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['home']) // => Mudar dps para home
  }

  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
    this.toast.info('Desconectado com sucesso!', 'Logout', { timeOut: 5000 })
  }

}
