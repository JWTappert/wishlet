import {makeAutoObservable, runInAction} from "mobx";

export default class EventState {
  transportLayer
  subscription
  events = [];
  loading = true;
  error
  
  constructor(transportLayer) {
    this.transportLayer = transportLayer;
    makeAutoObservable(this);
    this.fetchEvents();
  }
  
  listenForEvents() {
    this.subscription = this.transportLayer.onCreateEvent();
  }
  
  fetchEvents() {
    this.loading = true
    this.transportLayer.getEvents().then((response) => {
      runInAction(() => {
        this.events = response;
        this.loading = false;
      })
    }).catch(error => {
      this.error = error;
      this.loading = false;
    })
  }
  
  get events() {
    return this.events;
  }
}