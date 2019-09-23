import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Tab } from 'app/_models/tabs';
import { SubSink } from 'subsink/dist/subsink';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  private subs = new SubSink();
  currentRoute: string;
  @Input() tabs: Tab[] = [];
  @Output() navigate = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.setActiveTab(this.router.url);
    this.subs.sink = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setActiveTab(event.url);
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  performNavigation(link: string) {
    this.setActiveTab(link);
    this.navigate.emit(link);
  }

  setActiveTab(link: string) {
    if (typeof link !== 'string') return;
    
    let url = link.split('?')[0]; //get the current route without the query params
    let tab = this.tabs.find(x => x.link === url);
    if (tab) {
      this.tabs.map(x => x.isActive = false);
      tab.isActive = true;
    }
  }
}
