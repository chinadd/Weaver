import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model.client';
import {Event} from '../../../../models/event.model.client';
import {EventService} from '../../../../services/event.service.client';
import {UserService} from '../../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  userId: string;
  eventId: string;
  event: Event;
  user: User;
  name: string;
  date: Date;
  location: string;
  description: string;
  attendees: string;
  newevent: any;
  attMark: boolean;
  constructor(private userService: UserService,
              private eventService: EventService,
              private activeRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
      this.activeRouter.params.subscribe(params => {
      this.userId = params['uid'];
      this.eventId = params['eid'];
      this.eventService.findEventById(this.eventId).subscribe( (event: any ) => {
        this.newevent = event;
        this.name = this.newevent['name'];
        this.date = this.newevent['date'];
        this.location = this.newevent['location'];
        this.description = this.newevent['description'];
        this.attendees = this.newevent['attendees'];
        if (this.attendees.indexOf(this.userId) >= 0) {
          this.attMark = true;
        } else {
          this.attMark = false;
        }

      }, err => {
        alert('Error!'); });
      this.userService.findUserById(this.userId).subscribe( res => {
        this.user = res;
      }, err => {
        alert('Error!');
      });
    });
  }
  addAttendees() {
    this.newevent = {name: this.name, date: this.date, location: this.location, description: this.description, attendees: this.attendees};
    this.newevent['attendees'] = this.newevent['attendees'] ? this.newevent['attendees'].concat(this.userId) : this.userId;
    this.newevent['attendees'] = this.newevent['attendees'].concat(",");
    console.log(' res : ' + JSON.stringify(this.newevent));
    this.eventService.updateEvent(this.eventId, this.newevent).subscribe( (event: any) => {
      console.log(' res : ' + JSON.stringify(this.newevent));
      this.newevent = event;
      // console.log(typeof this.event['attendees']);
      console.log(' res : ' + JSON.stringify(this.newevent));
      // console.log(' attendees number: ' + this.newevent.attendees.length);
      this.router.navigate(['/user/' + this.userId + '/event/' ]);
    }, err => {
      console.log(err);
      //alert('Error!');
    });
  }

  deleteAttendees() {
    this.newevent = {name: this.name, date: this.date, location: this.location, description: this.description, attendees: this.attendees};
    var target = this.userId.concat(",");
    this.newevent['attendees'] = this.newevent['attendees'].replace(target, "");
    console.log(' res : ' + JSON.stringify(this.newevent));
    this.eventService.updateEvent(this.eventId, this.newevent).subscribe((event: any) => {
      console.log(' res : ' + JSON.stringify(this.newevent));
      this.newevent = event;
      console.log(typeof this.newevent['attendees']);
      console.log(' res : ' + JSON.stringify(this.newevent));
      // console.log(' attendees number: ' + this.newevent.attendees.length);
      this.router.navigate(['/user/' + this.userId + '/event/']);
    }, err => {
      console.log(err);
      //alert('Error!');
    });
  }

    toNewEvent() {
    this.router.navigate(['/user/' + this.userId + '/event/new']);
  }

  toProfile() {
    this.router.navigate(['/profile']);
  }

  toSave(){

  }

  toChat(){
    location.reload();
    this.router.navigate(['/user/' + this.userId + '/event/' + this.eventId + '/chat']);
  }

  search(){
    var query = (document.getElementById('query') as HTMLInputElement).value;
    location.reload();
    this.router.navigate(['/search/'+query]);
  }

}
