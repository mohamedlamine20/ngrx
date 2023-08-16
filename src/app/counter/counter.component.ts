import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getChannelName } from './state/counter.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  

  constructor(){
    
  }
  ngOnInit(): void {
  }

}
