import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tab, TabRoute } from 'app/_models/tabs';
import { AuthService } from 'app/_auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {



  constructor(private router: Router, private authService: AuthService,
    private route: ActivatedRoute) {
    
  }

  ngOnInit() {  }

}
