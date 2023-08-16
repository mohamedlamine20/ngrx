import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { getChannelName, getCounter } from '../state/counter.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit{

  counter!:number;
  counter$!:Observable<number>;
  channelName$!:Observable<string>;

  constructor(private store: Store<AppState>){

  }
 
  ngOnInit(): void {
   this.counter$= this.store.select(getCounter);
   this.channelName$ = this.store.select(getChannelName);
   
  }

}
