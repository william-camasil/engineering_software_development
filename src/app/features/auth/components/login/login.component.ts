import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateToDashboard(username: string) {
    // alert(`username: ${username}`);
    if (this.authService.login(username)) {
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Login failed');
    }
  }

  navigateToRegisterNewAccount() {
    this.router.navigate(['/register']);
  }
}
